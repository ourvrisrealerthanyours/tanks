AFRAME.registerComponent('click-space-listener', {
  init: function () {
    const el = this.el;
    // click:
    window.addEventListener('click', function () {
      el.emit('click', null, false);
    });
    // space:
    window.addEventListener('keydown', function (e) {
      if(e.keyCode === 32) {
        el.emit('click', null, false);
      }
    });
  }
});
