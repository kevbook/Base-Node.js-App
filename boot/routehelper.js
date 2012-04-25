exports.checkLogged = function(req, res, next) {
  if (req.session.auth.logged === true) {
    next();
  } else {
    res.redirect('/');
  }
};

exports.ifLogged = function(req, res, next) {
  if (req.session.auth.logged === true) {
    res.redirect('/user');
  } else {
    next();
  }
};

exports.checkAdmin = function(req, res, next) {
  if (req.session.auth.logged === true && req.session.user.role === 99) {
    next();
  } else {
    res.redirect('/');
  }
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