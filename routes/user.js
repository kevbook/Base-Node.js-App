exports.index = function(req, res) {
	res.render('user/index', { 
 		locals:{ title: 'user index page' }
  });
};