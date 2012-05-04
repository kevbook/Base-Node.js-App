/**
 * module dependencies 
 */

var mongoose = require('mongoose'),
    helper = require('../boot/helper');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    MsgSchema,
    ThreadSchema;


/**
 * Thread schema 
 */

Thread = new Schema({
  id         : { type: ObjectId },
  from       : { type: ObjectId }, 
  msg        : { type: String, required: true },
  created_at : { type: Date, default: Date.now }
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
  threads       : { type: [ThreadSchema] }
});

var Message = module.exports = mongoose.model('Message', MsgSchema);

/*
MsgSchema.pre('save', function (next) {
  // send out email after save for message received:
});
*/