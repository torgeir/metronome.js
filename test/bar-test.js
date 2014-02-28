var Bar = require('../src/bar');

describe('bar', function () {

  var b;

  beforeEach(function () {
    b = new Bar(4, 4);
  });

  it('creates beats', function () {
    b.beats.should.equal("hsss");
  });

  it('finds next beat', function () {
    b.nextBeat().should.equal('h');
    b.nextBeat().should.equal('s');
    b.nextBeat().should.equal('s');
    b.nextBeat().should.equal('s');
  });

});
