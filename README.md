#Base Node.js App#

#####This is a base node.js app using:
* connect and express
* jade (html preprocessor)
* less (css preprocessor, compiled manually)
* redis (caching)
* mongoDB (db store)
* postageapp (email delivery)
* loggly (for logging)


*any questions, suggestions to improve this* kevin.sakhuja@gmail.com   
*twitter* [@kevbook](https://twitter.com/kevbook)  

***

#### Installation 
	// Clone repo:
	git clone git@github.com:kevbook/node-base.git   

	// Install dependencies
	sudo npm install   
    

To monitor changes in the node.js app and automatically restart the server - **[nodemon](https://github.com/remy/nodemon)** is used:
	
	npm install nodemon -g


**All set, lets test the app**

	nodemon app.js  
	curl https://localhost:3000/ -k

***

#### HTTPS Certs 
**Http server** certificates and keys are located in the `config/keys` directory. New certificates can be created for dev purposes:
	
	openssl genrsa -out localhost.key 1024
	
	// check if the key was created:
	cat localhost.key
	
	openssl req -new -key localhost.key -out localhost.csr
	
	openssl x509 -req -days 365 -in localhost.csr -signkey localhost.key -out localhost.crt 


***

#### Environment variables
**MONGO_DB** variable

	$ MONGO_DB=mongodb://localhost/dbname     


**NODE_ENV** environment

	$ NODE_ENV=production

***

#### Error Logging 

Uses console logger for **development environment**

Uses [loggly.com](http://loggly.com) for **production environment**

	logger = require('./lib/logger');
	logger.log('logger-token', 'some message you want to log', printAlso);

	// printAlso is optional passed when you want to send 
	// the log message to central cloud logger as well as 
	// print on the console. 


***

#### Mailer

Uses [postageapp.com](http://postageapp.com) service to send emails out for forgot password etc.

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

	// send out email
	mailer.send(options);
 
	// recipients can be an array
	recipients: ["email1@address.com", "email2@address.com"];

***


### MIT License
Copyright © 2012 Kevin Sakhuja

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.