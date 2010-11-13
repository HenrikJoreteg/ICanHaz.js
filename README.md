#ICanHaz.js
A simple/powerful approach for doing client-side templating with Mustache.js and jQuery.

##The Quick Demo:

###Step 1. - Define your template

    <script id="user" type="text/html">
        <li>
            <span class"name">Hello I'm {{ name }}</span>
            <span class="twitter"><a href="http://twitter.com/{{ twitter }}">@{{ twitter }}</a></span>
        </li>
    </script>

###Step 2. - Retrieve your populated template:
    
    // I Can Haz User?
    var user = ich.user(user_data_object)

###Step 3. - There is no step 3!

##Why would we need this?
Because building html elements using javascript or jQuery is ugly:
    
    // obviously there's several ways to do this, but point is... it's ugly.
    
    // vanilla JS
    hello_div = document.createElement('div');
    hello_div.setAttribute('class', 'hello');
    my_list = document.createElement('ul');
    hello_div.appendChild(my_list);
    list_item = document.createElement('li');
    list_item.innerHTML = 'My list item';
    my_list.appendChild(list_item);
    
    // jQuery
    hello_div = $('<div class="hello"><ul></ul></div>');
    hello_div.children('ul').append('<li>My list<li>');
    

It gets really problematic if what you're building is a lot longer or more complex than this example. Not to mention, it's also not a clean separation of concerns to write html in javascript.

Mustache.js gives us an awesome templating solution, here's a snippet from their docs:
    
    var view = {
      title: "Joe",
      calc: function() {
        return 2 + 4;
      }
    }
    
    var template = "{{title}} spends {{calc}}";
    
    var html = Mustache.to_html(template, view);

But the beauty fades when we're dealing with multi-line html in the browser because strings in JS can't include new-lines so everything has to be escaped. Then there's the problem of double vs. single quotes and before you know it... we're back in ugly land:
    
    var template = '<div class="hello">\
        <span class="title">{{ title }}</span>\
        <ul></ul>\
    </div>'

##I Can Haz Better Solution?
YES!

With ICanHaz.js you define your Mustache.js template snippets in script blocks of type="text/html" and give them an "id" as a title for your snippet (which validates, btw). This approach was suggested by jQuery developer [@jeresig](http://twitter.com/jeresig) [on his blog](http://ejohn.org/blog/javascript-micro-templating/).Then, on document ready ICanHaz.js builds a cache of all the templates and creates a function for each snippet. All you have to do is say to yourself for example "I can haz user?":

    var data = {
        first_name: "Henrik",
        last_name: "Joreteg"
    }
    
    // I can has user??
    html = ich.user(data)

At this point 'html' is jQuery object containing your complete html with your data injected. 

For each template you define (except partials), ICanHaz builds a retrieval function with the same name. 
If you don't want a jQuery object but just want the populated string you can just pass in `true` as the second argument to get the raw string. This is useful if your template isn't producing html.

###I'm in ur templates, making macroz.

ICanHaz.js also supports mustache *partials*. To quote the [original mustache.js announcement](http://blog.couchone.com/post/622014913/mustache-js):
> Partials are good for including often-used snippets, like navigation or headers and footer.
> 
> In mustache, partials are dead simple. You have a special tag `{{>partial}}` that you put where you want to insert the partial, create the partial that you want to be displayed *and that's it*. It is just a basic replace or macro include mechanism. Nothing fancy.

Just add `class="partial"` when defining the template for a partial (It won't be added to your main template cache):

	<!-- Main template, includes the "winnings" partial. -->
	<script id="welcome" type="text/html">
	<p>Welcome, {{name}}! {{>winnings}}</p>
	</script>
	
	<!-- Partial included via {{>winnings}} -->
	<script id="winnings" class="partial" type="text/html">
	You just won ${{value}} (which is ${{taxed_value}} after tax)
	</script>

Then call the main template normally.

###Adding templates/partials later

Optionally, you can call `ich.addTemplate(name, templateString)` or `ich.addPartial(name, templateString)` to add templates and partials if you'd prefer to pull the from a server with ajax or whatnot. You can even do `ich.grabTemplates` if you've loaded in some other page

##Available Methods
Beyond the retrieval functions that ICanHaz creates based on template name, these additional methods exist.
- `ich.addTemplate(name, mustacheTemplateString)`: Add new template. Could be useful if you prefer not to use `<script type="text/html">` approach or want to lazy load 'em from a server or whatnot.
- `ich.addPartial(name, mustacheTemplateString)`: Add new partial, see above.
- `ich.showAll()`: Returns a copy of the templates/partials in the internal cache. (good for seeing what you've actually got loaded).
- `ich.clearAll()`: Clears templates and partials from internal cache.
- `ich.grabTemplates()`: Looks for any `<script type="text/html">` tags to make templates out of. Then removes those elements from the dom (this is the method that runs on `document ready` when `ich` first inits). 
- `ich.refresh()`: Just clears all then grabs new templates. This could be useful for pages loaded with ajax that contain other templates.

##Full Working Example
    <!DOCTYPE html>
    <html>
        <head>
            <title>ICanHaz.js Demo</title>
            <script src="test/jquery-1.4.4.min.js" type="text/javascript"></script>
            <script src="ICanHaz.min.js" type="text/javascript"></script>
            
            <script id="user" type="text/html">
                <li>
                    <p>Howdy I&apos;m <span class="twitter"><a href="http://twitter.com/{{ twitter }}">@{{ twitter }}</a></span>. I work for {{ employer }} as a {{ job_title }}. You should follow <a href="http://twitter.com/{{ other_twitter }}">@{{ other_twitter }}</a> too.</p>
                </li>
            </script>
            
            <script type="text/javascript">
                // when the dom's ready
                $(document).ready(function () {
                    // add a simple click handler for the "add user" button.
                    $('#add_user').click(function () {
                        var user_data, user;
                        
                        // build a simple user object, in a real app this would probably come from a server
                        // somewhere. Otherwise hardcoding here is just silly.
                        user_data = {
                            name: "Henrik Joreteg",
                            twitter: "HenrikJoreteg",
                            employer: "&yet",
                            job_title: "JS nerd",
                            other_twitter: "andyet"
                        };
    
                        // Here's all the magic.
                        user = ich.user(user_data);
                        
                        // append it to the list, tada! Now go do something more useful with this.
                        $('#user_list').append(user);
                    });
                });
            </script>
            
            <style>
                body {
                    font-family: Helvetica;
                }
            </style>
        </head>
        <body>
            <h1>ICanHaz.js Demo</h1>
            <h3>User List</h3>
            <button id="add_user">Add User</button>
            <ul id="user_list"></ul>
        </body>
    </html>

##Contributors
ICanHaz was conceived by [@HenrikJoreteg](http://twitter.com/HenrikJoreteg).

###Other Contributors:

- [rdclark](http://github.com/rdclark) - Test coverage and partials support
- [kembuco](http://github.com/kembuco) - IE Bug found/squashed

###Changelog
- 0.7: 
    - Now includes mustache.js so the only dependency is jQuery.
    - Exposed `grabTemplates`
    - Attaches `ich` to `window` directly
    - Added `showAll` method for viewing a copy of the internal template hash.
- 0.6.1: Bug fix in trimming templates retrieved from `<script>` tags.
- 0.6: Added support for partials