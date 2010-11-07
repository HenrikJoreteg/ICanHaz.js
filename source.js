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
                if(addAsPartial) {
                	spec.partials[name] = templateString;
                }
                // build the corresponding public retrieval function
                that[name] = function (data, raw) {
                    data = data || {};
                    var result = Mustache.to_html(spec.cache[name], data, spec.partials);
                    return raw ? result : $(result);
                };
            }       
        };
                
        $('script[type="text/html"]').each(function (i,element) {
        	var script = $(element);
            var title = script.attr('id');
            var isPartial = script.attr('rels') == 'partial'; // n.b. lowercase
            /* All elements may have newlines around them, but this can be problematic for
             * partials (i.e. adding unexpected newlines in the middle of a template).
             * So we'll strip any whitespace. If you want whitespace around a partial,
             * add it in the parent, not the partial.
             */
            var text = isPartial ? $.trim(script.html()) : script.html();
            that.addTemplate(title, text, isPartial);
            // remove the element from the DOM
            script.remove();
        });
    }
    
    // init itself on document ready
    $(function () {
        ich = new ICanHaz();
    });
})(jQuery);
