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
  from_id       : { type: Schema.ObjectId, required: true },
  to_id         : { type: Schema.ObjectId, required: true },
  from_username : { type: String, required: true, trim: true, lowercase: true },
  to_username   : { type: String, required: true, trim: true, lowercase: true },
  from_pic      : { type: String, required: true },
  to_pic        : { type: String, required: true },
  msg           : { type: String, required: true },
  created_at    : { type: Date, required: true, default: Date.now }
});

Msg = module.exports = mongoose.model('Msg', MsgSchema);


Schemas are pluggable, that is, they allow for applying pre-packaged
capabilities to extend their functionality.

Suppose that we have several collections in our database and want
to add last-modified functionality to each one. With plugins this
is easy. Just create a plugin once and apply it to each Schema: