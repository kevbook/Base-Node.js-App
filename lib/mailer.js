exports.send = function(options){

	var http = require('http'),
			config = require('../config/config')(),
			logger = require('../lib/logger'),
			date, 
		  payLoad,
		  api;

  //Creates a unique UID
  date = new Date;

  payload = {
    api_key: config.postageapp.apiKey,
    uid: date.getTime(),
    arguments: {
      recipients: options.recipients || 'kevin.sakhuja@gmail.com',         
      headers: {
        subject: options.subject || 'test email',
        from: options.from || 'kevin.sakhuja@gmail.com'
      },
      content: options.content || {},
      template: options.template || 'hackd',
      variables: options.variables || {}
    }
  };

	api = {
	  host: 'api.postageapp.com',
	  port: 80,
	  path: '/v.1.0/send_message.json',
	  method: 'POST',
	  headers: {
	    'host': 'api.postageapp.com',
	    'content-type': 'application/json',
	    'user-agent': 'express node.js app'
	  }
	};

	var req = http.request(api, function(res) {
		if(res.statusCode != 200){
			res.setEncoding('utf8');
	  	res.on('data', function (chunk) {
	  		logger.log('emailError', res.statusCode + '- BODY: ' + chunk);
	  	});
		}
	});

	req.on('error', function(err) {
	  logger.log('emailError', 'Error with request: ' + err.message);
	});

	// write data to request body
	req.end(JSON.stringify(payload));
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