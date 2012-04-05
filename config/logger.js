exports.log = function(input, msg, printAlso){

	var config = require('./config')(),
			loggly = require('loggly'),
			errorCodes = errCodes(),
			client;

	if(errorCodes[input] === undefined){
		console.log('Error: logger input-token is invalid');
	}else{

		if(process.env.NODE_ENV === undefined){
		  console.log(msg);
		}else{
			client = loggly.createClient(config.loggly);
			client.log(errorCodes[input], msg);

			// prints to console as well.
			if(printAlso){
					console.log(msg);
			}
		}
	}

};


/**
 * 
 * Mappings of the errors to input tokens for centralized cloud logging. 
 * Input tokens are setup on loggly.com 
 * 
 * @return {object} errors and loggly input tokens
 */
function errCodes(){
	return {
			serverStart	: '2e4a1908-87f5-4334-b710-a03e061f2a54',
			notFound 		: '123',
			serverError	: 'xyz',
			dbConn			: 'wxy',
			authFailed	: '123',
			emailError	: '123'
	};
}