var metronome = require('../');
var Seq = metronome.Sequence;
var Bar = metronome.Bar;

describe('sequence', function () {

  var b4by4, b11by8;

  beforeEach(function () {
    b4by4 = Bar(4, 4);
    b11by8 = Bar(11,8);
  });

  it('sets current bar', function () {
    var seq = Seq(120, [b4by4, b11by8]);

    seq.current.should.eql(b4by4.copy({ bpm: 120 }));
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

  describe('nested sequences', function () {

    it('copies closest bpm down to bars', function () {
      var nestedSeq = new Seq(200, [b4by4]);
      var seq  = new Seq(120, [nestedSeq, b11by8]);

      seq.bars[0].should.eql(b4by4.copy({ bpm: 200 }));
      seq.bars[1].should.eql(b11by8.copy({ bpm: 120 }));
    });

    it('loops nested sequences', function () {
      var nestedSeq = new Seq(200, [b4by4]);
      var seq  = new Seq(120, [nestedSeq, b11by8]);

      beats(4, seq).should.equal('hsss');
      beats(11, seq).should.equal('hssssssssss');

      beats(4, seq).should.equal('hsss');
    });

    function beats (num, seq) {
      var beats = [];
      while(num--) beats.push(seq.nextBeat());
      return beats.join('');
    }

  });
});
