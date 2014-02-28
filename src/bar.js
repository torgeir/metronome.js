var _ = require('lodash');

var BASE = 4;

function Bar (number, unit) {
  this.multiplier = 1 / (unit / BASE);
  this.unit = unit;
  this.number = number;
  this.beats = "h" + Array(this.number).join("s");
};

Bar.prototype.at = function (i) {
  return this.beats[i];
};

Bar.prototype.toString = function () {
  return "Bar(" + this.number + "/" + this.unit + ")";
}

module.exports = Bar;
