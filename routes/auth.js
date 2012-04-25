var User = require('../models/User'),
		config = require('../boot/config')(),
		mailer = require('postage')(config.postageapp.apiKey),
		helper = require('../boot/helper'),
		logger = require('../boot/logger'),
		mongooseErrors = require('../boot/mongooseerrors');


exports.login = function(req, res) {
	res.render('auth/login', { 
 		locals:{ title: 'login' }
  });
};

exports.signup = function(req, res) {
	res.render('auth/signup', { 
 		locals:{ title: 'sign up', email:'', username:'' }
  });
};

exports.forgot = function(req, res) {
	res.render('auth/forgot', { 
 		locals:{ title: 'forgot password'	}
  });
};

exports.logout = function(req, res) {
	req.session.destroy(function(){});
	res.redirect('/');
};

exports.doSignup = function(req, res, next) {
	var viewOn = false,
			data = {
	 			email: req.body.email, 
	  		password: req.body.password,
	  		username: req.body.username,
	  		last_login: new Date()
			};

	if (data.email === '' || data.password === '' || data.username === '') {
	  req.flash('error', 'All fields are required.');
	  viewOn = true;
	} else if (! helper.isPassword(data.password)) {
		req.flash('error', 'Password must be at least 5 characters.');
	  viewOn = true;
	} /*
		else if (! helper.isMatch(data.password, req.body.password2)) {
			req.flash('error', 'Password and Password Confirm must match.');
	 	viewOn = true;
		*/
	else {
		var user = new User(data);
		user.pics.push({ pic_url: 'default.png', main_pic: true });
		user.save(function(err, result) {
			if(err){
				logger.log('server_error', err + '- Email: ' + data.email); // log all errors anyways.
				mongooseErrors(err, req, function(err) {
					if(err) {
						next(err);
					} else {
						res.render('auth/signup', { 
				 			locals:{ title: 'sign up',
				 				email: data.email,
	 							username: data.username
				 			}
						});	
					}
				});
			} else {
				setSession(req, result);
				mailer.send({
					recipients:data.email, template:'welcome', variables:{username: data.username} }, function(error){
						if(error) logger.log('email_send_error', error + '- Email: ' + data.email);
				});
				res.redirect('/user');
			}
		});
	}

	if (viewOn) {
		res.render('auth/signup', { 
	 		locals:{ title: 'sign up', 
	 			email: data.email,
	 			username: data.username
	 		}
		});
	}
};

exports.doLogin = function(req, res, next) {
	var data = {
	 			email: req.body.email, 
	  		password: req.body.password
			};

	if (data.email === '' || data.password === '') {
	  req.flash('error', 'Invalid email/password combination.');
	  res.redirect('/login');
	} else {
		User.findOne({ email: data.email, password: helper.encryptPass(data.password) }, 
			['email', 'username', 'role', 'pics'],
			function(err, foundUser) {
				if(err) {
					next(err);
				} else if (foundUser !== null && foundUser._id) {
						setSession(req, foundUser);

						// update last login
						User.update({ _id: foundUser._id }, {last_login: new Date()}, function(error) {
      				if(error) logger.log('server_error', error + '- Email: ' + email);
      			});
						res.redirect('/user');
				} else { 
					logger.log('auth_fail', data.email); // log all errors anyways.
		  		req.flash('error', 'Invalid email/password combination.');
		  		res.redirect('/login');
				}
		});
	}
};

