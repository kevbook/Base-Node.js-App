var User = require('../models/user'),
		Message = require('../models/message'),
		config = require('../boot/config')(),
		mailer = require('postage')(config.postageapp.apiKey),
		helper = require('../boot/helper'),
		logger = require('../boot/logger'),
		mongooseErrors = require('../boot/mongooseerrors');


/**
 * user messages view
 */

exports.index = function(req, res) {
	var username = req.session.auth.user.username,
			id   		 = req.session.auth.user.id;
/*

	Message.getAllMsg(username, function(err, result){
		if(err){
			console.log(err);
		} else {
			console.log(result);

			res.render('user/messages', { 
		 		locals:{ 
		 			title: 'user messages',
		 			messages: result
		 		}
		  });
		}
	});

*/
};



/**
 * send a message
 */

exports.sendMessage = function(req, res, next) {
	var from_id = req.session.auth.user.id,
			to_id = req.body.userid,
			msg = req.body.msg;

	// ToDo: checks if data is empty

	// check if previous conversation exists
	Message.findOne({}, ['user1_id', 'user2_id']).or([{ user1_id: from_id }, { user2_id: from_id }])
		.run(function(err, foundMsg){
			console.log(err);
			console.log(foundMsg);
			if(err) {
				next(err);
			} else if (foundMsg !== null && foundMsg._id) {
				// existing thread:
						if(foundMsg.user1_id === from_id) {
							var data = {


 	user1_viewed  : { type: Boolean, default: false, required: true }, 
  user2_viewed  : { type: Boolean, default: false, required: true }, 
  user1_deleted : { type: Boolean, default: false, required: true }, 
  user2_deleted : { type: Boolean, default: false, required: true },


							};



						}
						Message.update({ _id: foundMsg._id }, { 
							last_login: new Date(), pass_reset_date: null, pass_reset_hash: null }, 
							
							function(error) {
      					if(error) logger.log('server_error', error + '- Email: ' + email);
      			});

							Message.threads.push({ from: from_id, msg: msg });



				console.log('exits man');


			} else {
				// brand new thread
				var message = new Message({ user1_id: from_id, user2_id: to_id, user1_viewed: true });
				message.threads.push({ from: from_id, msg: msg });
				message.save(function(error, result) {
					if(error) {
						next(error);
					} else {
						req.flash('success', 'message sent.');
						res.redirect('/messages');
					}
				});
			}
		});
};



/**
 * read message from a user
 */

exports.readMessage = function(req, res) {
	var username = req.params.username;

	res.render('user/readmessage', { 
 		locals:{ title: 'messages between users' }
  });
};