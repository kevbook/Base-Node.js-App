/**
 * navigation active 
 */

$('#header-nav li a').each(function() {
	var hreflink = $(this).attr('href');
	console.log(hreflink);
	if (hreflink.toLowerCase() == location.pathname.toLowerCase())
		$(this).addClass('active');
});


/**
 * leanModal v1.1 by Ray Stone - http://finelysliced.com.au
 */

(function($){$.fn.extend({leanModal:function(options){var defaults={top:130,overlay:0.5,closeButton:null};var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);return this.each(function(){var o=options;$(this).click(function(e){var modal_id=$(this).attr("href");$("#lean_overlay").click(function(){close_modal(modal_id)});$(o.closeButton).click(function(){close_modal(modal_id);return false;});var modal_height=$(modal_id).outerHeight();var modal_width=$(modal_id).outerWidth();
$("#lean_overlay").css({"display":"block",opacity:0});$("#lean_overlay").fadeTo(200,o.overlay);$(modal_id).css({"display":"block","position":"fixed","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});$(modal_id).fadeTo(200,1);e.preventDefault()})});function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"})}}})})(jQuery);

$(function() {
	$('a[rel*=leanModal]').leanModal({closeButton: ".modal_close"}); return false;	
});


/**
 * Tabs
 */

(function ($) {
  // hash change handler
  function hashchange () {
    var hash = window.location.hash
      , el = $('ul.tabs [href*="' + hash + '"]')
      , content = $(hash)

    if (el.length && !el.hasClass('active') && content.length) {
      el.closest('.tabs').find('.active').removeClass('active');
      el.addClass('active');
      content.show().addClass('active').siblings().hide().removeClass('active');
    }
  }

  $(window).on('hashchange.skeleton', hashchange);
  hashchange();
  $(hashchange);
})(jQuery);



/** 
 * Ajax helper 
 */

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