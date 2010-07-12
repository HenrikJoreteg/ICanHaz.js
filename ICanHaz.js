/*
ICanHaz.js version 1.0 -- by @HenrikJoreteg
Licensed under the "You should follow @HenrikJoreteg on Twitter to use this" license. (Cause, apparently I'm a twitter whore like that)

This is a simple template storage and retrieval system.

Templates are stored in the document as script elements with type="text/html". Cheers to @jeresig for this idea.

They are processed through Moustache.js for templating. I'm using @natevw's fork of @janl's for this: (http://github.com/natevw/mustache.js). But either one is fine.

Dependencies:
- Mustache.js 
- jQuery

Documentation at: http://github.com/HenrikJoreteg/ICanHaz.js

*/

// JSLint Config
/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */
/*global $ jQuery Mustache */
var ICH = {};

ICH.init = function () {
	ICH.ICanHaz_cache = {};
	
	$('script[type="text/html"]').each(function () {
		var title = $(this).attr('id');
		
		// build our cache
		ICH.ICanHaz_cache[title] = $(this).html(); 
		
		// build our retrieval function
		ICH[title] = function (data) {
			data = data || {};
			return $(Mustache.to_html(ICH.ICanHaz_cache[title], data));
		};
		
		$(this).remove();
	});
};

// init itself on document ready, using jQuery instead of $ if people
// want to use other libraries that conflict.
jQuery(function () {
	ICH.init();
});