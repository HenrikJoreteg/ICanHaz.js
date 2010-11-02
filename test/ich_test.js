module("ICanHaz");

test("creates function for template", function() {
	expect(1);
	ok(ich.test1 != null, "test1 template exists");
});


test("renders non-parameterized templates", function() {
	expect(3);
	equal(ich.test1({}, true), "\n<p>This is a test of the emergency broadcast system.</p>\n"); // raw text
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
test("renders partials", function() {
	// partials example from the Mustache README
	ich.addTemplate('winnings', "You just won ${{value}} (which is ${{taxed_value}} after tax)");
	ich.useAsPartial('winnings');
	ich.addTemplate('welcome', "Welcome, {{name}}! {{>winnings}}");
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
	equal(ich.welcome(view, true), 'Welcome, Joe! You just won $1000 (which is $600 after tax)');
});

