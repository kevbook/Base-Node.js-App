module.exports = function(app){

	app.get('/all', function(req, res){
		res.render('home', { 
	 		locals:{
	 			title: 'home'
			}
	  });
  });

};