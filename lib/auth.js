exports.isLogged = function(req, res, next) {
  if (req.session && req.session.auth === true) {
    next();
  } else {
  	req.flash('error', 'Not logged in!');
    res.redirect('/', 302);
  };
};