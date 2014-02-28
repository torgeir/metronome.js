var _ = require('lodash');

var BASE = 4;

function Bar (number, unit) {
  this.multiplier = 1 / (unit / BASE);
  this.number = number;
  this.beats = "h" + Array(number).join("s");
}

Bar.prototype.nextBeat = function () {
  var first = this.beats[0];
  this.beats = _.drop(this.beats, 1);
  return first;
};

module.exports = Bar;
