/* ----- Helper Functions ----- */
var helper = require('../classes/helper');

exports.index = function(req, res){
	//req.headers['user-agent'];
	res.render('home', { 
  	title: 'Express' 
  });
};

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


function mustBeAuthorized(req, res, next){
  /* Your code needed to authorize a user */
  console.log('authorized');
}


/*
exports.test = function(mustBeAuthorized, function(req, res, next){
	res.render('home', { 
  	title: 'Express' 
  });
});

*/


exports.notFound = function(req, res){
	res.render('errors/404', { 
  		title: '404 error' 
  	}
  	, 404);
};

exports.nav = function(req, res){
	res.render('nav/' + req.url, { 
  	title: req.url 
  });
};

exports.footer = function(req, res){
	res.render('footer/' + req.url, { 
  	title: req.url 
  });
};