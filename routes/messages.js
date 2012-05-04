var Message = require('../models/message'),
		config = require('../boot/config')(),
		mailer = require('postage')(config.postageapp.apiKey),
		mongooseErrors = require('../boot/mongooseerrors');


/**
 * GET - user's message list (last message only)
 * @return {  id: 			: ID,
 							username	: String,
 							pic 			: String, 
 							msg 			: String,
 							viewed   	: Boolean,
 							deleted 	: Boolen,
 							time 			: Date }
 **/

exports.listMessages = function(req, res, next) {
	var id = req.session.auth.user.id;

	var i, Msg, Messages = [];

	Message.find({})
		.or([{ user1_id: id }, { user2_id: id }])
		.populate('user1_id', ['username', 'pics'], {'pics.main_pic': true})
		.populate('user2_id', ['username', 'pics'], {'pics.main_pic': true})
		.run(function(err, messages){
			if(err){
				next(err);
			} else {
				for (i in messages) {
					id == messages[i].user1_id._id ?
						Msg = {
							id: messages[i].user2_id._id, 
							username: messages[i].user2_id.username, 
							pic: messages[i].user2_id.pics[0].pic_url,
							viewed: messages[i].user1_viewed,
							deleted: messages[i].user1_deleted
						} :
						Msg = {
							id: messages[i].user1_id._id, 
							username: messages[i].user1_id.username, 
							pic: messages[i].user1_id.pics[0].pic_url,
							viewed: messages[i].user2_viewed,
							deleted: messages[i].user2_deleted
						};

					Msg.msgId = messages[i]._id;
					Msg.msg = messages[i].threads[0].msg;
					//Msg.time = messages[i].threads[0].created_at;
					Messages[i] = Msg;
				}

				// view rendering: 
				res.render('user/messages', { 
			 		locals:{ 
			 			title: 'user messages',
			 			messages: Messages
			 		}
			  });

		}});
};


/**
* GET - gets all messages between 2 users
* @return {  id: 			: ID,
							username	: String,
							pic 			: String, 
							msg 			: String,
							viewed   	: Boolean,
							deleted 	: Boolen,
							time 			: Date }
**/

exports.userMessage = function(req, res, next) {
	var id   		  	= req.session.auth.user.id,
			otheruserId = req.params.id;

	var i, Msg, Messages = [];

	Message.find({}, ['user1_id', 'user2_id', 'threads'])
	.or([ { user1_id: id, user2_id: otheruserId }, { user2_id: id, user1_id: otheruserId } ])
	.populate('user1_id', ['username', 'pics'], {'pics.main_pic': true})
	.populate('user2_id', ['username', 'pics'], {'pics.main_pic': true})
	//.desc('threads.0.created_at')
	.run(function(err, messages){
		if(err){
			next(err);
		} else {
			for (i in messages[0].threads) {
				messages[0].user1_id._id == messages[0].threads[i].from ?
					Msg = {
						id: messages[0].user1_id._id,
						username: messages[0].user1_id.username,
						pic: messages[0].user1_id.pics[0].pic_url
					} :
					Msg = {
						id: messages[0].user2_id._id,
						username: messages[0].user2_id.username,
						pic: messages[0].user2_id.pics[0].pic_url
					};

				Msg.msg = messages[0].threads[i].msg;
				Messages[i] = Msg;
			}

		 	Messages.msgId = messages[0]._id;

			// view rendering: 
			res.render('user/usermessage', { 
		 		locals:{ 
		 			title: 'user messages',
		 			id: messages[0].user1_id._id == id ? id : messages[0].user2_id._id,
		 			messages: Messages
		 		}
		  });

		}});
};


/**
 * POST - sends a new message
 **/

exports.newMessage = function(req, res, next) {
	var id   		  	= req.session.auth.user.id,
			otheruserId = req.body.id,
			msg 				= req.body.msg;

	var i, Msg, Messages = [];

	if(otheruserId ==='' || msg ==='') {
		req.flash('error', 'A message is required.');
		res.redirect('/messages');
	} else if (id === otheruserId) {
		req.flash('error', 'You are trying to message youself.');
		res.redirect('/messages');
	} else {

		// check if previous conversation exists
		Message.findOne({})
			.or([ { user1_id: id, user2_id: otheruserId }, { user2_id: id, user1_id: otheruserId } ])
			.run(function(err, foundMsg){
				if(err) {
					next(err);
				} else {
					if(foundMsg !== null && foundMessage._id) {
						foundMessage.user1_viewed = false;
						foundMessage.user2_viewed = false;
						foundMessage.user1_deleted = false;
						foundMessage.user2_deleted = true;

						foundMessage.threads.push({ from: id, msg: msg });
						foundMessage.save(function(error){
							if(error) {
								next(error);
							} else {
								req.flash('success', 'message sent.');
								res.redirect('/messages');	
							}						
						});
					} else {
				 		message = new Message({ user1_id: id, user2_id: otheruserId, user1_viewed: true });
						message.threads.push({ from: id, msg: msg });
						message.save(function(error){
							if(error) {
								next(error);
							} else {
								req.flash('success', 'message sent.');
								res.redirect('/messages');
							}
						});
					}
				}
			});

		}
};


/**
 * POST - delete a message
 **/

exports.deleteMessage = function(req, res, next) {
	var id   	= req.session.auth.user.id,
			msgId = req.body.msgId;

	Message.findById(msgId, ['_id', 'user1_id', 'user2_id'], function(err, foundMessage) {
		if(foundMessage.user1_id == id) {
			foundMessage.user1_deleted = false;
		} else if(foundMessage.user2_id == id) {
			foundMessage.user2_deleted = false;
		} else {
			req.flash('error', 'message delete failed.');
			res.redirect('/messages');
		}
		
		foundMessage.save(function(error){
			if(error) {
				next(error);
			} else {
				req.flash('success', 'message deleted.');
				res.redirect('/messages');
			}
		});
	});		
};