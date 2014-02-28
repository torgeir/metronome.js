var _ = require('lodash');

var events = require('./events');

var Base = 4;

function Bar (number, unit) {
  this.multiplier = 1 / (unit / Base);
  this.beats = "h" + Array(number).join("s");
}

Bar.prototype.nextBeat = function () {
  var first = this.beats[0];
  this.beats = _.rest(this.beats, 1).concat(first);
  return first;
};

function Metronome (options) {
  _.extend(this, events());
  options = options || {};
  this.bar = options.bar;
  this.bpm = options.bpm;
}

Metronome.prototype.start = function () {
  var self = this;

  var ms = 1000 / (this.bpm / 60);

  (function nextTick () {
    self.tick();
    setTimeout(nextTick, ms * self.bar.multiplier);
  })();
};

Metronome.prototype.tick = function () {
  var self = this;

  var beat = this.bar.nextBeat();
  setTimeout(function () {
    self.emit('beat', beat);
  }, 0);
};

module.exports.Metronome = Metronome;
module.exports.Bar = Bar;
