/**
 * module dependencies 
 */

var User = require('../models/User'),
		mailer = require('postage'),
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
 		locals:{ title: 'sign up' }
  });
};

exports.logout = function(req, res) {
	req.session.auth = null;
	req.session.user = null;
	req.session.destroy(function(){});
	res.redirect('/', 302);
};

exports.doSignup = function(req, res) {
	var viewOn = false,
			data = {
	 			email: req.body.email, 
	  		password: req.body.password,
	  		username: req.body.username
			};

	if (data.email == '' || data.password == '' || data.username == '' || req.body.password2 == '') {
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
				 			locals:{ title: 'sign up'}
						});	
					}
				});
			} else {
				delete result.password;
				req.session.logged = true;
				//req.session.userid = result;
				req.session.user = result;
				/*
					mailer.send({
						recipients: data.email, template:'welcome', variables:{username: data.username}
					});
				*/
				res.redirect('/user');
			}
		});
	}

	if (viewOn){
		res.render('auth/signup', { 
	 		locals:{ title: 'sign up'}
		});
	}
};