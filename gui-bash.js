#!/usr/bin/env node

// ^ . . .
var Metronome = require('src/metronome');
var Sequence = require('src/sequence');
var Bar = require('src/bar');

var m = new Metronome({
  seq: new Sequence(220, [ new Bar(11, 8), new Bar(4, 4) ])
});
m.start();

m.on('beat', function (level) {
  if (level == 'h') {
    process.stdout.clearLine();
    process.stdout.write('\r#');
  }
  else {
    process.stdout.write('.');
  }
  process.stdout.write(' ');
});
