/**
 * module dependencies 
 */

var mongoose = require('mongoose'),
    helper = require('../boot/helper');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    MsgSchema,
    Msg;

/**
 * Msg schema 
 */

MsgSchema = new Schema({
  id            : { type: ObjectId },
  from_id       : { type: ObjectId, required: true },
  to_id         : { type: ObjectId, required: true },
  from_username : { type: String, required: true, trim: true, lowercase: true },
  to_username   : { type: String, required: true, trim: true, lowercase: true },
  from_pic      : { type: String, required: true },
  to_pic        : { type: String, required: true },
  msg           : { type: String, required: true },
  created_at    : { type: Date, required: true, default: Date.now }
});

Msg = module.exports = mongoose.model('Msg', MsgSchema);

// 
schema.pre('save', function (next) {
  // send out email after save for message received:
})