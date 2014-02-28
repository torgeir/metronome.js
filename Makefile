test:
	@mocha \
	  test/*-test.js \
	  --reporter min \
	  --growl \
	  --require test/helper.js

.PHONY: test
