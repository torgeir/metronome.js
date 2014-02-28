var Bar = require('../src/bar');
var Sequence = require('../src/sequence');

describe('sequence', function () {

  var b1, b2;

  before(function () {
    b1 = new Bar(4, 4);
    b2 = new Bar(11,8);
  });

  it('sets current bar', function () {
    var seq = new Sequence(120, [b1, b2]);

    seq.current.should.equal(b1);
  });

  it('finds next beat');

  it('loops');

  it('supports nested sequences');
});
