var passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {

    
    User.findOne({ username: username }, function(err, user) {


      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });



  }
));




// Requires
var mongoose  = require('mongoose'),
    bcrypt    = require('bcrypt');

// Convenience
var Schema    = mongoose.Schema,
    ObjectId  = mongoose.Schema.ObjectId;

// Schema
var User = new Schema({
  name: String,
  alias: { type: String, lowercase: true },
  title: String,
  email: { type: String, lowercase: true },
  password: String,
});

// Virtual properties
User.virtual('id').get(function() {
  return this._id.toHexString();
});

// Methods
User.methods.setPassword = function setPassword(password, callback) {
  var user = this;
  bcrypt.gen_salt(10, function(err, salt) {
    bcrypt.encrypt(password, salt, function(err, hash) {
      if (err) {
        callback(new Error('Failed to encrypt password.'));
      }
      else {
        user.password = hash;
        callback(null, user);
      }
    });
  });
};

User.methods.authenticate = function authenticate(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    callback(res);
  });
};

// Default alias plugin
function aliasGenerator (options) {
  options = options || {};
  var key = options.key || 'name';

  return function aliasGenerator(schema) {
    schema.path(key).set(function(v) {
      if (!this.alias) {
        this.alias = v.toLowerCase().replace(/[\s]/g, '');
        // TODO: Enforce uniqueness
      }
      return v;
    });
  };
}

User.plugin(aliasGenerator());

module.exports = mongoose.model('User', User);