SHELL = /bin/bash

VERSION = $(shell cat version.txt;)

YUI_COMPRESSOR = /usr/local/bin/yuicompressor-2.4.2.jar

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
	@@echo "}(jQuery));" >> $(ICH)
	@@echo $(ICH) "built."
	@@echo


$(ICH_MIN): $(ICH)
	@@echo
	@@echo "Building" $(ICH_MIN) "..."
ifdef YUI_COMPRESSOR
	@@java -jar $(YUI_COMPRESSOR) --type js $(ICH) > $(ICH_MIN)
	@@echo $(ICH_MIN) "built."
else
	@@echo $(ICH_MIN) "not built."
	@@echo "    YUI Compressor required to build minified version."
	@@echo "    Please set YUI_COMPRESSOR variable in 'make' file to the jar file."
endif
	@@echo