#!/usr/bin/env node

// ^ . . .
var Metronome = require('src/metronome');

var m = new Metronome({ bpm: 120 });
m.start();

m.on('beat', function (level) {
  console.log(level);
});
