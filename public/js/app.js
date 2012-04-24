head.ready(function() {

		/* ---- msg displayer --- */
	function set_msg(err, msg){
		$('#msg').show().html(msg);
		setTimeout(function(){$('#msg').hide()}, 3000);
	}
});