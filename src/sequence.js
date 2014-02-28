
function Sequence (bpm, bars) {
  this.bpm = bpm;
  this.bars = bars;
  this.current = this.bars[0];
}

Sequence.prototype.nextBeat = function () {
  var beat = this.current.nextBeat();
  if (!beat) {
    this.current = this.bars.indexOf(this.current) + 1;
    return this.nextBeat();
  }
  return beat;
};

Sequence.prototype.ms  = function () {
  var ms = 1000 / (this.bpm / 60);
  return ms * this.current.multiplier;
};


module.exports = Sequence;
