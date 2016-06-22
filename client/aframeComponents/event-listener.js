AFRAME.registerComponent('event-listener', {
 schema: {
    callback: {default: null},
    on: {default: 'click'}
  },

  init: function () {
    const el = this.el;
    const event = this.data.on;
    const callback = window[this.data.callback];
    window.addEventListener(event, function () {
      el.emit(event, null, false);
      if(callback) {
        callback();
      }
    });
  }
});
