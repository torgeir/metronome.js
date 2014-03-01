#!/usr/bin/env node

var m = require('../demo-metronome');

m.start();

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
