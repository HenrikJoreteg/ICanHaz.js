SHELL = /bin/bash

VERSION = $(shell cat version.txt;)

COMPILER ?= /usr/local/bin/closure-compiler.jar

ICH = ICanHaz.js
ICH_MIN = ICanHaz.min.js

MAIN_FILE = source/main.js
MUSTACHE_FILE ?= source/mustache.js
BASE_FILES = $(MUSTACHE_FILE) $(MAIN_FILE)

all: $(ICH) $(ICH_MIN)
%.min.js: %.js
	@@echo
	@@echo "Building" $@ "..."
ifdef COMPILER
	@@java -jar $(COMPILER) --compilation_level SIMPLE_OPTIMIZATIONS --js=$< > $@
	@@echo $@ "built."
else
	@@echo $@ "not built."
	@@echo "    Google Closure complier required to build minified version."
	@@echo "    Please point COMPILER variable in 'makefile' to the jar file."
endif
	@@echo

$(ICH): $(BASE_FILES)
	@@echo
	@@echo "Building" $(ICH) "..."
	@@cat source/intro.js | sed -e 's/@VERSION@/$(VERSION)/' > $(ICH)
	@@echo "(function ($$) {" >> $(ICH)
	@@cat $(BASE_FILES) | sed -e 's/@VERSION@/$(VERSION)/' >> $(ICH)
	@@echo "})();" >> $(ICH)
	@@echo $(ICH) "built."
	@@echo

clean:
	@rm -f $(ICH) $(ICH_MIN)
