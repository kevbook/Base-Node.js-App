//require('nodetime').profile();

var express = require('express'),
		fs 		  = require('fs'),
		logger	= require('./lib/logger'),
		appRoot = __dirname,
		port    = process.env.PORT || 8000;


// private key and certificate for https server
var credentials = {
    key: fs.readFileSync('./config/keys/localhost.key').toString(),
    cert: fs.readFileSync('./config/keys/localhost.crt').toString()
};

// http(s) server 
var app = express.createServer().listen(port);


/**
 * boot app loader
 */
require('./config/middleware')(app, appRoot);

// routes
require('./routes/index')(app);
require('./routes/user')(app);
require('./routes/site')(app);

logger.log('server_start', 'server started on port ' + port, true);