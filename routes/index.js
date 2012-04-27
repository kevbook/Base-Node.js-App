/**
 * landing page view
 */

exports.index = function(req, res) {
	res.render('home', { 
 		locals:{ title: 'home' }
  });
};


/**
 * contact us view
 */

exports.contact = function(req, res) {
	res.render('site/contact', { 
 		locals:{ title: 'contact us' }
  });
};


/**
 * about us view
 */

exports.about = function(req, res) {
	res.render('site/about', { 
 		locals:{ title: 'about us' }
  });
};


/**
 * press page view
 */

exports.press = function(req, res) {
	res.render('site/press', { 
 		locals:{ title: 'press' }
  });
};


/**
 * help page view
 */

exports.help = function(req, res) {
	res.render('site/help', { 
 		locals:{ title: 'help' }
  });
};


/**
 * privacy policy page view
 */

exports.privacy = function(req, res) {
	res.render('site/privacy', { 
 		locals:{ title: 'privacy policy' }
  });
};


/**
 * terms of use page view
 */

exports.terms = function(req, res) {
	res.render('site/terms', { 
 		locals:{ title: 'terms of service' }
  });
};