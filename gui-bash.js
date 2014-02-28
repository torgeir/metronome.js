#!/usr/bin/env node

// ^ . . .
var m = require('src/metronome');
var Metronome = m.Metronome;
var Bar = m.Bar;

var m = new Metronome({
  bar: new Bar(11, 8),
  bpm: 220
});
m.start();

var wasH = false;

m.on('beat', function (level) {
  if (level == 'h') {
    process.stdout.clearLine();
    process.stdout.write('\r#');
    wasH = true;
  }
  else {
    if (wasH) {
      wasH = false;
      process.stdout.clearLine();
      process.stdout.write('\r  ');
    }
    process.stdout.write('.');
  }
  process.stdout.write(' ');
});
