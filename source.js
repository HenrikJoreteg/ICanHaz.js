/*!
ICanHaz.js version @VERSION@ -- by @HenrikJoreteg
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
var ich;

(function ($) {
    function ICanHaz() {
        var that = this,
            spec = {
                cache: {},
                partials: {}
            };
        
        this.VERSION = "@VERSION@";
        
        // public function for adding templates after init
        this.addTemplate = function (name, templateString, addAsPartial) {
            if (spec.cache.hasOwnProperty(name)) {
                throw "You've already got a template by the name: \"" + name + "\"";
            } else {
                // cache it
                spec.cache[name] = templateString;
                
                if(addAsPartial) partials[name] = templateString;
                // build the corresponding public retrieval function
                that[name] = function (data, raw) {
                    data = data || {};
                    var result = Mustache.to_html(spec.cache[name], data, spec.partials);
                    return raw ? result : $(result);
                };
            }       
        };
        
        // Call after adding a template to use that template as a partial.
        // (See ich_test.js for a usage example)
        this.useAsPartial = function(name) {
        	if (!spec.cache.hasOwnProperty(name)) throw('You need to have a template named "'+name+'" before making it a partial');
        	spec.partials[name] = spec.cache[name];
        };
        
        $('script[type="text/html"]').each(function () {
            var title = $(this).attr('id');
            
            that.addTemplate(title, $(this).html());
            
            // remove the element from the dom
            $(this).remove();
        });
    }
    
    // init itself on document ready
    $(function () {
        ich = new ICanHaz();
    });
})(jQuery);
