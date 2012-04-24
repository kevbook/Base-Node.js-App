module.exports = function(app){

	var logger = require('./logger');

	return {

		notFound: function(req, res){
			// log error:
			logger.log('not_found', '404 error: ' + req.url);

			res.render('errors/404', { 
				status: 404,
		 		locals:{ title: 'not Found 404 :(' }
		  });
		},
		
		serverError: function(err, req, res, next){
			// log error:
			(err.status != 500) ? 
				logger.log('server_error', err) : logger.log('server_error', err.stack);

			// send output based on type of request json vs html
			var accept = req.headers.accept || '';

		  if (~accept.indexOf('json')) {
		  	res.json({ error: "There was a server error :(" }, err.status || 500);
		  }
		  else{
				res.render('errors/500', { 
					status: err.status || 500,
			 		locals: { title: '500 internal serverError :(' }
			  });
			}
		}

	};
};