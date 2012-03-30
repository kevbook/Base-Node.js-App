module.exports = function(app, appRoot){

	var express = require('express'),
	errorHandler = require(appRoot + '/routes/errors')(app);

	/**
	 * middleware setup (order sensitive)
	 */

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('secretcode'));
	app.use(express.session({ secret: 'secretcode' }));

	/*
		// url rewrite:
		app.use(function(req, res, next){
		  if (req.headers.host.match(/^www/) !== null ){
		    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
		  } 
		  else{
		    next(); 
		  }    
		});
	*/

	app.use(app.router);
	app.use(errorHandler.notFound); // 404 handler
	app.use(errorHandler.serverError); // 500 handler

};