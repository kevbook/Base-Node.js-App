const express = require('express'),
			loggly 	= require('loggly');

module.exports = function(app){
	
	switch(app.settings.env){
		case 'production':
			// loggly loger for prod - kevbook.loggly.com
			var logger = loggly.createClient({subdomain:'kevbook'});
			app.use(express.errorHandler());
	  	break;

	  default: // development
	  	// console logger for dev:
	  	var logger = function(log){console.log(log);}
	  	app.use(express.logger('short'));

			app.use(express.errorHandler({ 
	  		dumpExceptions: true, 
	  		showStack: true 
	  	}));
  }

  app.set('logger', logger);


/*
  // Catch All exception handler, log error and exit
process.on('uncaughtException', function (err) {
  console.log('Uncaught exception: ' + err + err.stack);
  process.exit()
});
*/

//16d836cb-84ab-44e3-a0cc-954d75646fcf
}