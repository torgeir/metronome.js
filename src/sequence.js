
function Sequence (bpm, bars) {
  if (!(this instanceof Sequence)) {
    return new Sequence(bpm, bars);
  }

  this.bpm = bpm;
  this.bars = bars;
  this.current = this.bars[0];
  this.beatIndex = 0;
}

Sequence.prototype.nextBeat = function () {
  var beat = this.current.at(this.beatIndex++);
  if (!beat) {
    this.current = this.nextBar();
    return this.nextBeat();
  }
  return beat;
};

Sequence.prototype.ms  = function () {
  var ms = 1000 / (this.bpm / 60);
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

module.exports = Sequence;
