const logger  = require('./logger')
	 	, config  = require('./config')
	  , routes 	= require('./routes');


module.exports = function(app, appRoot){
  
  // Logger module
  logger(app);

  // app config
	config(app, appRoot);

	// routes module
  routes(app, appRoot);
};






function Apperror(err, req, res, next) {
  console.error(err.stack);
  // respond with 500 "Internal Server Error".
  res.send(500);
}


function appHelpers(app){
	app.locals.use(function(req, res){
	  // expose "error" and "message" to all views that are rendered.
	  res.locals.error = req.session.error || '';
	  res.locals.message = req.session.message || '';
	  // remove them so they're not displayed on subsequent renders
	  delete req.session.error;
	  delete req.session.message;
	});
}