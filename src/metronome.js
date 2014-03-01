var _ = require('lodash');

var events = require('./events');

function Metronome (options) {
  _.extend(this, events());

  if (!options.seq.bpm) throw new Error('Outer sequence needs a bpm.');
  this.seq = options.seq;
}

Metronome.prototype.start = function () {
  var self = this;

  this.stop();

  (function nextTick () {
    self.tick();
    self.timeout = setTimeout(nextTick, self.seq.ms());
  })();
};

Metronome.prototype.stop = function () {
  if (this.timeout) {
    clearInterval(this.timeout);
    this.timeout == null;
  }
};

Metronome.prototype.tick = function () {
  var self = this;

  var beat = this.seq.nextBeat();
  setTimeout(function () {
    self.emit('beat', beat);
  }, 0);
};

module.exports = Metronome;
