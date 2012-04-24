/**
 * module dependencies 
 */

var User = require('../models/User'),
    config = require('../boot/config')(),
    mailer = require('postage')(config.postageapp.apiKey),
    helper = require('../boot/helper'),
    logger = require('../boot/logger'),
    mongooseErrors = require('../boot/mongooseerrors');




exports.loginFacebook = function(req, res, next) {
 req.authenticate(['facebook'], function(error, authenticated) { 
    if(authenticated ) {
      console.log(req.getAuthDetails());
      res.end();
    }
    else {
      res.end("<html><h1>Facebook authentication failed :( </h1></html>")
    }
   });
};