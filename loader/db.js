module.exports = function(app){

 	// mongoDB setup
	switch(app.settings.env){
		case 'production':
  		var dbUrl = process.env.DB_URL || 'mongodb://localhost/blogsample';
	  	break;

	  default: // development
  		var dbUrl = process.env.DB_URL || 'mongodb://localhost/blogsample';
  }

  const db = mongoose.createConnection(dbUrl);
  app.set('db', db);

}