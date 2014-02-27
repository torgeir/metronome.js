module.exports = function () {
  var i, call = function (f, value) { f(value); };

  return {
    listeners: {},
    emit: function (ev, value) {
      (this.listeners[ev] || []).map(function (listener) {
        call(listener, value);
      });
    },
    on: function (ev, f) {
      (this.listeners[ev] = this.listeners[ev] || []).push(f);
    },
    off: function (ev, f) {
      if (this.listeners[ev] && (i = ~this.listeners[ev].indexOf(f)))
        this.listeners[ev].splice(-i - 1, 1);
      else if (ev)
        delete this.listeners[ev];
      else
        this.listeners = {};
    }
  };
};
