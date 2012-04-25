var index = require('../routes/index'),
    auth = require('../routes/auth'),
    user = require('../routes/user.js'),
    search = require('../routes/search.js'),
    routeHelper = require('./routehelper.js');

//  , admin = require('../controllers/admin/index')
 // , user = require('../controllers/general/user');

module.exports = function(app) {

  app.all('/', index.index);

  // footer
  app.get('/contact', index.contact);
  app.get('/about', index.about);
  app.get('/press', index.press);
  app.get('/subdomain/help', index.help);
  app.get('/subdomain/help/privacy', index.privacy);
  app.get('/subdomain/help/terms', index.terms);

  app.get('/login', routeHelper.ifLogged, auth.login);
  app.get('/signup', routeHelper.ifLogged, auth.signup);
  app.get('/forgot', routeHelper.ifLogged, auth.forgot);
  app.get('/pass_reset/:email/:hash', routeHelper.ifLogged, auth.passReset);

  app.post('/login', routeHelper.ifLogged, auth.doLogin);
  app.post('/signup', routeHelper.ifLogged, auth.doSignup);
  app.post('/forgot', routeHelper.ifLogged, auth.doForgot);
  app.post('/pass_reset', routeHelper.ifLogged, auth.doPassReset);

  // social logins
  app.get('/login/twitter', routeHelper.ifLogged, auth.loginTwitter);
  app.get('/login/fb', routeHelper.ifLogged, auth.loginFb);

  // logout
  app.get('/logout', auth.logout);

  // user
  //app.get('/user', routeHelper.checkLogged, user.index);
  app.get('/user', user.index);

  // search 
  app.get('/search', search.index);
  app.post('/search', search.zip);

};

/*
  app.get('/subdomain/:subdomain/', profile.index);
  */