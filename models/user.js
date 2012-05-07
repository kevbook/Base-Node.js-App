/**
 * module dependencies 
 */

var mongoose = require('mongoose'),
    helper = require('../boot/helper');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    UserSchema,
    User,
    Pic;

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
  id        : { type: ObjectId },
  email     : { type: String, trim: true, unique: true, sparse: true, lowercase: true },
  password  : { type: String, trim: true, set: helper.encryptPass },
  username  : { type: String, required: true, trim: true, unique: true, lowercase: true },
  profile   : {
    first_name  : { type: String },
    last_name   : { type: String }, 
    gender      : { type: String },
    birthday    : { type: String },
    education   : { type: String },
    smoker      : { type: String },
    have_kids   : { type: String },
    want_kids   : { type: String },
    search_zip  : { type: String },
    city        : { type: String },
  }, 
  location  : {
    zipcode     : { type: String }, 
    geo         : { type: [Number] } // lng,lat
  },
  fb        : {
    id          : { type: Number, unique: true, sparse: true },
    accessToken : { type: String }
  }, 
  twitter   : {
    id          : { type: Number, unique: true, sparse: true },
    accessToken : { type: String },
    accessSecret: { type: String }
  },
  role            : { type: Number, required: true, default: 1, enum: [1, 50, 99] },
  pics            : { type: [Pic] },
  email_verifed   : { type: Boolean, required: true, default: false },
  pass_reset_date : { type: Date, default: null },
  pass_reset_hash : { type: String, default: null },
  last_login      : { type: Date },
  created_at      : { type: Date, required: true, default: Date.now }
});


// validators
UserSchema.path('username').validate(function(value) {
  return helper.isUsername(value)
}, 'username');

UserSchema.path('email').validate(function(value) {
  return helper.isEmail(value);
}, 'email');

// virtual attribute
UserSchema.virtual('profile.age').get(function () {
  return Math.floor(( (new Date() - new Date(this.profile.birthday)) / 1000 / (60 * 60 * 24) ) / 365.25 );
});

/**
 * values for role attribute:
 * 1  = regular user
 * 50 = moderator
 * 99 = admin
 **/

User = module.exports = mongoose.model('User', UserSchema);