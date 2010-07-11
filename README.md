#ICanHaz.js
A simple/powerful approach for doing client-side templating with Mustache.js and jQuery.

##The One-line Demo:
Getting populated client side templates should be this easy:
    
    // I Can Haz User?
    var user = ICH.user(user_data_object)

##The Problem:
Building html elements in jQuery is ugly:
    hello_div = $('<div class="hello"><ul></ul></div>');
    hello_div.children('ul').append('<li>My list<li>');

Mustache gives us an awesome JS templating solution, here's a snippet from their docs:
    
    var view = {
      title: "Joe",
      calc: function() {
        return 2 + 4;
      }
    }
    
    var template = "{{title}} spends {{calc}}";
    
    var html = Mustache.to_html(template, view);

But the beauty fades when we're dealing with multi-line html because strings in JS can't include new-lines so everything has to be escaped. Then there's the problem of double vs. single quotes and before you know it, we're back in ugly land:
    
    var template = '<div class="hello">\
        <span class="title">{{ title }}</span>
        <ul></ul>\
    </div>\'

##I Can Haz Better Solution?
YES!

With ICanHaz you define your Mustache.js template snippets in script blocks of type="text/html" and give them a class of "template" and a JS safe title attribute (Which validates, btw). Then on document ready ICanHaz.js builds a cache of all the templates and creates a function for each snippet. All you have to do is say to youself "I can haz user?":

    var data = {
        first_name: "Henrik",
        last_name: "Joreteg"
    }
    
    html = ICH.user(data)

At this point 'html' is jQuery object containing your complete html with your data injected.

##Full Working Example
    <!DOCTYPE html>
    <html>
        <head>
            <title></title>
            <script src="jquery-1.4.2.min.js" type="text/javascript"></script>
            <script src="mustache.js" type="text/javascript"></script>
            <script src="ICanHaz.js" type="text/javascript"></script>
            
            <script class="template" title="user" type="text/html">
                <li>
                    <span class"name">Hello I'm {{ name }}</span>
                    <span class="twitter"><a href="http://twitter.com/{{ twitter }}">@{{ twitter }}</a></span>
                    <span class="job">I work for the awesome {{ employer }} as a {{ job_title }}.</span>
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
                            job_title: "JS nerd"
                        };
                        
                        // Here's all the magic. This is 
                        user = ICH.user(user_data);
                        
                        // append it to the list, tada! Now go do something more useful with this.
                        $('#user_list').append(user);
                    });
                });
            </script>
        </head>
        <body>
            <h1>User List</h1>
            <button id="add_user">Add User</button>
            <ul id="user_list"></ul>
        </body>
    </html>
