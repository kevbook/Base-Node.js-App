// nav section
exports.tour = function(req, res){
	res.render('nav/tour', { 
 		title: 'tour'
  });
};

exports.pricing = function(req, res){
	res.render('nav/pricing', { 
 		title: 'pricing'
  });
};

exports.signup = function(req, res){
	res.render('nav/signup', { 
 		title: 'sign up'
  });
};

exports.login = function(req, res){
	res.render('nav/login', { 
 		title: 'login'
  });
};