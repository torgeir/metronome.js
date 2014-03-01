var _ = require('lodash');

var events = require('./events');

function Metronome (options) {
  _.extend(this, events());

  this.seq = options.seq;
}

Metronome.prototype.start = function () {
  var self = this;

  (function nextTick () {
    self.tick();
    setTimeout(nextTick, self.tickDelay());
  })();
};

Metronome.prototype.tickDelay = function () {
  return this.seq.ms();
};

Metronome.prototype.tick = function () {
  var self = this;

  var beat = this.seq.nextBeat();
  nextTick(function () {
    self.emit('beat', beat);
  });
};

function nextTick (f) {
  (setImmediate || process.nextTick)(f);
}

module.exports = Metronome;
