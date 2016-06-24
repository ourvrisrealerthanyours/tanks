var shouldCaptureKeyEvent = (event) => {
  if (event.shiftKey || event.metaKey || event.altKey || event.ctrlKey) {
    return false;
  }
  return document.activeElement === document.body;
};

var MAX_DELTA = 0.2,
    PROXY_FLAG = '__keyboard-controls-proxy';

AFRAME.registerComponent('forward-movement-controls', {
  dependencies: ['velocity'],

  schema: {
    movementEasing:       { default: 15 }, // m/s2
    movementAcceleration: { default: 200 }, // m/s2
    rotationElSelector:   { default: null }
  },

  init: function () {
    this.velocity = new THREE.Vector3();
    this.dVelocity = new THREE.Vector3();
    this.heading = new THREE.Euler(0, 0, 0, 'YXZ');
    this.localKeys = {};
    this.rotatorEl = this.data.rotationElSelector ? 
      document.querySelector(this.data.rotationElSelector) : this.el;
    this.listeners = {
      keydown: this.onKeyDown.bind(this),
      keyup: this.onKeyUp.bind(this),
      blur: this.onBlur.bind(this)
    };
    this.attachEventListeners();
  },

  tick: function (t, dt) {
    if (isNaN(dt)) { return; }

    if (dt / 1000 > MAX_DELTA) {
      this.velocity.set(0, 0, 0);
      this.el.setAttribute('velocity', this.velocity);
      return;
    }
    this.updateVelocity(dt);
  },

  /*******************************************************************
  * Movement
  */

  getVelocityDelta: function () {
    var data = this.data,
        keys = this.getKeys();

    this.dVelocity.set(0, 0, 0);
    if (keys[87] || keys[38])    { this.dVelocity.z -= 1; } // W or Up Arrow
    // if (keys.KeyA || keys.ArrowLeft)  { this.dVelocity.x -= 1; }
    if (keys[83] || keys[40])  { this.dVelocity.z += 1; } // S or Down Arrow
    // if (keys.KeyD || keys.ArrowRight) { this.dVelocity.x += 1; }

    return this.dVelocity.clone();
  },

  updateVelocity: function(dt) {
    console.log('updatinVel!')
    var velocity, dVelocity,
        data = this.data;
    var keys = this.getKeys();

    dVelocity = this.getVelocityDelta(dt);
    velocity = this.velocity;
    velocity.copy(this.el.getAttribute('velocity'));
    velocity.x -= velocity.x * data.movementEasing * dt / 1000;
    velocity.z -= velocity.z * data.movementEasing * dt / 1000;

    if (dVelocity) {
      // Set acceleration
      if (dVelocity.length() > 1) {
        dVelocity.setLength(this.data.movementAcceleration * dt / 1000);
      } else {
        dVelocity.multiplyScalar(this.data.movementAcceleration * dt / 1000);
      }

      // Rotate to heading
      var rotation = this.rotatorEl.getAttribute('rotation');
      if (rotation) {
        this.heading.set(0, THREE.Math.degToRad(rotation.y), 0);
        dVelocity.applyEuler(this.heading);
      }
      velocity.add(dVelocity);
    }

    this.el.setAttribute('velocity', velocity);

  },

  /*******************************************************************
  * Events
  */

  play: function () {
    this.attachEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
  },

  remove: function () {
    this.pause();
  },

  attachEventListeners: function () {
    window.addEventListener('keydown', this.listeners.keydown, false);
    window.addEventListener('keyup', this.listeners.keyup, false);
    window.addEventListener('blur', this.listeners.blur, false);
  },

  removeEventListeners: function () {
    window.removeEventListener('keydown', this.listeners.keydown);
    window.removeEventListener('keyup', this.listeners.keyup);
    window.removeEventListener('blur', this.listeners.blur);
  },

  onKeyDown: function (event) {
    if (!shouldCaptureKeyEvent(event)) { return; }
    this.localKeys[event.keyCode] = true;
  },

  onKeyUp: function (event) {
    if (!shouldCaptureKeyEvent(event)) { return; }
    this.localKeys[event.keyCode] = false;
  },

  onBlur: function () {
    for (var code in this.localKeys) {
      if (this.localKeys.hasOwnProperty(code)) {
        delete this.localKeys[code];
      }
    }
  },

  /*******************************************************************
  * Accessors
  */

  getKeys: function () {
    if (this.isProxied()) {
      return this.el.sceneEl.components['proxy-controls'].getKeyboard();
    }
    return this.localKeys;
  },

  isProxied: function () {
    var proxyControls = this.el.sceneEl.components['proxy-controls'];
    return proxyControls && proxyControls.isConnected();
  }

});
