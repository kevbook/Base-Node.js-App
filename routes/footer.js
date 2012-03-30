// footer section
exports.about = function(req, res){
	res.render('footer/about', { 
 		title: 'about'
  });
};

exports.contact = function(req, res){
	res.render('footer/contact', { 
 		title: 'contact'
  });
};

exports.press = function(req, res){
	res.render('footer/press', { 
 		title: 'press'
  });
};

exports.privacy = function(req, res){
	res.render('footer/privacy', { 
 		title: 'privacy'
  });
};

exports.terms = function(req, res){
	res.render('footer/terms', { 
 		title: 'terms'
  });
};