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

  app.all('/', routeHelper.ifLogged, index.index);


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
   * user settings
   * @ middleware - checks if logged, if not redirects to landing page
   **/

  app.get('/settings', routeHelper.checkLogged, user.settings);
  app.get('/settings/prefs', routeHelper.checkLogged, user.prefs);
  app.get('/settings/password', routeHelper.checkLogged, user.password);
  app.post('/settings', routeHelper.checkLogged, user.doSettings);


  /**
   * user messages
   * @ middleware - checks if logged, if not redirects to landing page
   **/

  app.get('/messages', routeHelper.checkLogged, messages.listMessages);
  app.get('/messages/:id', routeHelper.checkLogged, messages.userMessage);
  app.post('/messages/new', routeHelper.checkLogged, messages.newMessage);
  app.post('/messages/delete', routeHelper.checkLogged, messages.deleteMessage);


  /**
   * user search stuff
   * @ middleware - checks if logged, if not redirects to landing page
   **/

  app.get('/search', routeHelper.checkLogged, search.search);
  app.post('/search/new', routeHelper.checkLogged, search.new);

};

  /**
    app.get('/subdomain/:subdomain/', profile.index);
  */