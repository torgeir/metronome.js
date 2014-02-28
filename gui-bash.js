#!/usr/bin/env node

// ^ . . .
var m = require('src/metronome');
var Metronome = m.Metronome;
var Bar = m.Bar;

var m = new Metronome({
  bar: new Bar(11, 4),
  bpm: 220
});
m.start();

m.on('beat', function (level) {
  console.log(level);
});
