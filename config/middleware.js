module.exports = function(app, appRoot){

	var express = require('express'),
			config 	=	require('./config')(),
			errorHandler = require('./errorhandler')(app);


	app.set('views', appRoot + '/views');
	app.set('view engine', 'jade');
	app.set('view options', config.viewOptions);

	// middleware (order sensitive)
	app.configure('development', function(){
		// use AWS S3 to serve content in production
		app.use(express.static(appRoot + '/public'));
		app.use(express.logger('short'));
	});

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('secretcode'));
	app.use(express.session({ secret: 'secretcode' }));
	app.use(express.csrf());
	app.use(app.router);
	app.use(errorHandler.notFound); // 404 handler
	app.use(errorHandler.serverError); // 500 handler



	/**
	 * Helper functions 
	 */
	app.dynamicHelpers({
	  token: function(req, res) {
	    return req.session._csrf;
	  },

	 	session: function(req, res){
    	return req.session;
  	}
	});

};