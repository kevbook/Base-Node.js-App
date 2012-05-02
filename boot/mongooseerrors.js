var util = require('util'),
    uniques = ['email', 'username'],
    messages = {
      'required': "%s can't be blank.",
      'format': "%s must be at least 3 characters.",
      'unique': "%s is already in use.",
      'email': "%s is invalid",
      'min': "%s below minimum.",
      'max': "%s above maximum.",
      'enum': "%s not an allowed value."
    };

module.exports = function(err, req, callback) {
  var field;
  
  if (err.name === 'ValidationError') {
    for (field in err.errors){
      var eObj = err.errors[field];
      req.flash('error', util.format(messages[eObj.type], eObj.path));

      //If we don't have a message for `type`, just push the error through
      if (!messages.hasOwnProperty(eObj.type)) req.flash('error', eObj.type);
    }
  } else if (err.code === 11000 || err.code === 11001) {
    uniques.forEach(function(val) {
      if(new RegExp('\\$' + val + '_1').test(err.err))
        req.flash('error', "%s is already taken.", val);
    });
  } else {
    callback(err);
  }
  callback(null);
};