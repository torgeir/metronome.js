var _ = require('lodash');

var events = require('./events');

module.exports = Metronome;

function Metronome (options) {
  _.assign(this, events());

  options = options || {};

  this.bpm = options.bpm;
  this.bps = this.bpm / 60;
}

Metronome.prototype.start = function () {
  var self = this;

  self.tick('hard');

  setTimeout(function () {
    self.tick('soft');
  }, 1000/this.bps);
};

Metronome.prototype.tick = function (level) {
  var self = this;

  setTimeout(function () {
    self.emit(level);
  }, 0);
};



