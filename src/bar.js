var _ = require('lodash');

function Bar (number, unit) {
  if (!(this instanceof Bar)) {
    return new Bar(number, unit);
  }

  if (typeof number == 'string' &&
      typeof unit == 'undefined') {
    var numberUnit = number.split('/');
    return new Bar(+numberUnit[0], +numberUnit[1]);
  }

  this.multiplier = 1 / (unit / Bar.Base);
  this.number = number;
  this.unit = unit;
  this.beats = "h" + Array(number).join("s");
}

Bar.prototype.at = function (i) {
  return this.beats[i];
};

Bar.prototype.toString = function () {
  return "Bar(" + this.number + "/" + this.unit + ")";
};

Bar.Base = 4;

module.exports = Bar;
