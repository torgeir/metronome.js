var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

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

    it('ticks hard first beat', function () {
      m.start();

      var spy = sinon.spy();
      m.on('beat', spy);
      clock.tick(0);

      spy.should.have.been.calledWith('h');
    });

    it('ticks low rest beats', function () {
      m.start();

      clock.tick(0); // skip first h

      var beats = [];
      m.on('beat', function (beat) {
        beats.push(beat);
      });

      clock.tick(500);
      beats.should.eql(['s']);

      clock.tick(500);
      beats.should.eql(['s', 's']);

      clock.tick(500);
      beats.should.eql(['s', 's', 's']);
    });

    it('loops', function () {
      m.start();

      clock.tick(1500);

      m.on('beat', function (level) {
        level.should.equal('h');
      });
      clock.tick(500);
    });

  });

});
