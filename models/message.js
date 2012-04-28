/**
 * module dependencies 
 */

var mongoose = require('mongoose'),
    helper = require('../boot/helper');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    MsgSchema,
    Message,
    Thread;


/**
 * Thread schema 
 */

Thread = new Schema({
  id            : { type: ObjectId },
  from          : { type: ObjectId }, 
  msg           : { type: String, required: true },
  created_at    : { type: Date, required: true, index: true, default: Date.now }
});


/**
 * Message schema 
 */

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


/**
 * get all messages for the user - inbox view
 **/

/*
MsgSchema.statics.getAllMsg = function getAllMsg(user, cb) {
  //return this.where('from_username', user).or('to_username', user).run(cb);
  return this
    .find()
    .or([{ from_username: user }, { to_username: user }])
    //.size(1)
   // .distinct('from_username')
    .desc('created_at')
    .run(cb);
};



/**
 * send a message
 **/

/*
MsgSchema.statics.sendMsg = function sendMsg(args, cb) {
  if 


  //return this.where('from_username', user).or('to_username', user).run(cb);
  return this
    .find()
    .or([{ from_username: user }, { to_username: user }])
    //.size(1)
   // .distinct('from_username')
    .desc('created_at')
    .run(cb);
};


*/

Message = module.exports = mongoose.model('Message', MsgSchema);

/*
MsgSchema.pre('save', function (next) {
  // send out email after save for message received:
});
*/