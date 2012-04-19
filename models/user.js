/**
 * module dependencies 
 */

var mongoose = require('mongoose'),
    helper = require('../app/helper');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    UserSchema,
    User,
    PicSchema,
    Pic;


/**
 * Pics schema 
 */

PicSchema = new Schema({
  id          : { type : ObjectId },
  pic_url     : { type : String, required : true },
  main_pic    : { type: Boolean, default: false },
  visible     : { type: Boolean, default: true },
  created_at  : { type: Date, default : Date.now }
});

Pic = mongoose.model('Pic', PicSchema);


/**
 * User schema 
 */

UserSchema = new Schema({
  id                  : { type: ObjectId },
  email               : { type: String, required: true, trim: true, unique: true, lowercase: true},
  password            : { type: String, required: true, trim: true, set: helper.encryptPass},
  username            : { type: String, required: true, trim: true, unique: true, lowercase: true},
  email_verifed       : { type: Boolean, required: true, default: false },
  role                : { type: Number, required: true, default: 1 },
  pass_reset_date     : { type : Date },
  pass_reset_hash     : { type : String },
  pics                : { type : [Pic] },
  auth_provider       : { type: String},
  auth_provider_id    : { type: String},
  accessToken         : { type: String},
  accessTokenSecret   : { type: String},
  last_login          : { type: Date},
  created_at          : { type: Date, required: true, default: Date.now},
  updated_at          : { type: Date, required: true, default: Date.now}
});

UserSchema.path('username').validate(function(value) {
  return helper.isUsername(value)
}, 'format');

UserSchema.path('email').validate(function(value) {
  return helper.isEmail(value);
}, 'email');

UserSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

User = module.exports = mongoose.model('User', UserSchema);