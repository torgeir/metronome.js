var metronome = require('../');
var Seq = metronome.Sequence;
var Bar = metronome.Bar;

describe('sequence', function () {

  var b4by4, b11by8;

  before(function () {
    b4by4 = Bar(4, 4);
    b11by8 = Bar(11,8);
  });

  it('sets current bar', function () {
    var seq = Seq(120, [b4by4, b11by8]);

    seq.current.should.equal(b4by4);
  });

  it('finds next beat', function () {
    var seq = Seq(120, [b4by4, b11by8]);

    seq.nextBeat();
    seq.nextBeat();
    seq.nextBeat();
    seq.nextBeat();
    seq.nextBeat().should.equal('h');
    seq.nextBeat().should.equal('s');
    seq.nextBeat().should.equal('s');
    seq.nextBeat().should.equal('s');
    seq.nextBeat().should.equal('s');
    seq.nextBeat().should.equal('s');
    seq.nextBeat().should.equal('s');
    seq.nextBeat().should.equal('s');
    seq.nextBeat().should.equal('s');
    seq.nextBeat().should.equal('s');
    seq.nextBeat().should.equal('s');
  });

  it('loops', function () {
    var seq = Seq(120, [b4by4, b11by8]);

    // loop around
    var n = b4by4.number + b11by8.number;
    while(n--) seq.nextBeat();

    seq.nextBeat().should.equal('h');
  });

  it('supports nested sequences');
});
