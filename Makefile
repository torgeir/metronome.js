test_files := test/*-test.js

clean:
	@rm ui/browser/bundle.js

install:
	@npm install
	@make test
	@`npm bin`/browserify ui/browser/browser.js -o ui/browser/bundle.js

test:
	@mocha \
	  $(test_files) \
	  --growl \
	  --require test/helper.js

watch:
	@mocha \
	  $(test_files) \
	  --reporter min \
	  --growl \
	  --require test/helper.js \
	  --watch

.PHONY: test watch
