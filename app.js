/* ----- module dependencies ----- */
 var express = require('express')
  , routes   = require('./routes')
  , fs 		   = require('fs')
  , port     = process.env.PORT || 3000;


/* ----- private key and certificate for https server ----- */
var https_keys = {
    key: fs.readFileSync(__dirname + '/keys/localhost.key'),
    cert: fs.readFileSync(__dirname + '/keys/localhost.crt')
  };

var app = module.exports = express.createServer();
app.listen(port);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: true });
  app.use(express.favicon(__dirname + '/favicon.ico'));        
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secretcode'));
  app.use(express.session({ secret: 'secretcode' }));
  app.use(app.router);
});

/* ----- environment settings ----- */ 
app.configure('development', function(){
  app.use(express.logger('dev'));
  app.set('basepath', 'localhost:3000');
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.set('basepath', 'localhost:3000');
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});


/* ----- www to non-www ----- */
app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) 
    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url, 301);
  else next();
});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

app.get('/', routes.index);


/* -- main routes -- */
app.get('/host/:id([0-9]+)', routes.host);
app.get('/event/:id([0-9]+)', routes.event);
app.get('/user/:id([0-9]+)', routes.user);

/* -- event action -- */
app.post('/event/:id([0-9]+)/:action?', routes.event_action);


/*

app.all('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);
app.get('/user/:id/view', user.view);
app.get('/user/:id/edit', user.edit);
app.put('/user/:id/edit', user.update);

*/




/* -- site footer -- */
app.get('/about', routes.footer);
app.get('/press', routes.footer);
app.get('/contact', routes.footer);
app.get('/privacy', routes.footer);
app.get('/terms', routes.footer);

/* -- site nav -- */
app.get('/tour', routes.nav);
app.get('/pricing', routes.nav);
app.get('/signup', routes.nav);
app.get('/login', routes.nav);

//The 404 Route (ALWAYS Keep this as the last route)
app.all('(/*)?', routes.notFound);


//A Route for Creating a 500 Error (Useful to keep around)
/*
app.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});
*/

console.log("Node.js server on port %d in %s mode", app.address().port, app.settings.env);