/*
ICanHaz.js version 1.0 -- by @HenrikJoreteg
Licensed under the "You Must Follow Me on Twitter to use this" license. (Cause I'm a twitter whore like that)

This is a simple template storage and retrieval system. 
Templates are stored in the document as script elements with type="text/html"
They are processed through Moustache.js for templating

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
	
	$('.template').each(function () {
		var title = $(this).attr('title');
		
		// build our cache
		ICH.ICanHaz_cache[title] = $(this).html(); 
		
		// build our retrieval function
		ICH[title] = function (data) {
			data = data || {};
			return $(Mustache.to_html(ICH.ICanHaz_cache[title], data));
		};
	});
};

// init itself on document ready, using jQuery instead of $ if people
// want to use other libraries that conflict.
jQuery(function () {
	ICH.init();
});