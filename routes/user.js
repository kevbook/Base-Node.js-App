var User = require('../models/User'),
		config = require('../boot/config')(),
		mailer = require('postage')(config.postageapp.apiKey),
		helper = require('../boot/helper'),
		logger = require('../boot/logger'),
		geocoder = require('geocoder'),
		mongooseErrors = require('../boot/mongooseerrors');



/**
 * user dashboad view
 */

exports.index = function(req, res) {
	console.log(req.session.auth);
	res.render('user/index', { 
 		locals:{ title: 'user main page' }
  });
};


