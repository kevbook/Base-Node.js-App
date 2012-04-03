var cluster = require('cluster'),
		express = require('express'),
		fs 		  = require('fs'),
		appRoot = __dirname,
		port    = process.env.PORT || 3000;


/** 
 * server setup
 */

// private key and certificate for https server
var credentials = {
    key: fs.readFileSync(appRoot + '/keys/localhost.key'),
    cert: fs.readFileSync(appRoot + '/keys/localhost.crt')
};

// https server 
var app = express.createServer(credentials).listen(port);


/**
 * boot app loader
 */
require('./config/logger')(app);
require('./config/config')(app, appRoot);
require('./config/middleware')(app, appRoot);
require('./config/mailer')(app);
require('./config/router')(app, appRoot);


/* TESTING EMAIL */
var sendEmail = app.set('sendEmail', sendEmail);
sendEmail({recipients:'kevin.sakhuja@gmail.com'});


var logger     = app.set('logger');
var errorCodes = app.set('errorCodes');
logger(errorCodes.serverStart, 'server started on port ' + port, true);