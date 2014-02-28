var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var m = require('../src/metronome');
var Metronome = m.Metronome;
var Bar = m.Bar;


describe('metronome', function () {

  var m,
      clock;

  describe('4/4', function () {

    beforeEach(function () {
      clock = sinon.useFakeTimers();
      m = new Metronome({
        bar: new Bar(4, 4),
        bpm: 120 // beat hver 500 ms
      });
    });

    afterEach(function () {
      clock.restore();
    });

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

  describe('11/8', function () {

    beforeEach(function () {
      clock = sinon.useFakeTimers();
      m = new Metronome({
        bar: new Bar(11, 8),
        bpm: 120 // beat hver 250ms
      });
    });

    afterEach(function () {
      clock.restore();
    });

    it('ticks rest beats', function () {
      m.start();

      var beats = [];
      m.on('beat', function (level) {
        beats.push(level);
      });

      clock.tick(0);
      beats.should.eql([ 'h' ]);

      clock.tick(10 * 250);
      beats.should.eql([
        'h',
        's',
        's',
        's',
        's',
        's',
        's',
        's',
        's',
        's',
        's',
      ]);
    });
  });

});
