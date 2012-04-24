/* Analytics - http://get.gaug.es/ */
var _gauges = _gauges || [];
(function() {
	var t   = document.createElement('script');
	t.type  = 'text/javascript';
	t.async = true;
	t.id    = 'gauges-tracker';
	t.setAttribute('data-site-id', 'this is different for each gauge');
	t.src = '//secure.gaug.es/track.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(t, s);
})();