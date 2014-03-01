beep = module.exports = (function () {
  var ctx = new(window.audioContext || window.webkitAudioContext);
  return function (volume, duration, type, fn) {

    if (typeof fn != "function") {
      fn = function () {};
    }

    var osc = ctx.createOscillator();
    osc.type = (type % 5) || 0; // only 0-4 is valid

    var gainNode = ctx.createGainNode();
    gainNode.gain.value = volume;

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.noteOn(0);

    setTimeout(function () {
      osc.noteOff(0);
      fn();
    }, duration);

  };
})();
