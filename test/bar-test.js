var Bar = require('../src/bar');

describe('bar', function () {

  var b;

  beforeEach(function () {
    b = new Bar(4, 4);
  });

  it('finds next beat', function () {
    b.at(0).should.equal('h');
    b.at(1).should.equal('s');
    b.at(2).should.equal('s');
    b.at(3).should.equal('s');
  });

});
