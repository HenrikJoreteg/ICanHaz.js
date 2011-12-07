SHELL = /bin/bash

VERSION = $(shell cat version.txt;)

COMPILER ?= /usr/local/bin/closure-compiler.jar

ICH = ICanHaz.js
ICH_MIN = ICanHaz.min.js
ICH_NOMS = ICanHaz-no-mustache.js
ICH_NOMS_MIN = ICanHaz-no-mustache.min.js
MAIN_FILE = source/main.js
MUSTACHE_FILE ?= vendor/mustache/mustache.js
BASE_FILES = $(MUSTACHE_FILE) $(MAIN_FILE)

all: $(ICH) $(ICH_MIN) $(ICH_NOMS) $(ICH_NOMS_MIN)

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

$(ICH_NOMS): $(MAIN_FILE)
	@@echo
	@@echo "Building" $(ICH_NOMS) "..."
	@@cat source/intro.js | sed -e 's/@VERSION@/$(VERSION)/' > $(ICH_NOMS)
	@@echo "(function ($$) {" >> $(ICH_NOMS)
	@@cat $(MAIN_FILE) | sed -e 's/@VERSION@/$(VERSION)/' >> $(ICH_NOMS)
	@@echo "})();" >> $(ICH_NOMS)
	@@echo $(ICH_NOMS) "built."
	@@echo


clean:
	@rm -f $(ICH) $(ICH_MIN) $(ICH_NOMS) $(ICH_NOMS_MIN)
