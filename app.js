//require('nodetime').profile();

var express = require('express'),
		fs 		  = require('fs'),
		logger	= require('./app/logger'),
		appRoot = __dirname,
		port    = process.env.PORT || 8000;


// private key and certificate for https server
var credentials = {
    key: fs.readFileSync('./app/keys/localhost.key').toString(),
    cert: fs.readFileSync('./app/keys/localhost.crt').toString()
};

// http(s) server 
var app = express.createServer().listen(port);


/**
 * boot app loader
 */
require('./app/middleware')(app, appRoot);
require('./app/router')(app);
app.dynamicHelpers(require('./app/dynamichelpers'));


logger.log('server_start', 'server started on port ' + port, true);