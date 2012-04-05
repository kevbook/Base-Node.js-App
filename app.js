var express = require('express'),
		fs 		  = require('fs'),
		logger	= require('./lib/logger'),
		appRoot = __dirname,
		port    = process.env.PORT || 3000;


// private key and certificate for https server
var credentials = {
    key: fs.readFileSync('./config/keys/localhost.key'),
    cert: fs.readFileSync('./config/keys/localhost.crt')
};

// https server 
var app = express.createServer(credentials).listen(port);


/**
 * boot app loader
 */
require('./config/middleware')(app, appRoot);
require('./config/router')(app, appRoot);


//var mailer = require('./lib/mailer');
//mailer.send({});


logger.log('server_start', 'server started on port ' + port, true);