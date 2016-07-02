AFRAME.registerComponent('click-space-cursor', {
  schema: {
    maxDistance: { default: 5, min: 0 },
  },

  dependencies: [ 'raycaster' ],

  init: function () {
    this.raycaster = this.el.components.raycaster;
    this.bindMethods();
    this.attachEventListeners();
  },

  bindMethods: function () {
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onIntersection = this.onIntersection.bind(this);
    this.onIntersectionCleared = this.onIntersectionCleared.bind(this);
  },

  attachEventListeners: function () {
    var el = this.el;
    var canvas = el.sceneEl.canvas;

    // listen for canvas to load.
    if (!canvas) {
      el.sceneEl.addEventListener('render-target-loaded', this.attachEventListeners.bind(this));
      return;
    }

    canvas.addEventListener('mousedown', this.onMouseDown);
    canvas.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    el.addEventListener('intersection', this.onIntersection);
    el.addEventListener('intersectioncleared', this.onIntersectionCleared);
  },

  removeEventListeners: function () {
    var el = this.el;
    var canvas = el.sceneEl.canvas;

    canvas.removeEventListener('mousedown', this.onMouseDown);
    canvas.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);

    el.removeEventListener('intersection', this.onIntersection);
    el.removeEventListener('intersectioncleared', this.onIntersectionCleared);
  },

  pause: function () {
    this.removeEventListeners();
  },

  onMouseDown: function (evt) {
    this.emit('mousedown');
    this.mouseDownEl = this.intersectedEl;
  },

  onMouseUp: function () {
    this.emit('mouseup');
    if (!this.intersectedEl) { return; }
    if (this.mouseDownEl === this.intersectedEl) {
      this.emit('click');
    }
  },

  onKeyDown: function (evt) {
    console.log('keydown!!');
    if(evt.keyCode === 32) {
      console.log('space pressed!')
      this.emit('keydown');
      this.keyDownEl = this.intersectedEl;
    }
  },

  onKeyUp: function (evt) {
    if(evt.keyCode === 32) {
      this.emit('keyup');
      if (!this.intersectedEl) { return; }
      if (this.keyDownEl === this.intersectedEl) {
        this.emit('click');
      }
    }
  },

  emit: function (evt) {
    var intersectedEl = this.intersectedEl;
    this.el.emit(evt, { target: this.intersectedEl });
    if (intersectedEl) { intersectedEl.emit(evt); }
  },

  emitter: function (evt) {
    return function () {
      this.emit(evt);
    }.bind(this);
  },

  onIntersection: function (evt) {
    var self = this;
    var data = this.data;
    var el = evt.detail.el;
    var distance = evt.detail.distance;
    if (this.intersectedEl === el) { return; }
    if (distance >= this.data.maxDistance) { return; }
    this.intersectedEl = el;
    el.addState('hovered');
    el.emit('mouseenter');
    this.el.addState('hovering');
  },

  onIntersectionCleared: function (evt) {
    var el = evt.detail.el;
    if (!el || !this.intersectedEl) { return; }
    el.removeState('hovered');
    el.emit('mouseleave');
    this.el.removeState('hovering');
    this.intersectedEl = null;
  }
});
