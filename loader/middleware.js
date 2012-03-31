module.exports = function(app, appRoot){

	var express = require('express'),
			errorHandler = require(appRoot + '/routes/errors')(app);

	// middleware (order sensitive)
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('secretcode'));
	app.use(express.session({ secret: 'secretcode' }));
	app.use(express.csrf());

	app.configure('development', function(){
		// use AWS S3 to serve content in production
		app.use(express.static(appRoot + '/public'));
	});

	app.use(app.router);
	app.use(errorHandler.notFound); // 404 handler
	app.use(errorHandler.serverError); // 500 handler


	//helpers
	app.dynamicHelpers({
	  token: function(req, res) {
	    return req.session._csrf;
	  }
	});

};


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