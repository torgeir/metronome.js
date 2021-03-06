var _ = require('lodash');

function Sequence (bpm, bars) {
  if (!(this instanceof Sequence)) {
    return new Sequence(bpm, bars);
  }

  this.bpm = bpm;

  this.bars = bars.map(Sequence.asCopy);
  this.bars = this.flatten();

  this.reset();
}

Sequence.prototype.reset = function () {
  this.beatIndex = 0;
  this.current = this.bars[0];
};

Sequence.prototype.flatten = function () {
  var self = this;
  return _.flatten(this.bars.map(function (barOrSequence) {
    if (!barOrSequence.bpm) {
      barOrSequence.bpm = self.bpm;
    }
    return barOrSequence.flatten();
  }));
};

Sequence.prototype.copy = function () {
  return new Sequence(
    this.bpm,
    this.bars.map(Sequence.asCopy));
};

Sequence.prototype.nextBeat = function () {
  var beat = this.current.at(this.beatIndex++);
  if (!beat) {
    this.current = this.nextBar();
    return this.nextBeat();
  }
  return beat;
};

Sequence.prototype.toString = function () {
  return "Seq [ " + this.bars.join(", ") + " ]";
};

Sequence.prototype.ms  = function () {
  var ms = 1000 / (this.current.bpm / 60);
  return ms * this.current.multiplier;
};

Sequence.prototype.nextBar = function () {
  this.beatIndex = 0;

  var nextBarIndex =
    this.bars.indexOf(this.current) + 1;

  if (nextBarIndex >= this.bars.length) {
    return this.bars[0];
  }

  return this.bars[nextBarIndex];
};

Sequence.asCopy = function (copyable) {
  return copyable.copy();
};

module.exports = Sequence;
