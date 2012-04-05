module.exports = function(app){
	logger = require('./logger');

	return {

		// 404 not found
		notFound: function(req, res){
			// log error:
			logger.log('notFound', '404 error: ' + req.url);

			res.render('errors/404', { 
				status: 404,
		 		locals:{
		 			title: 'not Found 404 :('
		 		}
		  });
		},

		serverError: function(err, req, res, next){
			// log error:
			logger.log('serverError', err.stack);

			// send output based on type of request json vs html
			var accept = req.headers.accept || '';

		  if (~accept.indexOf('json')) {
				var json = JSON.stringify({ error: "There was a server error :(" });
		    res.setHeader('Content-Type', 'application/json');
		    res.end(json);
		  }
		  else{
				res.render('errors/500', { 
					status: err.status || 500,
			 		locals: {
			 			title: '500 internal serverError :('
			 		}
			  });
			}
		}

	};
};