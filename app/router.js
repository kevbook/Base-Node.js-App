var index = require('../routes/index'),
    auth = require('../routes/auth');

//  , admin = require('../controllers/admin/index')
 // , user = require('../controllers/general/user');

module.exports = function(app) {

  app.all('/', index.index);

  app.get('/contact', index.contact);
  app.get('/about', index.about);
  app.get('/press', index.press);
  app.get('/subdomain/help', index.help);
  app.get('/subdomain/help/privacy', index.privacy);
  app.get('/subdomain/help/terms', index.terms);

  app.get('/login', auth.login);
  app.get('/signup', auth.signup);
  app.get('/logout', auth.logout);
  app.get('/forgot', auth.forgot);

  app.post('/login', auth.doLogin);
  app.post('/signup', auth.doSignup);
  app.post('/forgot', auth.doForgot);
  app.post('/pass_reset', auth.passReset);

};

/*
  app.get('/admin', checkAuth('admin'), admin.index);

  app.get('/subdomain/blog/', blog.index);

  app.get('/user/register', user.register);
  app.get('/user/login', user.login);
  app.get('/user/edit', checkAuth(), user.edit);
  app.post('/user/edit', checkAuth(), user.edit_post);
  app.get('/user/reset-password', checkAuth(), user.reset_password);
  app.post('/user/reset-password', checkAuth(), user.reser_password_post);
  app.get('/user/update-password/:hash', checkAuth(), user.update_password_post);
  app.post('/user/update-password', checkAuth(), user.update_password);
  app.get('/user/logout', user.logout);
  app.post('/user/register', user.register_post);
  app.get('/user/confirm-email/:email/:hash', checkAuth(), user.confirm_email);
  app.post('/user/login', user.login_post);

  app.get('/auth', checkAuth(), auth.index);
  app.get('/auth/connect/:api', checkAuth(), auth.connect);
  app.get('/auth/callback/:api', checkAuth(), auth.callback);
  app.get('/resume', checkAuth(), resume.index);
  app.get('/projects', checkAuth(), project.index);

  app.get('/subdomain/:subdomain/', profile.index);
  */