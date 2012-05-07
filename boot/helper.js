/**
 * Date object prototype
 * @ add hours to current date stamp
 * @ usage: new Date().addHours(2)
 **/

Date.prototype.addHours= function(hours) {
    this.setHours(this.getHours() + hours);
    return this;
};


/**
 * checks if request is from a mobile platform
 **/

exports.isMobile = function(request){
  var ua = request.header('user-agent');
  return (/mobile/i.test(ua)) ? true : false;	
};


/**
 * checks if argument 1 is equal to argument 2
 **/

exports.isMatch = function(val1, val2){
	return (val1 === val2) ? true : false;
};


/**
 * checks if email is in valid format
 **/

exports.isEmail = function(val){
    // http://projects.scottsplayground.com/email_address_validation/
    var regExpression = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return regExpression.test(val);
};


/**
 * checks if URL is in valid format
 **/

exports.isUrl = function(val){
    // http://projects.scottsplayground.com/iri/
    var regExpression = new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
    return regExpression.test(val);
};


/**
 * checks if username is in valid format
 * @ checks for valid characters and minimum of 3 characters
 **/

exports.isUsername = function(val){
  return /^[A-Za-z0-9_]{3,20}$/.test(val);
};


/**
 * checks if password is in valid format
 * @ checks for valid characters and minimum of 5 characters
 **/

exports.isPassword = function(val){
  return /^[A-Za-z0-9_]{5,20}$/.test(val);
};


/**
 * encrypts a string, well passwords really
 **/

exports.encryptPass = function(passwd){
	var crypto = require('crypto'),
			salt = 'm6xy2pfs9zbwrde06fjvrk2miwfzowrj';

  return crypto.createHmac('sha1', salt).update(passwd).digest('hex');
};


/**
 * converts a string to lowercase
 **/

exports.toLower = function(val){
	return val.toLowerCase();
};


/**
 * hides the 12 characters of a credit card number 
 * @ argument: 16 digit credt card number
 **/

exports.ccHide = function(creditCard) {
  return '****-****-****-' + creditCard.slice(creditCard.length-4, creditCard.length);
};


/**
 * creates a 32 digiti random unique id
 **/

exports.randomHash = function() {
  var strLength = 32, 
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_@',
  randomString = '';

  for (var i = 0; i < strLength; i++) {
      var randomPoz = Math.floor(Math.random() * chars.length);
      randomString += chars.substring(randomPoz,randomPoz+1);
  }
  return randomString;
};


/**
 * converts date of birth to age in years
 * @ argument dob in format 10/02/1984
 **/
 
exports.toAge = function(dob) {
  return Math.floor(( (new Date() - new Date(dob)) / 1000 / (60 * 60 * 24) ) / 365.25 );
};


/**
 * gets geo[lng, lat], city - using google API 
 * @ argument zipcode
 **/
 
exports.zipToGeo = function(zipcode, callback) {
  var geocoder = require('geocoder'), 
      geo = [],
      city; 

  if(/^[0-9]{3,5}$/.test(zipcode)) {
    geocoder.geocode(zipcode, function (err, geoData) {
      if(err) {
        callback(err, null);
      } else {
          city = geoData.results[0].address_components[1].short_name;
          geo.push(geoData.results[0].geometry.location.lng);
          geo.push(geoData.results[0].geometry.location.lat);
          callback(null, geo, city);
      }
    });
  } else {
    // google returned invalid zipcode
    callback(true, null, null);
  }
};