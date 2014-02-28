var sinon = require('sinon');

var Metronome = require('../src/metronome');
var Sequence = require('../src/sequence');
var Bar = require('../src/bar');

describe('metronome', function () {

  var m,
      clock;

  describe('4/4', function () {

    beforeEach(function () {
      clock = sinon.useFakeTimers();
      m = new Metronome({
        // beat hver 500ms
        seq: new Sequence(120,
                [ new Bar(4, 4) ])
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
        // beat hver 250ms
        seq: new Sequence(120,
                [ new Bar(11, 8) ]),
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
      beats.should.eql([ 'h', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's' ]);
    });
  });

});
