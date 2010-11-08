module("ICanHaz");

test("creates function for template", function() {
	expect(1);
	ok(ich.test1 != null, "test1 template exists");
});

test("renders non-parameterized templates", function() {
	expect(3);
	equal(ich.test1({}, true), "<p>This is a test of the emergency broadcast system.</p>"); // raw text
	var nodes = ich.test1({});
	equal(typeof nodes, "object"); 
	equal(nodes.text(), "This is a test of the emergency broadcast system."); 
});

test("renders parameterized templates", function() {
	expect(1);
	equal(ich.test2({prey:'wabbits'}, true), "<span>Be vewwy vewwy quiet, we're hunting wabbits.</span>"); 
});

test("renders ad hoc templates", function() {
	ich.addTemplate('favoriteColor', 'Red. No, Blue. Aieee!');
	expect(1);
	equal(ich.favoriteColor({}, true), 'Red. No, Blue. Aieee!');
});

// Newly added support for partials
test("renders partials from &lt;script&gt; tags with class=\"partial\"", function() {
	// partials example from the Mustache README
	expect(1);
	var view = {
  		name: "Joe",
  		winnings: {
    		value: 1000,
    		taxed_value: function() {
        		return this.value - (this.value * 0.4);
    		}
  		}
	}
	equal(ich.welcome(view, true), "<p>Welcome, Joe! You just won $1000 (which is $600 after tax)</p>");
});

test("renders partials added at runtime", function() {
	// partials example from the Mustache README
	ich.addPartial('winnings2', "You just won ${{value}} (which is ${{taxed_value}} after tax)");
	ich.addTemplate('welcome2', "Welcome, {{name}}! {{>winnings2}}");
	expect(1);
	var view = {
  		name: "Joe",
  		winnings2: {
    		value: 1000,
    		taxed_value: function() {
        		return this.value - (this.value * 0.4);
    		}
  		}
	}
	equal(ich.welcome2(view, true), 'Welcome, Joe! You just won $1000 (which is $600 after tax)');
});