exports.loginTwitter = function(req, res, next) {	
  req.authenticate(['twitter'], function(err, authenticated){
    if(err) {
    	logger.log('oauth_error', err);
      next(err);
    } else {
      if(authenticated === undefined) {
        //next (throw new Error('twitter auth failed.'));
      } else {
      	var authDetails = req.getAuthDetails();
				User.findOne({ twitter_id: authDetails.user.user_id }, 
					['email', 'username', 'role', 'pics'],
					function(err, foundUser) {
						if(err) {
							next(err);
						} else if (foundUser !== null && foundUser._id) {
							// user is found - load existing stuff
							setSession(req, foundUser);
							// update last login, and oAuth tokens
							User.update({ _id: foundUser._id }, {
									last_login: new Date(), 
									twitter_accessToken: authDetails.twitter_oauth_token, 
									twitter_accessSecret: authDetails.twitter_oauth_token_secret }, 
								function(error) {
	      					if(error) logger.log('server_error', error + '- TwitterID: ' + authDetails.user.user_id);
	      			});
							res.redirect('/user');
						} else {
							// user is not found
							var data = {
					  		username: authDetails.user.username,
					  		twitter_id: authDetails.user.user_id,
					  		twitter_accessToken: authDetails.twitter_oauth_token, 
					  		twitter_accessSecret: authDetails.twitter_oauth_token_secret,
					  		last_login: new Date()
							};
							var user = new User(data);
							user.pics.push({ pic_url: 'default.png', main_pic: true });
							user.save(function(err, result) {
								if(err) {
									if(err.code === 11000 || err.code === 11001){
										// ToDo: Assign a new username and move on.
										logger.log('server_error', err);
									} else {
										logger.log('server_error', err + '- TwitterName: ' + data.username);
									} 
								} else {
									// no erros , setup session:
									setSession(req, result);
									res.redirect('/user');
								}
							});
						}
					});
      }
    }
  });  
};

exports.loginFb = function(req, res, next) {	
  req.authenticate(['facebook'], function(err, authenticated){
    if(err) {
    	logger.log('oauth_error', err);
      next(err);
    } else {
      if(authenticated === undefined) {
        //next (throw new Error('twitter auth failed.'));
      } else {
      	var authDetails = req.getAuthDetails();
				User.findOne({ email: authDetails.user.email }, 
					['email', 'username', 'role', 'pics'],
					function(err, foundUser) {
						if(err) {
							next(err);
						} else if (foundUser !== null && foundUser._id) {
							// user is found - load existing stuff
							setSession(req, foundUser);
							// update last login, and oAuth tokens
							User.update({ _id: foundUser._id }, {
									last_login: new Date(), 
									fb_accessToken: req.session.access_token }, 
								function(error) {
	      					if(error) logger.log('server_error', error + '- fbID: ' + authDetails.user.id);
	      			});
							res.redirect('/user');
						} else {
							// user is not found
							var data = {
					  		username: authDetails.user.username,
								email: authDetails.user.email,
								first_name: authDetails.user.first_name,
								last_name: authDetails.user.last_name,
								gender: authDetails.user.gender,
					  		fb_id: authDetails.user.id,
					  		fb_accessToken: req.session.access_token,
					  		last_login: new Date()
							};
							console.log(data);
							var user = new User(data);
							user.pics.push({ pic_url: 'default.png', main_pic: true });
							user.save(function(err, result) {
								if(err) {
									if(err.code === 11000 || err.code === 11001){
										// ToDo: Assign a new username and move on.
										logger.log('server_error', err);
									} else {
										logger.log('server_error', err + '- Facebook: ' + data.username);
									} 
								} else {
									// no erros , setup session:
									setSession(req, result);
									res.redirect('/user');
								}
							});
						}
					});
      }
    }
  });  
};

function setSession(req, result) {
	var sessData = {
		id: result._id,
		email: result.email || '',
		username: result.username,
		role: result.role,
		lastLogin: new Date(),
		pic: result.pics[0].pic_url
	};
	req.session.auth.logged = true;
	req.session.auth.user = sessData;
};

exports.doForgot = function(req, res, next) {
	var email = req.body.email;
	if ((email === '') || (! helper.isEmail(email))) {
		payload = {status:0, msg: 'Please enter a valid email.'};
		res.json(payload);
	} else {
    User.findOne({ email: email }, ['_id'], function(err, foundUser) {
    	if(err) {
				next(err);
			} else if (foundUser !== null && foundUser._id) {
      		var randomHash = helper.randomHash();      		
      		var resetUrl = config.baseUrl  + 'pass_reset/' + email + '/' + randomHash;
					User.update({ _id: foundUser._id }, {pass_reset_date: new Date().addHours(2), pass_reset_hash: randomHash}, function(err) {
      			if(err) {
      				next(err);
      			} else {
							mailer.send({
								recipients:email, template:'pass_reset', variables:{reset_url: resetUrl} }, function(err){
									if(err) {
										logger.log('email_send_error', err + '- Email: ' + email);
									} 
									else{
										payload = {status:1, msg: 'Password reset email sent.'};
										res.json(payload);
									}
							});
      			}
      		});
			} else { 
  			payload = {status:0, msg: 'Email not found, try signing up.'};
				res.json(payload);
			}
		});
	}
};

