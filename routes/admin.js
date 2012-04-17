var User = require('../models/User'),
		mailer = require('postage'),
    helper = require('../app/helper'),
    logger = require('../app/logger'),
		config = require('../app/config')();


module.exports = function(app) {

	app.get('/admin', function(req, res) {
		res.render('admin/index', { 
	 		locals:{ title: 'admin' }
	  });
  });

};