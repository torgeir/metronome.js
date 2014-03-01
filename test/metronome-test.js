var should = require('chai').should();
var sinon = require('sinon');

var Seq   = require('../').Sequence;
var a     = require('../').builder;

describe('metronome', function () {

  var m, clock;

  it('throws if outer sequence does not have bpm', function () {
    try {
      new Metronome({ seq: Seq() } );
    }
    catch (e) {
      should.exist(e);
    }
  });

  describe('4/4', function () {

    it('ticks hard first beat', function () {
      m.start();

      m.on('beat', function (beat) {
        beat.should.equal('h');
      });
      clock.tick();
    });

    it('ticks low rest beats', function () {
      m.start();

      clock.tick(); // skip h

      var beats = '';
      m.on('beat', function (beat) {
        beats += beat;
      });

      clock.tick(500);
      beats.should.eql('s');

      clock.tick(500);
      beats.should.eql('ss');

      clock.tick(500);
      beats.should.eql('sss');
    });

    it('loops', function () {
      m.start();

      clock.tick(1500); // skip hsss

      m.on('beat', function (beat) {
        beat.should.equal('h');
      });
      clock.tick(500);
    });

    beforeEach(function () {
      // beats every 500ms
      m = a.metronome.build;
    });
  });

  describe('11/8', function () {

    it('ticks rest beats', function () {
      // beats every 250ms
      m = a.metronome
        .withBpm(120)
        .withBars('11/8').build;

      m.start();

      var beats = '';
      m.on('beat', function (beat) {
        beats += beat;
      });

      clock.tick();
      beats.should.eql('h');

      clock.tick(10 * 250);
      beats.should.eql('hssssssssss');
    });
  });

  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });
});
