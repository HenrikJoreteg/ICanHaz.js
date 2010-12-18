/*!
  ICanHaz.js -- by @HenrikJoreteg
*/
/*global jQuery  */
function ICanHaz() {
    var that = this,
        spec = {
            cache: {},
            partials: {}
        };
    
    this.VERSION = "@VERSION@";
    
    // public function for adding templates
    this.addTemplate = function (name, templateString) {
        // We're enforcing uniqueness to avoid accidental template overwrites.
        // If you want a different template, it should have a different name.
        if (this[name]) {
            throw "Can't add a template with reserved name: " + name + ".";
        } else if (spec.cache.hasOwnProperty(name)) {
            throw "You've already got a template by the name: \"" + name + "\"";
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
            throw "You've already got a partial with the name: \" + name + \"";
        } else {
            spec.partials[name] = templateString;
        }
    };
    
    // grabs templates from the DOM and caches them.
    this.grabTemplates = function () {        
        // Loop through and add templates.
        // Whitespace at beginning and end of all templates inside <script> tags will 
        // be trimmed. If you want whitespace around a partial, add it in the parent, 
        // not the partial. Or do it explicitly using <br/> or &nbsp;
        $('script[type="text/html"]').each(function (script) {
            script = (typeof script == 'number') ? $(this) : $(script); // Zepto doesn't bind this
            var name = script.attr('id'),
                text = script.html().trim(),
                isPartial = (script.attr('class') && script.attr('class').toLowerCase() === 'partial');
            
            if (isPartial) {
                that.addPartial(name, text);
            } else {
                that.addTemplate(name, text);
            }
            
            // remove the element from the DOM
            script.remove();
        });
    };
    
    // returns copy of template cache
    this.showAll = function () {
        return {
            templates: $.extend({}, spec.cache),
            partials: $.extend({}, spec.partials)
        };
    };
    
    this.clearAll = function () {
        // delete the methods on ourself
        for (var key in spec.cache) {
            delete that[key];
        }
        
        // clear the cache and partials
        spec.cache = {};
        spec.partials = {};
    };
    
    this.refresh = function () {
        this.clearAll();
        this.grabTemplates();
    };
}

window.ich = new ICanHaz();

// init itself on document ready
$(function () {
    ich.grabTemplates();
});
