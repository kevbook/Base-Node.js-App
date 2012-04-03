module.exports = function(app, appRoot){
		
	var mongoose 		= require('mongoose'), 
			logger 	 	 	= app.set('logger'),
			errorCodes 	= app.set('errorCodes'),
			MONGO_DB,
			basepath,
			db,
			fb,
			twitter;

	// views	
	app.set('views', appRoot + '/views');
	app.set('view engine', 'jade');

	app.configure('development', function(){
		// view global
		app.set('view options', {
    	pretty: true,
    	assetVersion: '?v1',
    	assetUrl: ''
  	});

		MONGO_DB = 'mongodb://hackd:hackd@staff.mongohq.com:10045/hackd';
		basepath = 'https://localhost:3000';
  	fb 			 = {appId: '1234', appSecret: '123'};
  	twitter  = {appId: '1234', appSecret: '123'};
	});


	app.configure('production', function(){
		// view global
		app.set('view options', {
    	assetVersion: '?v1',
    	assetUrl: 'https://s3.amazonaws.com/hackd/assets/'
  	});

		MONGO_DB = process.env.MONGO_DB || 'mongodb://hackd:hackd@staff.mongohq.com:10045/hackd';
		basepath = process.env.BASEPATH || 'https://localhost:3000',
  	fb 			 = {appId: '1234', appSecret: '123'};
  	twitter  = {appId: '1234', appSecret: '123'};
	});


	// db.
	db = mongoose.connect(MONGO_DB);

	mongoose.connection.on('open', function(){
	  console.log('mongodb connected');
	});

	mongoose.connection.on('error', function(error){	
		logger(errorCodes.dbConn, error);
	});


	// setting up stuff as global in app object
	app.set('db', db);
 	app.set('fb', fb);
 	app.set('twitter', twitter);
 	app.set('basepath', basepath);

};