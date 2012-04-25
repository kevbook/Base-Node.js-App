/**
 * module dependencies 
 */

var mongoose = require('mongoose'),
    helper = require('../boot/helper');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    UserSchema,
    User,
    Pic,
    Location;


/**
 * Pics schema 
 */

Pic = new Schema({
  pic_url     : { type: String, required : true },
  main_pic    : { type: Boolean, default: false },
  visible     : { type: Boolean, default: true },
  created_at  : { type: Date, default : Date.now }
});

/**
 * User schema 
 */

UserSchema = new Schema({
  id                  : { type: ObjectId },
  email               : { type: String, trim: true, unique: true, sparse: true, lowercase: true },
  password            : { type: String, trim: true, set: helper.encryptPass },
  username            : { type: String, required: true, trim: true, unique: true, lowercase: true },
  first_name          : { type: String }, 
  last_name           : { type: String }, 
  gender              : { type: String }, 
  fb_id               : { type: Number, unique: true, sparse: true },
  fb_accessToken      : { type: String }, 
  twitter_id          : { type: Number, unique: true, sparse: true },
  twitter_accessToken : { type: String }, 
  twitter_accessSecret: { type: String }, 
  role                : { type: Number, required: true, default: 1 },
  email_verifed       : { type: Boolean, required: true, default: false },
  pass_reset_date     : { type: Date, default: null },
  pass_reset_hash     : { type: String, default: null },
  pics                : { type: [Pic] },
  zipcode             : { type: String }, 
  lat                 : { type: String }, 
  lng                 : { type: String }, 
  last_login          : { type: Date },
  created_at          : { type: Date, required: true, default: Date.now }
});


UserSchema.path('username').validate(function(value) {
  return helper.isUsername(value)
}, 'username');

UserSchema.path('email').validate(function(value) {
  return helper.isEmail(value);
}, 'email');

User = module.exports = mongoose.model('User', UserSchema);