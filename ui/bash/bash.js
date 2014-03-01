#!/usr/bin/env node

var m = require('../demo-metronome');

m.start();
process.stdout.write('200bpm: 11/8, 10/8, 80bpm: 4/4, 200bpm: 11/8, 10/8, 80bpm: 3/4\n');

m.on('beat', function (level) {
  switch (level) {
    case 'h':
      process.stdout.clearLine();
      process.stdout.write('\r#');
      break;
    default:
      process.stdout.write('.');
      break;
  }
  process.stdout.write(' ');
});
