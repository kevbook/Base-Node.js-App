module.exports = function(app, appRoot){

	/**
	 * module dependencies 
	 */

	var express 		 = require('express'),
			config 			 = require('./config')(),
			logger 			 = require('./logger'),
			errorHandler = require('./errorhandler')(app),
			subdomain 	 = require('subdomain');

	/**
	 * connecting to db. 
	 */

	var mongoose 		 = require('mongoose'),
			sessionStore = require('connect-redis')(express);

	mongoose.connect(config.mongodb.url);
	
	mongoose.connection.on('open', function(err){
		logger.log('server_start', 'mongodb is connected :)', true);
	});

	mongoose.connection.on('error', function(error){  
	  logger.log('db_conn_error', error, true);
	});

	/**
	 * view templating options 
	 */

	app.set('views', appRoot + '/views');
	app.set('view engine', 'jade');
	app.set('view options', config.viewOptions);

	/**
	 * middleware (order sensitive)
	 */

	app.configure('development', function(){
		app.use(express.static(appRoot + '/public'));
		app.use(express.logger('short'));
	});

	app.use(subdomain({base:'localhost', removeWWW: true}));
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
		secret :'y34hBuddyL1ghtW3ightB4by',
		maxAge : new Date(Date.now() + 720000),
  	store  : new sessionStore({host:config.redis.host, pass:config.redis.pass, port:config.redis.port})
	}));
	app.use(express.csrf());
	app.use(app.router);
	app.use(errorHandler.notFound); // 404 handler
	app.use(errorHandler.serverError); // 500 handler

};