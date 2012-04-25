var User = require('../models/User'),
		config = require('../boot/config')(),
		mailer = require('postage')(config.postageapp.apiKey),
		helper = require('../boot/helper'),
		logger = require('../boot/logger'),
		geocoder = require('geocoder'),
		mongooseErrors = require('../boot/mongooseerrors');


exports.index = function(req, res, next) {
	res.render('search/index', { 
 		locals:{ title: 'search page' }
  });
};

exports.zip = function(req, res, next) {
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

				res.render('search/index', { 
			 		locals:{ title: 'search page' }
			  });

      }
    });
  } else {
  	req.flash('error', 'Invalid zipcode.');
  	res.redirect('/search');
  }
};