module.exports = function(app){
	
	const apiKey = 'MQNVrlQalbQQHJLFmfoDUSreLsYemgYp';

	var http = require('http'),
			api,
			request,
			sendEmail;

	api = http.createClient(80, 'api.postageapp.com');

  request = api.request('POST', '/v.1.0/send_message.json', {
    'host': 'api.postageapp.com',
    'content-type': 'application/json',
    'user-agent': 'PostageApp Node.JS ' + process.version + ')'
  });
      
  

  app.configure('development', function(){
		sendEmail = function(options){
			console.log('Email sent to: ' + options.recipients);
		};
	});
	

	app.configure('production', function(){
	  sendEmail = function(options){

			var mailOptions = {
		    template: options.template || 'hackd',
				from: options.from || 'kevin.sakhuja@gmail.com',
				subject: options.subject || 'Hello',
				recipients: options.recipients || 'kevin.sakhuja@gmail.com',
				variables : options.variables
			};

			// Creates a unique numbersto be used for the UID
			var date = new Date;
			
			var payload = {
	      api_key: apiKey,
	      uid: date.getTime(),
	      arguments: {
	        recipients: mailOptions.recipients,
	        headers: {
	          subject: mailOptions.subject,
	          from: mailOptions.from
	        },
	        template: mailOptions.template,
	        variables: mailOptions.variables
	      }
	    };
	      
		  request.on('response', function (response) {
		  	console.log('STATUS: ' + response.statusCode);
		  	response.setEncoding('utf8');
		  	response.on('data', function (chunk) {
		  		console.log('BODY: ' + chunk);
		  	});
		  });   

	    request.end(JSON.stringify(payload));
	  };
	});

  // setting up global sendEmail function
  app.set('sendEmail', sendEmail);

};

/**
 * Some more mailing options:
 */

	/**
		recipients: ["email1@address.com", "email2@address.com"];
		recipients: {
	    "email@example.com": {
	        'variable': 'Value'
	    }, 
	    "email2@example.com": {
	        'variable': 'Another Value'
	    }
		};

  	variables: {
    	'variable': 'Variable value',
    	'variable2': 'Another variable'
		};
	*/