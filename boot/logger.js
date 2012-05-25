/**
 * module dependencies 
 */
 
var config = require('../config/config')(),
		loggly = require('loggly'),
		errorCodes = errCodes();


/**
 * Logger helper 
 * @ Uses console logger for development environment
 * @ Uses loggly.com for production environment
 */

exports.log = function(input, msg, printAlso) {
	var client;

	if(errorCodes[input] === undefined) {
		console.log('Error: logger input-token is invalid');
	} else {
		if(process.env.NODE_ENV === undefined) {
		  console.log(msg);
		} else if(process.env.NODE_ENV === 'production') {
			client = loggly.createClient(config.loggly);
			client.log(errorCodes[input], msg);
			if(printAlso) console.log(msg);
		} else {
		  console.log(msg);
		}
	}
};


/**
 * 
 * Mappings of the errors to input tokens for centralized cloud logging. 
 * Input tokens are setup on loggly.com 
 * 
 * @return {object} errors and loggly input tokens
 *
 */
function errCodes(){
	return {
			auth_fail: 'bb73aef8-80f1-4265-aa4b-8db88ba48488',
			db_conn_error: '54b98e8c-627a-4212-95f1-1333e148a0fe',
			email_send_error: 'fc1c8105-ebf4-40ff-94e6-a2116fb51413',
			not_found: '49715906-22a9-4039-a605-ebe29e2131d4',
			server_error: '2c6337a8-f15b-4ae6-b41f-9d957f7af05e',
			server_start: '2637cf4c-642a-48ff-bad5-02741a5c22c1',
			oauth_error: 'cb6238e8-1af9-4bcc-b396-30345bf203f9'
	};
}