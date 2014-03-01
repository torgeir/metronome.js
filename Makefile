test:
	@mocha \
	  test/*-test.js \
	  --growl \
	  --require test/helper.js
watch:
	@mocha \
	  test/*-test.js \
	  --reporter min \
	  --growl \
	  --require test/helper.js \
	  --watch

.PHONY: test
