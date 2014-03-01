#!/usr/bin/env node

// ^ . . .
var a = require('./').builder;

var m = a.metronome
  .withBpm(220)
  .withBars('11/8', '4/4', '2/4')
  .build;

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
