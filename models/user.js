/**
 * module dependencies 
 */

var mongoose = require('mongoose'),
    helper = require('../lib/helper');


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    UserSchema,
    User;

UserSchema = new Schema({
  id                  : { type: ObjectId },
  email               : { type: String, required: true, trim: true, unique: true, set: helper.toLower},
  password            : { type: String, required: true, trim: true, set: helper.encryptPass},
  username            : { type: String, required: true, trim: true, unique: true, set: helper.toLower},
  email_verifed       : { type: Boolean, default: false },
  is_admin            : { type: Boolean, default: false },
  auth_provider       : { type: String},
  is_password_reset   : { type : Boolean, default : false },
  password_reset_url  : { type : String },
  created_at          : { type: Date, required: true, default: Date.now}
});


UserSchema.path('username').validate(function(value) {
  return helper.isUsername(value)
}, 'Invalid username. Only letters, numbers and underscores!');

UserSchema.path('password').validate(function(value) {
  return helper.isPassword(value)
}, 'Invalid password. Only letters, numbers and underscores!');

UserSchema.path('email').validate(function(value) {
  return helper.isEmail(value);
}, 'Invalid email address!');


User = module.exports = mongoose.model('User', UserSchema);