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
    search_zip  : { type: String }
  }, 
  location  : {
    zipcode     : { type: String }, 
    lat         : { type: String },
    lng         : { type: String }
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



/*
Middleware

Middleware are defined at the Schema level and are applied when the methods init (when a document is initialized with data from MongoDB), save, and remove are called on a document instance.

There are two types of middleware, serial and parallel.

Serial middleware are defined like:

schema.pre('save', function (next) {
  // ...
})
They're executed one after the other, when each middleware calls next.

Parallel middleware offer more fine-grained flow control, and are defined like

schema.pre('remove', true, function (next, done) {
  // ...
})
Parallel middleware can next() immediately, but the final argument will be called when all the parallel middleware have called done().

Use cases

Middleware are useful for:

Complex validation
Removing dependent documents when a certain document is removed (eg: removing a user removes all his blogposts)
Asynchronous defaults
Asynchronous tasks that a certain action triggers. For example:
Triggering custom events
Creating notifications
Emails
and many other things. They're specially useful for atomizing model logic and avoiding nested blocks of async code.

Error handling

If any middleware calls next or done with an Error instance, the flow is interrupted, and the error is passed to the callback.

For example:

schema.pre('save', function (next) {
    // something goes wrong
    next(new Error('something went wrong'));
});

// later...

myModel.save(function (err) {
  // err can come from a middleware
});


*/




/**
 * values for role attribute:
 * 1  = regular user
 * 50 = moderator
 * 99 = admin
 **/

User = module.exports = mongoose.model('User', UserSchema);