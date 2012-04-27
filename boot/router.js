/** 
 * dependencies 
 **/

var index       = require('../routes/index'),
    auth        = require('../routes/auth'),
    user        = require('../routes/user.js'),
    search      = require('../routes/search.js'),
    messages    = require('../routes/messages.js'),
    routeHelper = require('./routehelper.js');


module.exports = function(app) {

  /**
   * landig page 
   **/

  app.all('/', index.index);


  /**
   * footer stuff 
   **/

  app.get('/contact', index.contact);
  app.get('/about', index.about);
  app.get('/press', index.press);
  app.get('/subdomain/help', index.help);
  app.get('/subdomain/help/privacy', index.privacy);
  app.get('/subdomain/help/terms', index.terms);


  /**
   * auth stuff
   * @ GET request - page display mostly 
   * @ middleware - checks if logged, redirects to user dashboard
   **/

  app.get('/login', routeHelper.ifLogged, auth.login);
  app.get('/signup', routeHelper.ifLogged, auth.signup);
  app.get('/forgot', routeHelper.ifLogged, auth.forgot);
  app.get('/pass_reset/:email/:hash', routeHelper.ifLogged, auth.passReset);
  app.get('/logout', auth.logout);


  /**
   * auth stuff
   * @ POST request - actions
   * @ middleware - checks if logged, redirects to user dashboard
   **/

  app.post('/login', routeHelper.ifLogged, auth.doLogin);
  app.post('/signup', routeHelper.ifLogged, auth.doSignup);
  app.post('/forgot', routeHelper.ifLogged, auth.doForgot);
  app.post('/pass_reset', routeHelper.ifLogged, auth.doPassReset);


  /**
   * social auth
   * @ signup or login using fb and twitter 
   **/

  app.get('/login/twitter', routeHelper.ifLogged, auth.loginTwitter);
  app.get('/login/fb', routeHelper.ifLogged, auth.loginFb);


  /**
   * user dashboard
   * @ middleware - checks if logged, if not redirects to landing page
   **/

  app.get('/user', routeHelper.checkLogged, user.index);
  app.get('/user/:username', routeHelper.checkLogged, user.profile);


  /**
   * user messages
   * @ middleware - checks if logged, if not redirects to landing page
   **/

  app.get('/messages', messages.index);
  app.get('/messages/:username', messages.readMessage);
  app.post('/messages', messages.sendMessage);


  /**
   * user settings
   * @ middleware - checks if logged, if not redirects to landing page
   **/

  app.get('/settings', user.settings);
  app.get('/settings/prefs', user.prefs);
  app.get('/settings/password', user.password);
  app.post('/settings', user.doSettings);


  /**
   * user search stuff
   * @ middleware - checks if logged, if not redirects to landing page
   **/

  app.get('/search', search.index);
  app.post('/search', search.doSearch);

};

  /**
    app.get('/subdomain/:subdomain/', profile.index);
  */