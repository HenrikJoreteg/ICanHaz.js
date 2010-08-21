/*
ICanHaz.js version 1.0 -- by @HenrikJoreteg
Licensed under the "You should follow @HenrikJoreteg on Twitter to use this" license. (Because, apparently I'm a twitter whore like that)

This is a simple template storage and retrieval system.

Templates are stored in the document as script elements with type="text/html". Cheers to @jeresig for this idea.

They are processed through Moustache.js for templating.

Dependencies:
- Mustache.js 
- jQuery

Documentation at: http://github.com/HenrikJoreteg/ICanHaz.js

*/

// JSLint Config
/*global jQuery Mustache */
var ich = {};

ich.init = function ($) {
    ich.cache = {};
    
    $('script[type="text/html"]').each(function () {
        var title = $(this).attr('id');
        
        // build our cache
        ich.cache[title] = $(this).html(); 
        
        // build our retrieval function
        ich[title] = function (data, raw) {
            data = data || {};
            
            if (raw) {
                return Mustache.to_html(ich.cache[title], data);
            } else {
                return $(Mustache.to_html(ich.cache[title], data));
            }
        };
        
        $(this).remove();
    });
};

// init itself on document ready, using jQuery instead of $ if people
// want to use other libraries that conflict.
jQuery(function () {
    ich.init(jQuery);
});