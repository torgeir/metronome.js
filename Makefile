test:
	@mocha \
	  --reporter min \
	  --timeout 200 \
	  --growl

.PHONY: test
