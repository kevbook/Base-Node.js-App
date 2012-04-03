module.exports = function(){

	function is_mobile(req) {
    var ua = req.header('user-agent');
    return (/mobile/i.test(ua)) ? true : false;
	};
	
}