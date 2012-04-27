var User = require('../models/User'),
		config = require('../boot/config')(),
		mailer = require('postage')(config.postageapp.apiKey),
		helper = require('../boot/helper'),
		logger = require('../boot/logger'),
		mongooseErrors = require('../boot/mongooseerrors');



/**
 * user dashboad view
 */

exports.index = function(req, res) {
	console.log(req.session.auth);
	res.render('user/index', { 
 		locals:{ title: 'user dashboad' }
  });
};


/**
 * user profile view
 */

exports.profile = function(req, res) {
	var username = req.params.username;

	console.log('--- getting username from url ---');
	console.log(username);

	res.render('user/profile', { 
 		locals:{ title: 'user profile for: ' + username }
  });
};


/**
 * users settings
 */

exports.settings = function(req, res) {
	res.render('user/settings', { 
 		locals:{ title: 'settings' }
  });
};


/**
 * users preferences
 */

exports.prefs = function(req, res) {
	res.render('user/prefs', { 
 		locals:{ title: 'preferences' }
  });
};


/**
 * users password change
 */

exports.password = function(req, res) {
	res.render('user/password', { 
 		locals:{ title: 'password change' }
  });
};