exports.passReset = function(req, res, next) {
	User.findOne({ email: req.params.email, pass_reset_hash: req.params.hash }, 
		['_id', 'pass_reset_date'], function(err, result) {
    	if(err) {
				next(err);
			} else if (result !== null && result._id) {
				// email is found, not check the timestamp for expiration:
				if (result.pass_reset_date > new Date()){
					res.render('auth/reset', { 
	 					locals:{ title: 'reset your password', 
	 						email: req.params.email,
	 						hash: req.params.hash
	 					}
					});
				} else {
					req.flash('error', 'There was a problem. Try to do another forgot password.');
					res.redirect('/forgot');
				}
			} else {
				// invalid hash: 
				req.flash('error', 'There was a problem. Try to do another forgot password.');
				res.redirect('/forgot');
			}
	});
};

exports.doPassReset = function(req, res, next) {
	var viewOn, 
			data = {
	  		password: req.body.password,
	  		password2: req.body.password2,
			};

	if (! helper.isMatch(data.password, data.password2)) {
			req.flash('error', 'Password and Password Confirm must match.');
	 		viewOn = true;
	} else if (! helper.isPassword(data.password)) {
		req.flash('error', 'Password must be at least 5 characters.');
	  viewOn = true;
	} else {
			User.findOne({ email: req.params.email, pass_reset_hash: req.params.hash }, 
				['_id', 'pass_reset_date'], function(err, result) {
		    	if(err) {
						next(err);
					} else if (result !== null && result._id) {
						// email is found, not check the timestamp for expiration:
						if (result.pass_reset_date > new Date()){
							console.log('---- pass reset stuff ----');
							req.flash('info', 'Passwrod is changed, now you can login.');
							res.redirect('login');
						} else {
							req.flash('error', 'There was a problem. Try to do another forgot password.');
							res.redirect('/forgot');
						}
					} else {
						// invalid hash: 
						req.flash('error', 'There was a problem. Try to do another forgot password.');
						res.redirect('/forgot');
					}
			});
	}

	if(viewOn) {
		res.render('auth/reset', { 
				locals:{ title: 'reset your password', 
					email: req.params.email,
					hash: req.params.hash
				}
		});
	}
};





/*
exports.doForgot = function(req, res, next) {
	var viewOn = false,
			email = req.body.email;

	if (email === '') {
	  viewOn = true;
	} else if (! helper.isEmail(email)) {
		viewOn = true;
	} else {
    User.findOne({ email: email }, ['_id'], function(err, foundUser) {
    	if(err) {
				next(err);
			} else if (foundUser !== null && foundUser._id) {
      		var randomHash = helper.randomHash();      		
      		var resetURL = config.baseUrl  + 'pass_reset/' + email + '/' + randomHash;
      		console.log(resetURL);

      		// update DB
					User.update({ _id: foundUser._id }, {pass_reset_date: new Date().addHours(2), pass_reset_hash: randomHash}, function(err) {
      			if(err) {
      				next(err);
      			} else {
							mailer.send({
								recipients:email, template:'pass_reset', variables:{resetURL: resetURL} }, function(err){
									if(err) {
										logger.log('email_send_error', err + '- Email: ' + email);
									} 
									else{
										req.flash('info', 'Password reset email sent.');
		  							res.redirect('/forgot')
									}
							});
      			}
      		});
			} else { 
				req.flash('error', 'Email not found, try signing up.');
  			res.redirect('/forgot')
			}
		});
	}

	if (viewOn) {
		req.flash('error', 'Please provide an email addresss!');
  	res.redirect('/forgot')
	}
};
*/
