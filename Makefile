SHELL = /bin/bash

VERSION = $(shell cat version.txt;)

COMPILER = /usr/local/bin/closure-compiler.jar

ICH = ICanHaz.js
ICH_MIN = ICanHaz.min.js

BASE_FILES = source/mustache.js \
	source/main.js

all: normal min

normal: $(ICH)

min: $(ICH_MIN)

$(ICH): $(BASE_FILES)
	@@echo
	@@echo "Building" $(ICH) "..."
	@@cat source/intro.js | sed -e 's/@VERSION@/$(VERSION)/' > $(ICH)
	@@echo "(function ($$) {" >> $(ICH)
	@@cat $(BASE_FILES) | sed -e 's/@VERSION@/$(VERSION)/' >> $(ICH)
	@@echo "})();" >> $(ICH)
	@@echo $(ICH) "built."
	@@echo


$(ICH_MIN): $(ICH)
	@@echo
	@@echo "Building" $(ICH_MIN) "..."
ifdef COMPILER
	@@java -jar $(COMPILER) --compilation_level SIMPLE_OPTIMIZATIONS --js=$(ICH) > $(ICH_MIN)
	@@echo $(ICH_MIN) "built."
else
	@@echo $(ICH_MIN) "not built."
	@@echo "    Google Closure complier required to build minified version."
	@@echo "    Please point COMPILER variable in 'makefile' to the jar file."
endif
	@@echo
