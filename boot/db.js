module.exports = function(app) {

	var config 	 = require('./config')(),
			logger 	 = require('./logger'),
			mongoose = require('mongoose');


	/**
	 * connect to mongoDB
	 **/
			
	mongoose.connect(config.mongodb.url);
	
	mongoose.connection.on('open', function(err){
		logger.log('server_start', 'mongodb is connected :)', true);
	});


	/**
	 * mongoDB connection failed, log it
	 **/
			
	mongoose.connection.on('error', function(error){  
	  logger.log('db_conn_error', error, true);
	});

};