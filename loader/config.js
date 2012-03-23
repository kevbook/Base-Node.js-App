const express = require('express'); 

module.exports = function(app, appRoot){

	// view setup
	app.set('views', appRoot + '/views');
  app.set('view engine', 'jade');

  // other connect-express setup
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secretcode'));
  app.use(express.session({ secret: 'secretcode' }));

	switch(app.settings.env){
		case 'production':
	  	app.set('basepath', 'localhost:3000');
	  	break;

	  default: // development
	  	app.set('basepath', 'localhost:3000');
  }
  
}