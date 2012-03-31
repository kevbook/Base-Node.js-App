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
require('./loader/logger')(app);
require('./loader/config')(app, appRoot);
require('./loader/middleware')(app, appRoot);
require('./loader/routes')(app, appRoot);



var logger     = app.set('logger');
var errorCodes = app.set('errorCodes');
logger(errorCodes.serverStart, 'server started on port ' + port, true);