var metronome = require('../');
var Metronome = metronome.Metronome;
var Seq       = metronome.Sequence;
var Bar       = metronome.Bar;

exports.__defineGetter__('seq', function () {
  var b = {};

  var _bpm = 120,
      _bars = [ Bar('4/4') ];

  b.withBpm = function (bpm) {
    _bpm = bpm;
    return this;
  };

  b.withBars = function () {
    var bars = [].slice.call(arguments);
    _bars = bars.map(function (seqOrBar) {
      if (typeof seqOrBar == 'string')
        return Bar(seqOrBar);
      return seqOrBar;
    });
    return this;
  };

  b.__defineGetter__('build', function () {
    return Seq(_bpm, _bars);
  });

  return b;
});

exports.__defineGetter__('metronome', function () {
  var b = {};

  var _bpm = 120,
      _bars = [ Bar('4/4') ];

  b.withBpm = function (bpm) {
    _bpm = bpm;
    return this;
  };

  b.withBars = function () {
    var bars = [].slice.call(arguments);
    _bars = bars.map(function (seqOrBar) {
      if (typeof seqOrBar == 'string')
        return Bar(seqOrBar);
      return seqOrBar;
    });
    return this;
  };

  b.__defineGetter__('build', function () {
    return new Metronome({
      seq: Seq(_bpm, _bars)
    });
  });

  return b;
});
