exports.index = function(req, res){	
	
	//var logger = app.set('logger');
	//logger.log('16d836cb-84ab-44e3-a0cc-954d75646fcf', 'tester');

	res.render('home', { 
 		title: 'home'
  });
};


exports.notFound = function(req, res){
	res.render('errors/404', { 
		status: 404,
 		title: '404 notFound :('
  });
}


	function footer(req, res){
		res.render('nav/' + req.url, { 
	 		title: req.url 
	  });
	};