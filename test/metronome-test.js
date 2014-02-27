var sinon = require('sinon');
var chai = require('chai');
chai.should();

var Metronome = require('../src/metronome');


describe('metronome', function () {

  var m,
      clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
    m = new Metronome({ bpm: 120 });
  });

  afterEach(function () {
    clock.restore();
  });

// Steg 1
// 3 av 1/4 lengde
// 11 av 1/8 lengde
//
// new Metronome({
//   bpm: 120
// });
//

// Steg 2
// 1 x 11/8, 1 x 10/8

  it('ticks first beat', function (done) {
    m.start();
    m.on('hard', done);
    clock.tick(0);
  });


  it('ticks second beat', function (done) {
    m.start();
    m.on('soft', done);
    clock.tick(500);
  });
});
