module.exports = function(app, appRoot) {

	var index 	= require(appRoot + '/routes/index'),
			nav 		= require(appRoot + '/routes/nav'),
			footer 	= require(appRoot + '/routes/footer'),
			user 		= require(appRoot + '/routes/user');


	// home page
  app.all('/', index.index); 

  // site nav 
  app.get('/tour', nav.tour);
  app.get('/pricing', nav.pricing);
  app.get('/signup', nav.signup);
  app.get('/login', nav.login);

  // site footer
  app.get('/about', footer.about);
  app.get('/press', footer.press);
  app.get('/contact', footer.contact);
  app.get('/privacy', footer.privacy);
  app.get('/terms',  footer.terms);
};