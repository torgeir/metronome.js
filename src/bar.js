var _ = require('lodash');

function Bar (number, unit, bpm) {
  if (!(this instanceof Bar)) {
    return new Bar(number, unit, bpm);
  }


  if (typeof number == 'string' &&
      typeof unit == 'undefined') {
    var numberUnit = number.split('/');
    return new Bar(+numberUnit[0], +numberUnit[1], bpm);
  }

  this.multiplier = 1 / (unit / Bar.Base);
  this.number = number;
  this.unit = unit;
  this.bpm = bpm;
  this.beats = "h" + Array(number).join("s");
}

Bar.prototype.at = function (i) {
  return this.beats[i];
};

Bar.prototype.flatten = function () {
  return this.copy();
};

Bar.prototype.copy = function (attrs) {
  attrs = attrs || {};
  var number = attrs.number || this.number;
  var unit = attrs.unit || this.unit;
  var bpm = attrs.bpm || this.bpm;
  return new Bar(number, unit, bpm);
};

Bar.prototype.toString = function () {
  return "[Bar " + this.number + "/" + this.unit + "]";
};

Bar.Base = 4;

module.exports = Bar;
