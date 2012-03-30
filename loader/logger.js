module.exports = function(app){
	
	var express = require('express'),
			loggly 	= require('loggly'),
			client, 
			logger;
			

  app.configure('development', function(){
	 		logger = function(){
	  		var args = Array.prototype.slice.call(arguments);
	  		console.log(args[1]);
	  	};
	  	
	  	app.use(express.logger('short'));
	});

	app.configure('production', function(){
		client = loggly.createClient({subdomain:'kevbook'});
		logger = function(input, msg, printAlso){
			client.log(input, msg);
			if(printAlso){
				console.log(msg);
			}
		};	
	});

  app.set('logger', logger);
  app.set('errorCodes', errorCodes());
};



/**
 * 
 * Mappings of the errors to input tokens for centralized cloud logging. 
 * Input tokens are setup on loggly.com 
 * 
 * @return {object} errors and loggly input tokens
 */
function errorCodes(){
	var errorCodes;

	return errorCodes = {
			serverStart	: '2e4a1908-87f5-4334-b710-a03e061f2a54',
			notFound 		: '123',
			serverError	: 'xyz',
			dbConn			: 'wxy',
			authFailed	: '123'
	};
}