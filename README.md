#ICanHaz.js
A simple/powerful approach for doing client-side templating with Mustache.js and jQuery.

##Problem:
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
    
    html = ich.user(data)

At this point 'html' is jQuery object containing your complete html with your data injected.

##Full Example

<html>
    <head>
        <title></title>
        <script src="jquery.js" type="text/javascript"></script>
        <script src="Mustache.js" type="text/javascript"></script>
        <script src="ICanHaz.js" type="text/javascript"></script>
        
        <script class="template" title="user" type="text/html">
            <li class="{{ type }}">
                <span class"name">{{ name }}</span>=
                <span class="status">{{ status_message }}</span>
                <span class="job">{{ job }}</span>
            </li>
        </script>
    </head>
    <body>
    </body>
</html>
