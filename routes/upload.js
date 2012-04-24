exports.index = function(req, res) {
	res.render('user/upload', { 
 		locals:{ title: 'pic uploader' }
  });
};