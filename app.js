//require('nodetime').profile();

var express 		 = require('express'),
		logger			 = require('./boot/logger'),
		port    		 = process.env.PORT || 8000,
		config  		 = require('./boot/config')(),
		logger 			 = require('./boot/logger'),
		errorHandler = require('./boot/errorhandler')(app),
		subdomain 	 = require('subdomain'),
		sessionStore = require('connect-mongoose')(express),
		fs 		   		 = require('fs'),
		auth 			 	 = require('connect-auth');


// private key and certificate for https server
var credentials = {
    key: fs.readFileSync('./boot/keys/localhost.key').toString(),
    cert: fs.readFileSync('./boot/keys/localhost.crt').toString()
};

var app = express.createServer().listen(port);


/**
 * view templating options 
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', config.viewOptions);


/**
 * middleware 
 **/
app.configure('development', function(){
	app.use(express.logger('tiny'));
	app.use(express.static(__dirname + '/public'));
});

app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
	secret :'y34hBuddyL1ghtW3ightB4by',
 	maxAge : new Date(Date.now() + 3600000),
	store  : new sessionStore()
	//{
		//host:config.redis.host, 
		//pass:config.redis.pass, 
		//port:config.redis.port
	//})
}));

app.use(auth({
	strategies : [
		auth.Facebook({
 			appId : config.fb.appId, 
 			appSecret: config.fb.appSecret, 
 			scope: "email, user_birthday",
 			callback: config.fb.callback
	}),
		auth.Twitter({
			consumerKey: config.twitter.consumerKey, 
			consumerSecret: config.twitter.consumerSecret
		})
	],
	trace: true,
}));

app.use(express.csrf());
//app.use(subdomain({base:'127.0.0.1', removeWWW: true}));
app.use(app.router);
app.use(errorHandler.notFound); // 404 handler
app.use(errorHandler.serverError); // 500 handler


/**
 * app booter
 */
require('./boot/db')(app);
require('./boot/router')(app);
app.dynamicHelpers(require('./boot/dynamichelpers'));


logger.log('server_start', 'server started on port ' + port, true);