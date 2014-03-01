
var m = require('../demo-metronome');
var beep = require('./beep');

var volume = 0.01;
var duration = 50;

m.on('beat', function (beat) {
  switch (beat) {
    case 'h':
      beep(volume, duration, 2);
      break;
    case 's':
      beep(volume, duration, 3);
      break;
  }
});

var button = document.querySelector('button');
var on = false;
button.onclick = function () {
  if (on) {
    m.stop();
    on = false;
  }
  else {
    m.start();
    on = true;
  }
};
