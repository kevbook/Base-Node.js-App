var User = require('../models/user'),
		config = require('../boot/config')(),
		mailer = require('postage')(config.postageapp.apiKey),
		helper = require('../boot/helper'),
		logger = require('../boot/logger'),
		geocoder = require('geocoder'),
		mongooseErrors = require('../boot/mongooseerrors');


/**
 * user messages view
 */

exports.index = function(req, res) {
  res.render('user/search', { 
    locals:{ title: 'search users' }
  }); 
};

function findNear() {
  db.find( { geo : { $near : [50,50] , $maxDistance : 5 } } ).limit(20);


};

function getGeo(req, res, next) {
  var zip = req.body.zip,
  lat, 
  lng;

  if(/^[0-9]{3,5}$/.test(zip)) {
    geocoder.geocode(zip, function (err, data) {
      if(err) {
        next(err);
      } else {
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
      }
    });
  } else {
    req.flash('error', 'Invalid zipcode.');
  }
};