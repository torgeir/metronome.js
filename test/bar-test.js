var metronome = require('../');
var Bar = metronome.Bar;

describe('bar', function () {

  var b;

  beforeEach(function () {
    b = Bar(4, 4);
  });

  it('finds next beat', function () {
    b.at(0).should.equal('h');
    b.at(1).should.equal('s');
    b.at(2).should.equal('s');
    b.at(3).should.equal('s');
  });

  it('calculates multiplier', function () {
    b = Bar(4, 8);
    b.multiplier.should.equal(1/2);

    b = Bar(4, 16);
    b.multiplier.should.equal(1/4);
  });

  describe('copy', function () {

    it('clones a bar', function () {
      b.copy().should.eql(b);
    });

    it('overrides chosen properties', function () {
      b.copy({ number: 11 })
       .should.eql(Bar(11, 4));

      b.copy({ unit: 8 })
       .should.eql(Bar(4, 8));

      b.copy({ bpm: 120 })
       .should.eql(Bar(4, 4, 120));
    });
  });
});
