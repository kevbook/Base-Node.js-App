var User = require('../models/user'),
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
	var user = req.params.username;

  User.findOne({ username: user}, 
  	['username', 'email', 'pics'],
  	function(err, foundUser) {
		if(err) {
			next(err);
		} else if (foundUser !== null && foundUser._id) {
				res.render('user/profile', { 
			 		locals:{ 
			 			title: 'user dashboad',
			 			id: foundUser._id,
			 			username: foundUser.username,
			 			email: foundUser.email,
			 			pics: foundUser.pics
			 		}
			  });
		} else {
			// user not found
			res.redirect('/user');
		}
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