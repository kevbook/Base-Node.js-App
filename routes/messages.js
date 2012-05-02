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
	var Msg = {}, 
			Messages = [], i,
			username = req.session.auth.user.username,
			id   		 = req.session.auth.user.id;

/*
  MsgSchema = new Schema({
  id            : { type: ObjectId },
  user1_id      : { type: ObjectId, ref:'User' }, 
  user2_id      : { type: ObjectId, ref:'User' }, 
  user1_viewed  : { type: Boolean, default: false, required: true }, 
  user2_viewed  : { type: Boolean, default: false, required: true }, 
  user1_deleted : { type: Boolean, default: false, required: true }, 
  user2_deleted : { type: Boolean, default: false, required: true },
  threads       : { type: [Thread] }
});
*/

	Message.find({}, ['user1_id', 'user2_id', 'user1_viewed', 'user2_viewed', 'user1_deleted', 'user2_deleted', 'threads'])
		.or([{ user1_id: id }, { user2_id: id }])
		.populate('user1_id', ['username', 'pics'], {'pics.main_pic': true})
		.populate('user2_id', ['username', 'pics'], {'pics.main_pic': true})
		.run(function(err, messages){
			if(err){
				console.log(err);
				console.log('err out');
			} else {
				for (i in messages) {
					if(id === messages[i].user1_id._id) {
						Msg.from_id = messages[i].user2_id._id, 
						Msg.from 	  = messages[i].user2_id.username 
						Msg.pic 		= messages[i].user2_id.pics
					} else {
						Msg.from_id = messages[i].user1_id._id, 
						Msg.from 	  = messages[i].user1_id.username
						Msg.pic 		= messages[i].user1_id.pics
					}
					Msg.msg = messages[i].threads[0];
					Messages[i] = Msg;
		
					console.log(Messages[i]);
				};


		//		console.log(Messages);

				res.render('user/messages', { 
			 		locals:{ 
			 			title: 'user messages',
			 			messages: messages
			 		}
			  });


			}
		});

};



/**
 * send a message
 */

exports.sendMessage = function(req, res, next) {
	var from_id = req.session.auth.user.id,
			to_id = req.body.userid,
			msg = req.body.msg;

	var message; 

	/*
	console.log(req);

	input(type='hidden', name='userid', value=userid)
	input(type='hidden', name='username', value=username)
	input(type='hidden', name='pic', value=pics[0].pic_url)
	input(type='hidden', name='_csrf', value=csrf)
	textarea(id='msg', name='msg', placeholder='type your message..')
	input(type='submit', id='submit', class='button', value='send message')
	*/


	if(to_id ==='' || msg ==='') {
		req.flash('error', 'A message is required.');
		res.redirect('/messages');
	} else if (from_id === to_id) {
		req.flash('error', 'You are trying to message youself.');
		res.redirect('/messages');
	} else {
		// check if previous conversation exists
		Message.findOne({}, ['user1_id', 'user2_id']).or([{ user1_id: from_id }, { user2_id: from_id }])
			.run(function(err, foundMsg){
				console.log(err);
				console.log(foundMsg);
				if(err) {
					next(err);
				} else if (foundMsg !== null && foundMsg._id) {
					// existing thread:
						console.log('thread exists');
						Message.threads.push({ from: from_id, msg: msg });
						Message.update({ _id: foundMsg._id }, { 
							user1_viewed: (foundMsg.user1_id === from_id) ? true : false,
							user2_viewed: (foundMsg.user1_id === from_id) ? true : false,
							user1_deleted: false, 
							user2_deleted: false 
						}, function(error) {
								if(error) {
									next(error);
								} else {
									req.flash('success', 'message sent.');
									res.redirect('/messages');
								}
	      		});
				} else {
					// brand new thread
				 	message = new Message({ user1_id: from_id, user2_id: to_id, user1_viewed: true });
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
	}
};



/**
 * read message from a user
 */

exports.readMessage = function(req, res) {
	var username = req.params.username;

	res.render('user/usermessage', { 
 		locals:{ title: 'messages between users' }
  });
};