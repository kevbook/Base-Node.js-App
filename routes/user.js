exports.index = function(req, res) {
	console.log(req.session.auth);
	res.render('user/index', { 
 		locals:{ title: 'user main page' }
  });
};