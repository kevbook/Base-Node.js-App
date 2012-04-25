function jaxify(data, url) {
	$('body').prepend('<div class="flash info"><span>workin..</span></div>');
	$.ajax({
		type: "POST",
		url: url,
		data: data ,
		dataType: "json",
		cache:false,
		success: function(data) {
			data.status ? setFlash(data.msg, 'success') : setFlash(data.msg, 'error');
		},
		error: function(xhr, textStatus, err){
			setFlash(xhr.responseText, 'error');
		}
	});
};

function setFlash(msg, status) {
	$('.flash').remove();
	$('body').prepend('<div class="flash ' + status + '"><span>' + msg + '</span></div>');
};