#!/usr/bin/env node

// ^ . . .
var a = require('./').builder;

var seq = a.seq
  .withBpm(200)
  .withBars('11/8', '10/8').build;

var m = a.metronome
  .withBpm(80)
  .withBars(seq, '4/4', seq, '3/4').build;

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
