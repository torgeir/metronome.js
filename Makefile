test:
	@mocha \
	  test/*-test.js \
	  --reporter min \
	  --growl \
	  --require test/helper.js \
	  --watch

.PHONY: test
