#ICanHaz.js
A simple/powerful approach for doing client-side templating with Mustache.js and jQuery.

Thanks to the following, they did all the hard work, I just pieced it all together for this:

- @jeresig for template storage approach
- @janl for mustache.js
- @natevw for his mustache.js tweaks

##The One-line Demo:
Getting populated client side templates should be this easy:
    
    // I Can Haz User?
    var user = ICH.user(user_data_object)

##The Problem:
Building html elements in jQuery is kinda ugly:
    hello_div = $('<div class="hello"><ul></ul></div>');
    hello_div.children('ul').append('<li>My list<li>');

It get really problematic if what you're building is a lot longer or more complex than this example. Not to mention, it's also not a clean separation of concerns to write html in javascript.

Mustache gives us an awesome JS templating solution, here's a snippet from their docs:
    
    var view = {
      title: "Joe",
      calc: function() {
        return 2 + 4;
      }
    }
    
    var template = "{{title}} spends {{calc}}";
    
    var html = Mustache.to_html(template, view);

But the beauty fades when we're dealing with multi-line html because strings in JS can't include new-lines so everything has to be escaped. Then there's the problem of double vs. single quotes and before you know it... we're back in ugly land:
    
    var template = '<div class="hello">\
        <span class="title">{{ title }}</span>
        <ul></ul>\
    </div>\'

##I Can Haz Better Solution?
YES!

With ICanHaz.js you define your mustache.js template snippets in script blocks of type="text/html" and give them an "id" as a title for your snippet (Which validates, btw). This approach was suggested by jQuery developer [@jeresig](http://twitter.com/jeresig) [on his blog](http://ejohn.org/blog/javascript-micro-templating/).Then, on document ready ICanHaz.js builds a cache of all the templates and creates a function for each snippet. All you have to do is say to youself for example "I can haz user?":

    var data = {
        first_name: "Henrik",
        last_name: "Joreteg"
    }
    
    // I can has user??
    html = ICH.user(data)

At this point 'html' is jQuery object containing your complete html with your data injected.

##Full Working Example
    <!DOCTYPE html>
    <html>
        <head>
            <title>ICanHaz.js Demo</title>
            <script src="jquery-1.4.2.min.js" type="text/javascript"></script>
            <script src="mustache.js" type="text/javascript"></script>
            <script src="ICanHaz.js" type="text/javascript"></script>
            
            <script id="user" type="text/html">
                <li>
                    <span class"name">Hello I'm {{ name }}</span>
                    <span class="twitter"><a href="http://twitter.com/{{ twitter }}">@{{ twitter }}</a></span>
                    <span class="job">I work for the awesome {{ employer }} as a {{ job_title }}.</span>
                    <span class="twitter">You should follow <a href="http://twitter.com/{{ other_twitter }}">@{{ other_twitter }}</a> too.</span>
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
                        
                        // Here's all the magic. I Can Haz User?
                        user = ICH.user(user_data);
                        
                        // append it to the list, tada! Now go do something more useful with this.
                        $('#user_list').append(user);
                    });
                });
            </script>
        </head>
        <body>
            <h1>ICanHaz.js Demo</h1>
            <h3>User List</h3>
            <button id="add_user">Add User</button>
            <ul id="user_list"></ul>
        </body>
    </html>