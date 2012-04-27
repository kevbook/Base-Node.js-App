  var User = require('../models/User'),
		config = require('../boot/config')(),
		mailer = require('postage')(config.postageapp.apiKey),
		helper = require('../boot/helper'),
		logger = require('../boot/logger'),
		mongooseErrors = require('../boot/mongooseerrors');


/**
 * user messages view
 */

exports.index = function(req, res) {
	res.render('user/messages', { 
 		locals:{ title: 'user messages' }
  });
};



/**
 * read message from a user
 */

exports.readMessage = function(req, res) {
	res.render('user/readmessage', { 
 		locals:{ title: 'messages between users' }
  });
};