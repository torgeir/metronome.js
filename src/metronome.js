var _ = require('lodash');

var events = require('./events');

module.exports = Metronome;

function Metronome (options) {
  _.extend(this, events());

  options = options || {};
  this.bpm = options.bpm;
  this.bps = this.bpm / 60;
  this.stem = ["h", "s", "s", "s"];
}

Metronome.prototype.nextBeat = function () {
  var first = this.stem[0];
  this.stem = _.rest(this.stem, 1).concat(first);
  return first;
};

Metronome.prototype.start = function () {
  var self = this;

  var ms = 1000/this.bps;

  (function nextTick () {
    self.tick();
    setTimeout(nextTick, ms);
  })();
};

Metronome.prototype.tick = function () {
  var self = this;

  var beat = this.nextBeat();
  setTimeout(function () {
    self.emit('beat', beat);
  }, 0);
};



