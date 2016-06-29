import THREE from 'three';
var MAX_DELTA = 0.2;
var shouldCaptureKeyEvent = (event) => {
  if (event.shiftKey || event.metaKey || event.altKey || event.ctrlKey) {
    return false;
  }
  return document.activeElement === document.body;
};

AFRAME.registerComponent('rotation-keyboard-controls', {

  dependencies: ['velocity', 'rotation'],

  schema: {
    movementEasing:       { default: 15 }, // m/s2
    movementAcceleration: { default: 200 }, // m/s2
    enabled: { default: true },
    wsEnabled: { default: true }
  },

  init: function () {
    // this.velocity = new THREE.Vector3();
    // this.dVelocity = new THREE.Vector3();
    // this.heading = new THREE.Euler(0, 0, 0, 'YXZ');
    this.keys = {};
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.attachVisibilityEventListeners();
  },

  tick: function (t, dt) {
    if (isNaN(dt) || dt/1000 > MAX_DELTA) { return; }
    if(this.data.enabled) {
      this.updateRotation(dt);
    }
  },

  updateRotation: function(dt) {
    let rotation = this.el.getComputedAttribute('rotation');
    let adRotation = 0;
    let wsRotation = 0;
    if(this.data.wsEnabled) {
      if (this.keys[87] || this.keys[38]) { wsRotation += 1} // W or Up
      if (this.keys[83] || this.keys[40]) { wsRotation -= 1} // S or Down
    }
    if (this.keys[65] || this.keys[37]) { adRotation += 1} // A or Left
    if (this.keys[68] || this.keys[39]) { adRotation -= 1} // D or Right
    this.el.setAttribute('rotation', {
      x: rotation.x + wsRotation,
      y: rotation.y + adRotation,
      z: rotation.z
    });
  },

  getKeys: function () {
    if (this.isProxied()) {
      return this.el.sceneEl.components['proxy-controls'].getKeyboard();
    }
    return this.keys;
  },

  isProxied: function () {
    var proxyControls = this.el.sceneEl.components['proxy-controls'];
    return proxyControls && proxyControls.isConnected();
  },

  play: function () {
    this.attachKeyEventListeners();
  },

  pause: function () {
    this.keys = {};
    this.removeKeyEventListeners();
  },

  remove: function () {
    this.pause();
    this.removeVisibilityEventListeners();
  },

  attachVisibilityEventListeners: function () {
    window.addEventListener('blur', this.onBlur);
    window.addEventListener('focus', this.onFocus);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  },

  removeVisibilityEventListeners: function () {
    window.removeEventListener('blur', this.onBlur);
    window.removeEventListener('focus', this.onFocus);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },

  attachKeyEventListeners: function () {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },

  removeKeyEventListeners: function () {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  },

  onBlur: function () {
    this.pause();
  },

  onFocus: function () {
    this.play();
  },

  onVisibilityChange: function () {
    if (document.hidden) {
      this.onBlur();
    } else {
      this.onFocus();
    }
  },

  onKeyDown: function (event) {
    if (!shouldCaptureKeyEvent(event)) { return; }
    this.keys[event.keyCode] = true;
  },

  onKeyUp: function (event) {
    if (!shouldCaptureKeyEvent(event)) { return; }
    this.keys[event.keyCode] = false;
  }
});
