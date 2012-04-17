exports.isLogged = function(req, res, next) {
  if (req.session && req.session.auth === true) {
    next();
  } else {
  	req.flash('error', 'Not logged in!');
    res.redirect('/', 302);
  };
};

exports.updateSession = function(req, res, next) {
  if (req.session && req.session.auth === true) {
    User.findById(req.session.user_id, function(user) {
    	req.session.user = user;
    	next();
  	});
  } else {
  	req.flash('error', 'Not logged in!');
    res.redirect('/', 302);
  };
};