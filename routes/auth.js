var User = require('../models/user'),
		config = require('../boot/config')(),
		mailer = require('postage')(config.postageapp.apiKey),
		helper = require('../boot/helper'),
		logger = require('../boot/logger'),
		mongooseErrors = require('../boot/mongooseerrors');


/**
 * login view
 */
 
exports.login = function(req, res) {
	res.render('auth/login', { 
 		locals:{ title: 'login' }
  });
};


/**
 * signup view
 */

exports.signup = function(req, res) {
	res.render('auth/signup', { 
 		locals:{ title: 'sign up', email:'', username:'', firstname:'', lastname:'', 
 							zipcode: '', gender: 'male' }
  });
};


/**
 * forgot password view
 */

exports.forgot = function(req, res) {
	res.render('auth/forgot', { 
 		locals:{ title: 'forgot password'	}
  });
};



/**
 * logout method
 * @ logs user out 
 */

exports.logout = function(req, res) {
	req.session.destroy(function(){});
	res.redirect('/');
};


/**
 * signup
 * @ lets user create a new account with email, password
 */

exports.doSignup = function(req, res, next) {
	var viewOn = false,
			data = {
				profile: {
					firstname: req.body.firstname, 
					lastname: req.body.lastname, 
					gender: req.body.gender, 
					search_zip: req.body.zipcode, 
				},
				location: {
					zipcode: req.body.zipcode,
				}, 
	 			email: req.body.email, 
	  		password: req.body.password,
	  		username: req.body.username,
	  		last_login: new Date()
			};

	if (data.email === '' || data.password === '' || data.username === ''
				|| data.profile.firstname === '' || data.profile.lastname === '' 
				|| data.profile.gender === '' || data.profile.search_zip === '' ) {
		req.flash('error', 'All fields are required.');
	  viewOn = true;
	} else if (! helper.isPassword(data.password)) {
			req.flash('error', 'Password must be at least 5 characters.');
	  	viewOn = true;
	} else {
		helper.zipToGeo(data.location.zipcode, function(error, geo, city){
			if(error){
				req.flash('error', 'Please enter a valid zipcode.');
				viewOn = true;
			} else {
				data.location.geo = geo;
				data.profile.city = city;
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
							 			locals:{ title: 'sign up', email: data.email, username: data.username,
							 							firstname: data.profile.firstname, lastname: data.profile.lastname, 
							 							zipcode: data.location.zipcode , gender: data.profile.gender }
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
		});
	}

	if (viewOn) {
		res.render('auth/signup', { 
	 		locals:{ title: 'sign up', email: data.email, username: data.username,
	 							firstname: data.profile.firstname, lastname: data.profile.lastname, 
	 							zipcode: data.location.zipcode , gender: data.profile.gender }
		});
	}

};


/**
 * login
 * @ lets user login with email, password
 */

exports.doLogin = function(req, res, next) {
	var data = {
	 			email: req.body.email, 
	  		password: req.body.password
			};

	if (data.email === '' || data.password === '') {
	  req.flash('error', 'Invalid email/password combination.');
		res.render('auth/login', { 
	 		locals:{ title: 'login' }
	  });
	} else {
		User.findOne({ email: data.email, password: helper.encryptPass(data.password) }, 
			function(err, foundUser) {
				if(err) {
					next(err);
				} else if (foundUser !== null && foundUser._id) {
						setSession(req, foundUser);

						// update last login
						User.update({ _id: foundUser._id }, { last_login: new Date(), pass_reset_date: null, pass_reset_hash: null }, 
							function(error) {
      					if(error) logger.log('server_error', error + '- Email: ' + email);
      			});
						res.redirect('/user');
				} else { 
					logger.log('auth_fail', data.email); // log all errors anyways.
		  		req.flash('error', 'Invalid email/password combination.');
					res.render('auth/login', { 
				 		locals:{ title: 'login' }
				  });
				}
		});
	}
};


/**
 * login/ signup using twitter account
 */

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
				User.findOne({ 'twitter.id': authDetails.user.user_id }, 
					function(err, foundUser) {
						if(err) {
							next(err);
						} else if (foundUser !== null && foundUser._id) {
							// update last login, and oAuth tokens
							User.update({ _id: foundUser._id }, {
									last_login: new Date(), 
									'twitter.accessToken': authDetails.twitter_oauth_token, 
									'twitter.accessSecret': authDetails.twitter_oauth_token_secret 
								}, 
								function(error) {
	      					if(error) logger.log('server_error', error + '- TwitterID: ' + authDetails.user.user_id);
	      			});
							setSession(req, foundUser);
							res.redirect('/user');
						} else {
							// user is not found
							var data = {
					  		username: authDetails.user.username,
					  		'twitter.id': authDetails.user.user_id,
					  		'twitter.accessToken': authDetails.twitter_oauth_token, 
					  		'twitter.accessSecret': authDetails.twitter_oauth_token_secret,
					  		last_login: new Date()
							};
							var user = new User(data);
							user.pics.push({ pic_url: 'default.png', main_pic: true });
							user.save(function(error, result) {
								if(error) {
									logger.log('server_error', err + '- TwitterName: ' + data.username);
								} else {
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


/**
 * login/ signup using facebook account
 */

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
					function(err, foundUser) {
						if(err) {
							next(err);
						} else if (foundUser !== null && foundUser._id) {
							User.update({ _id: foundUser._id }, {
									last_login: new Date(), 
									'fb.accessToken': req.session.access_token }, 
								function(error) {
	      					if(error) logger.log('server_error', error + '- fbID: ' + authDetails.user.id);
	      			});
							setSession(req, foundUser);
							res.redirect('/user');
						} else {
							// user is not found
							var data = {
					  		username: authDetails.user.username,
								email: authDetails.user.email,
								'profile.first_name': authDetails.user.first_name,
								'profile.last_name': authDetails.user.last_name,
								'profile.gender': authDetails.user.gender,
								'profile.birthday': authDetails.user.birthday,
					  		'fb.id': authDetails.user.id,
					  		'fb.accessToken': req.session.access_token,
					  		last_login: new Date()
							};
							var user = new User(data);
							user.pics.push({ pic_url: 'default.png', main_pic: true });
							user.save(function(error, result) {
								if(error) {
										logger.log('server_error', err + '- Facebook: ' + data.username); 
								} else {
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
		email: result.email || null,
		username: result.username,
		role: result.role,
		lastLogin: new Date(),
		pic: result.pics,
		age: result.profile.age || null
	};

	if(typeof req.session.auth === 'undefined') req.session.auth = {};
	req.session.auth.logged = true;
	req.session.auth.user = sessData;
};

exports.doForgot = function(req, res, next) {
	var	email = req.body.email;

	if ((email === '') || (! helper.isEmail(email))) {
		req.flash('error', 'Please enter a valid email.');
		res.render('auth/forgot', { 
	 		locals:{ title: 'forgot password'	}
	  });
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
										req.flash('success', 'Password reset email sent.');
										res.redirect('/')
									}
							});
      			}
      		});
			} else { 
				req.flash('error', 'Email not found, try signing up.');
				res.render('auth/forgot', { 
			 		locals:{ title: 'forgot password'	}
			  });
			}
		});
	}
};

exports.passReset = function(req, res, next) {
	var viewOn = false;
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
					req.flash('error', 'Password reset link expired. Try to do another forgot password.');
					viewOn = true;
				}
			} else {
				// invalid hash: 
				req.flash('error', 'There was a problem. Try to do another forgot password.');
				viewOn = true;
			}

			if(viewOn) {
				res.render('auth/forgot', { 
			 		locals:{ title: 'forgot password'	}
			  });
			}
	});
};

exports.doPassReset = function(req, res, next) {
	var viewOn, 
			data = {
	  		password: req.body.password,
	  		password2: req.body.password2,
	  		email: req.body.email,
	  		hash: req.body.hash
			};

	if (! helper.isMatch(data.password, data.password2)) {
			req.flash('error', 'Password and Password Confirm must match.');
	 		viewOn = true;
	} else if (! helper.isPassword(data.password)) {
		req.flash('error', 'Password must be at least 5 characters.');
	  viewOn = true;
	} else {
			User.findOne({ email: data.email, pass_reset_hash: data.hash }, 
				['_id', 'pass_reset_date'], function(err, result) {
		    	if(err) {
						next(err);
					} else if (result !== null && result._id) {
						// email is found, not check the timestamp for expiration:
						if (result.pass_reset_date > new Date()){
							User.update({ _id: result._id }, { password: helper.encryptPass(data.password) }, 
								function(error) {
	      					if(error) logger.log('server_error', error + '- Update Password UserId: ' + result._id);
									req.flash('success', 'Passwrod is changed, you can login now.');
									res.redirect('/login');
	      			});
						} else {
							req.flash('error', 'Password reset link expired. Try to do another forgot password.');
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