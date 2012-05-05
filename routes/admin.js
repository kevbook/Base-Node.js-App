var User = require('../models/user'),
		mailer = require('postage'),
    helper = require('../boot/helper'),
    logger = require('../boot/logger'),
		config = require('../boot/config')();


module.exports = function(app) {

	app.get('/admin', function(req, res) {
		res.render('admin/index', { 
	 		locals:{ title: 'admin' }
	  });
  });

};