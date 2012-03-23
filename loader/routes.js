module.exports = function(app, appRoot){
	
	app.use(app.router);
	var routes = require (appRoot + '/routes');

	// home
	app.all('/', routes.index); 

	// site nav 
	app.get('/tour', routes.nav);
	app.get('/pricing', routes.nav);
	app.get('/signup', routes.nav);
	app.get('/login', routes.nav);

	// site footer
  app.get('/about', routes.footer);
  app.get('/press', routes.footer);
	app.get('/contact', routes.footer);
	app.get('/privacy', routes.footer);
	app.get('/terms', routes.footer);


  // Route notFound 404 page via Connect middleware
  app.use(routes.notFound);
}