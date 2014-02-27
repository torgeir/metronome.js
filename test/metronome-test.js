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

  describe('4/4', function () {

    it('ticks hard first beat', function (done) {
      m.start();
      m.on('h', done);
      clock.tick(0);
    });

    it('ticks low rest beats', function (done) {
      m.start();
      var ticks = 0;
      m.on('s', function () {
        ticks += 1;
        if (ticks == 3) {
          done();
        }
      });
      clock.tick(1500);
    });

  });

});
