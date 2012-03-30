module.exports = function(app, appRoot){
		
	var mongoose 		= require('mongoose'), 
			logger 	 	 	= app.set('logger'),
			errorCodes 	= app.set('errorCodes'),
			MONGO_DB,
			basepath,
			db,
			fb,
			twitter;


	app.configure('development', function(){
		MONGO_DB = 'mongodb://hackd:hackd@staff.mongohq.com:10045/hackd';
		basepath = 'https://localhost:3000';
  	fb 			 = {appId: '1234', appSecret: '123'};
  	twitter  = {appId: '1234', appSecret: '123'};
	});


	app.configure('production', function(){
		MONGO_DB = process.env.MONGO_DB || 'mongodb://hackd:hackd@staff.mongohq.com:10045/hackd';
		basepath = process.env.BASEPATH || 'https://localhost:3000',
  	fb 			 = {appId: '1234', appSecret: '123'};
  	twitter  = {appId: '1234', appSecret: '123'};
	});


	// views	
	app.set('views', appRoot + '/views');
	app.set('view engine', 'jade');

	
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