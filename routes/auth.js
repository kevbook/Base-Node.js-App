/**
 * module dependencies 
 */

var User = require('../models/User'),
		config = require('../app/config')(),
		mailer = require('postage')(config.postageapp.apiKey),
		helper = require('../app/helper'),
		logger = require('../app/logger'),
		mongooseErrors = require('../app/mongooseerrors');


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
	req.session.auth = null;
	req.session.user = null;
	req.session.destroy(function(){});
	res.redirect('/', 302);
};


exports.doSignup = function(req, res, next) {
	var viewOn = false,
			data = {
	 			email: req.body.email, 
	  		password: req.body.password,
	  		username: req.body.username
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
		user.save(function(err, result) {
			if(err){
				mongooseErrors.flash(err, req, function(err) {
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
					recipients:data.email, template:'welcome', variables:{username: data.username} }, function(err){
						if(err) logger.log('email_send_error', err + '- Email: ' + data.email);
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
	var viewOn = false,
			data = {
	 			email: req.body.email, 
	  		password: req.body.password
			};

	if (data.email === '' || data.password === '') {
	  req.flash('error', 'Invalid email/password combination.');
	} else {
		User.findOne({ email: data.email, password: helper.encryptPass(data.password) }, function(err, foundUser) {
			if(err) {
				next(err);
			} else if (foundUser !== null && foundUser._id) {
					setSession(req, foundUser);
					res.redirect('/user');
			} else { 
	  		req.flash('error', 'Invalid email/password combination.');
	  		res.redirect('/login');
			}
		});
	}
};

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

function setSession(req, user) {
	delete(user.password);
	delete user.email_verifed;
	delete user.pass_reset_date;
	delete user.pass_reset_hash;
	delete user.accessToken;
	delete user.accessTokenSecret;

	req.session.logged = true;
	req.session.user = user;
	console.log(user);
};
