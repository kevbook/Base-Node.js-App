
# aggrofolio.com

> aggregate ... your portfolio.

```bash
$ npm install 
$ sudo npm install always -g
$ make run
```			
----

### Mailer Library
Uses [postageapp service](http://postageapp.com)

	var mailer = require('./lib/mailer');
	var options = { 
		recipients: "kevin.sakhuja@gmail.com",
    	subject: "Subject Line",
    	content: {
       	'text/html': '<strong>Sample bold content.</strong>',
			'text/plain': 'Plain text goes here'
    	},
  		variables: {
    		'variable': 'Variable value',
    		'variable2': 'Another variable'
		}
	};

	// to send email 
	mailer.send(options);

	// recipients can be an array
	recipients: ["email1@address.com", "email2@address.com"];

----

### Asset/ Static File Server
Node.js server will be used in dev. In production, any server such as AWS S3, or Rackspace CDN can be used. 

	// prefix assetUrl before any static resource (css,js,img) path:
	<img src="<%=assetUrl%>/img/abc.png">

----

### Error Logging 

Uses console logger for **development environment**

Uses [loggly.com](http://loggly.com) for **production environment**

	logger = require('./lib/logger');
	logger.log('logger-token', 'some message you want to log', printAlso);

	// printAlso is optional passed when you want to send 
	// the log message to central cloud logger as well as 
	// print on the console. 
	
	// Can be used to log events as well