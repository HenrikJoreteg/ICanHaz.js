SHELL = /bin/bash

#VERSION =`git rev-list HEAD -n1`
VERSION = $(shell if [ -f version.txt ]; then cat version.txt; else VERSION=`git rev-list HEAD -n1`; echo $${VERSION:0:7}; fi)

LIBS = js/libs

#YUI_COMPRESSOR = /usr/local/bin/yuicompressor-2.4.2.jar

ICH = ICanHaz.js
ICH_MIN = ICanHaz.min.js

BASE_FILES = source.js

all: normal min

normal: $(ICH)

min: $(ICH_MIN)

$(ICH): $(BASE_FILES)
	@@echo
	@@echo "Building" $(ICH) "..."
	@@cat $(BASE_FILES) | sed -e 's/@VERSION@/$(VERSION)/' > $(ICH)
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