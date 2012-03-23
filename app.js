// module dependencies
const express = require('express')
		,	fs 		  = require('fs')
  	, appRoot = __dirname
  	, port    = process.env.PORT || 3000;


// private key and certificate for https server
var credentials = {
    key: fs.readFileSync(appRoot + '/keys/localhost.key'),
    cert: fs.readFileSync(appRoot + '/keys/localhost.crt')
};

// https server 
var app = module.exports = express.createServer(credentials);
app.listen(port);


// ****** Loading the booter ******
require(appRoot + '/loader/boot')(app, appRoot);


app.listen(3000);
console.log("server started on port %d in %s mode", port, app.settings.env);