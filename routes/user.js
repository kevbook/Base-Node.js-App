var User = require('../models/User'),
		config = require('../config/config')();


module.exports = function(app){

	app.get('/signup', function(req, res){
		res.render('user/signup', { 
	 		locals:{
	 			title: 'sign up'
			}
	  });
  });

	app.get('/login', function(req, res){
		res.render('user/login', { 
	 		locals:{
	 			title: 'login'
			}
	  });
  });

	app.post('/signup', function(req, res){
	  var data = {
	    email: req.body.email, 
	    pass: req.body.password,
	    name: req.body.name
	  };

	  var user = new User(data);
  });


	app.get('/logout', function(req, res){
		req.session.auth = null;
		req.session.user = null;
		req.session.destroy(function(){});
		res.redirect('/', 302);
  });

};