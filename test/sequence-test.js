var metronome = require('../');
var a         = require('../').builder;
var Seq       = metronome.Sequence;
var Bar       = metronome.Bar;

describe('sequence', function () {

  var b4by4, b11by8;

  beforeEach(function () {
    b4by4  = Bar(4, 4);
    b11by8 = Bar(11,8);
  });

  it('calculates ms delay from bar\'s bpm and multiplier', function () {
    var seq = a.seq.withBars(Bar(4, 8, 120)).build;

    seq.ms().should.equal(250);
  });

  describe('flat sequences', function () {

    var seq;

    beforeEach(function () {
      seq = a.seq
        .withBpm(120)
        .withBars('4/4', '3/8')
        .build
    })

    it('sets current bar with sequence\'s bpm', function () {
      seq.current.should.eql(b4by4.copy({ bpm: 120 }));
    });

    it('finds next beat', function () {
      seq.nextBeat().should.equal('h');
    });

    it('loops flat sequences', function () {
      beats(4, seq);
      beats(3, seq);
      beats(4, seq).should.equal('hsss');
    });
  });


  describe('nested sequences', function () {

    var nestedSeq, seq;

    beforeEach(function () {
      nestedSeq = a.seq
        .withBpm(200)
        .withBars(b4by4).build

      seq = a.seq
        .withBpm(80)
        .withBars(nestedSeq, b11by8).build
    })

    it('copies closest bpm down to bars', function () {
      seq.bars[0].should.eql(b4by4.copy({ bpm: 200 }));
      seq.bars[1].should.eql(b11by8.copy({ bpm: 80 }));
    });

    it('loops nested sequences', function () {
      beats(4, seq);
      beats(11, seq);
      beats(4, seq).should.equal('hsss');
    });
  });

  function beats (num, seq) {
    var beats = [];
    while(num--) beats.push(seq.nextBeat());
    return beats.join('');
  }
});
