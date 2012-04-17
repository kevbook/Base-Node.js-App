exports.index = function(req, res) {
	res.render('home', { 
 		locals:{ title: 'home' }
  });
};

exports.contact = function(req, res) {
	res.render('site/contact', { 
 		locals:{ title: 'contact us' }
  });
};

exports.about = function(req, res) {
	res.render('site/about', { 
 		locals:{ title: 'about us' }
  });
};

exports.press = function(req, res) {
	res.render('site/press', { 
 		locals:{ title: 'press' }
  });
};

exports.help = function(req, res) {
	res.render('site/help', { 
 		locals:{ title: 'help' }
  });
};

exports.privacy = function(req, res) {
	res.render('site/privacy', { 
 		locals:{ title: 'privacy policy' }
  });
};

exports.terms = function(req, res) {
	res.render('site/terms', { 
 		locals:{ title: 'terms of service' }
  });
};