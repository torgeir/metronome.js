test:
	@mocha \
	  test/*-test.js \
	  --growl \
	  --require test/helper.js

.PHONY: test
