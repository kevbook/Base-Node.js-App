

/*
  			+ 
	  		  req.headers['referer'] + 
	  		  ' - ' + req.method + ' ' + 
	  		  res.statusCode + ' - ' + 
	  		  res.responseTime 'ms'
*/

/*
  // Catch All exception handler, log error and exit
process.on('uncaughtException', function (err) {
  console.log('Uncaught exception: ' + err + err.stack);
   app.close();

   // ToDo: add time gap
  process.exit()
});
*/

    //These are some helpers for session management.
    /*
  app.dynamicHelpers({
    message: function(req){
    var err = req.session.error
      , msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    if (err) {
      var error = "<span class='error'>";
      return error + err + '</span>';
    }
    if (msg) return msg;
    }
  });

*/



/*



/*
 Handle route verbs:

// Handle access to the main page
app.get('/', index.load);

// Handle access to the login page.
app.get('/login', authenticate.index);
// Login user:
app.post('/login', authenticate.login);
// This is executed when the user clicks a logout link:
app.get('/logout', authenticate.logout);

// Get all available products:
app.get('/products',  products.index);
app.post('/products', products.post);
// Restrict creating new products to logged in user:
app.get('/products/new', authenticate.restrict, products.new);
app.get('/products/:id', products.id);
// Restrict editing products:
app.get('/products/:id/edit', authenticate.restrict, products.edit);
// Handle updating a product after editing it.
app.put('/products/:id', products.update);

app.get('/images', authenticate.restrict, images.load);
// For adding new images, restrict access to logged in user.
app.get('/images/new', authenticate.restrict, images.new);
// Handle uploading a new image.
app.post('/images', images.upload);


}



/*
function appErrors(app){

  app.use(function(req){
    logger: 


  });


  function Apperror(err, req, res, next) {
  console.error(err.stack);
  // respond with 500 "Internal Server Error".
  res.send(500);
}


function appHelpers(app){
  app.locals.use(function(req, res){
    // expose "error" and "message" to all views that are rendered.
    res.locals.error = req.session.error || '';
    res.locals.message = req.session.message || '';
    // remove them so they're not displayed on subsequent renders
    delete req.session.error;
    delete req.session.message;
  });
}



process.on('uncaughtException', function (err) {
  console.log('Uncaught exception: ' + err + err.stack);
   app.close();

   // ToDo: add time gap
  process.exit()
});



  var client = loggly.createClient({subdomain:'kevbook'});
  //client.log('9c7b5527-f1ed-4968-b36a-7e7e02b4f235', 'last teste....', function(err, result){
  //    console.log(result);
//  });


  app.use(function(req, res, next){
      res.status(404);
      res.render('404', { url: req.url });
      return;
  }

    function footer(req, res){
    res.render('nav/' + req.url, { 
      title: req.url 
    });
  };



}

function appHelpers(app){

  app.dynamicHelpers({
    request: function(req){
      return req;
    },

    cool: function(){
      console.log('ss');
    }

  });

  console.log(app.dynamicHelpers[cool]);
  //dynamicViewHelpers(){


  //}

}

/*
  
  // Some dynamic view helpers
  app.dynamicHelpers({
    request: function(req){
      return req;
    },

    session: function(req, res){
      return req.session;
    },

    logger: function(){
      console.log("shit");
    }

  });

  app.helpers({
    name: function(first, last){ return first + ', ' + last };
  })

}
*/

  /* https://kevbook.loggly.com */

//  var client = loggly.createClient({subdomain:'kevbook'});
  //client.log('9c7b5527-f1ed-4968-b36a-7e7e02b4f235', 'last teste....', function(err, result){
  //    console.log(result);
//  });






function bootApplication(app) {


  // Example 500 page
  app.use(function(err, req, res, next){
    res.render('500');
  });

  // Example 404 page via simple Connect middleware
  app.use(function(req, res){
    res.render('404');
  });



  // Some dynamic view helpers
  app.dynamicHelpers({
    request: function(req){
      return req;
    },

    hasMessages: function(req){
      if (!req.session) return false;
      return Object.keys(req.session.flash || {}).length;
    },

    messages: function(req){
      return function(){
        var msgs = req.flash();
        return Object.keys(msgs).reduce(function(arr, type){
          return arr.concat(msgs[type]);
        }, []);
      }
    }
  });
}













/*

function bootApplication(app) {
  app.use(express.logger(':method :url :status'));


  // Some dynamic view helpers
  app.dynamicHelpers({
    request: function(req){
      return req;
    },

    hasMessages: function(req){
      if (!req.session) return false;
      return Object.keys(req.session.flash || {}).length;
    },

    messages: function(req){
      return function(){
        var msgs = req.flash();
        return Object.keys(msgs).reduce(function(arr, type){
          return arr.concat(msgs[type]);
        }, []);
      }
    }
  });
}


  function validate_login(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  };


  
/*
  app.get('/restricted', helper.validate_login, function(req, res){
    res.send('Wahoo! restricted area');
  });
*/

/* -- main routes -- */
app.get('/host/:id([0-9]+)', routes.host);
app.get('/event/:id([0-9]+)', routes.event);
app.get('/user/:id([0-9]+)', routes.user);

/* -- event action -- */
app.post('/event/:id([0-9]+)/:action?', routes.event_action);


/*

app.all('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);
app.get('/user/:id/view', user.view);
app.get('/user/:id/edit', user.edit);
app.put('/user/:id/edit', user.update);

*/




//The 404 Route (ALWAYS Keep this as the last route)
app.all('(/*)?', routes.notFound);


//A Route for Creating a 500 Error (Useful to keep around)
/*
app.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});
*/




/*

app.get('/', function(req, res) {
    articleProvider.findAll(function(error, docs) {
        res.render('blog', {locals: {docs: docs}});
    });
});
 
app.get('/blog/new', function (req, res) {
    res.render('blog_new', {locals: {title: 'New Blog Item'}});
});
 
app.post('/blog/new', function (req, res) {
    console.log('The provided title is : %s',req.body.new_title);
    articleProvider.save({title: req.body.new_title, body: req.body.new_body},
            function(error, docs) {
                res.redirect('/');
            });
});
*/



exports.notFound = function(req, res){
  res.render('errors/404', { 
      title: '404 error' 
    }
    , 404);
};