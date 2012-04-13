module.exports = function(app){

	app.get('/contact', function(req, res){
		res.render('site/contact', { 
	 		locals:{
	 			title: 'contact us'
			}
	  });
  });

  app.get('/about', function(req, res){
		res.render('site/about', { 
	 		locals:{
	 			title: 'about us'
			}
	  });
  });

	app.get('/press', function(req, res){
		res.render('site/press', { 
	 		locals:{
	 			title: 'press'
			}
	  });
  });

	app.get('/subdomain/help', function(req, res){
		res.render('site/help', { 
	 		locals:{
	 			title: 'help'
			}
	  });
  });

	app.get('/subdomain/help/privacy', function(req, res){
		res.render('site/privacy', { 
	 		locals:{
	 			title: 'privacy policy'
			}
	  });
  });

	app.get('/subdomain/help/terms', function(req, res){
		res.render('site/terms', { 
	 		locals:{
	 			title: 'terms of service'
			}
	  });
  });

};