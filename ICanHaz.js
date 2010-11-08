/*!
ICanHaz.js version 0.6 -- by @HenrikJoreteg
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
        
        this.VERSION = "0.6";
        
        // public function for adding templates
        this.addTemplate = function (name, templateString) {
            // We're enforcing uniqueness to avoid accidental template overwrites.
            // If you want a different template, it should have a different name.
            if (spec.cache.hasOwnProperty(name)) {
                throw "ICanHaz error? Yes. You've already got a template by the name: \"" + name + "\"";
            } else {
                // cache it
                spec.cache[name] = templateString;
                
                // build the corresponding public retrieval function
                that[name] = function (data, raw) {
                    data = data || {};
                    var result = Mustache.to_html(spec.cache[name], data, spec.partials);
                    return raw ? result : $(result);
                };
            }       
        };
        
        // public function for adding partials
        this.addPartial = function (name, templateString) {
            if (spec.partials.hasOwnProperty(name)) {
                // check for partial
                throw "ICanHaz error? Yes. You've already got a partial by the name: \" + name + \"";
            } else {
                spec.partials[name] = templateString;
            }
        };
                
        // Loop through and add templates.
        // Whitespace at beginning and end of all templates inside <script> tags will 
        // be trimmed. If you want whitespace around a partial, add it in the parent, 
        // not the partial. Or do it explicitly using <br/> or &nbsp;
        $('script[type="text/html"]').each(function () {
            var script = $(this),
                name = script.attr('id'),
                text = script.html().trim(),
                isPartial = script.attr('class').toLowerCase() === 'partial';
            
            if (isPartial) {
                that.addPartial(name, text);
            } else {
                that.addTemplate(name, text);
            }
            
            // remove the element from the DOM
            script.remove();
        });
    }
    
    // init itself on document ready
    $(function () {
        ich = new ICanHaz();
    });
})(jQuery);
