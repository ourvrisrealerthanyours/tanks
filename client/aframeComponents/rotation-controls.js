import THREE from 'three';

var MAX_DELTA = 0.2;
var PI_2 = Math.PI / 2;

var shouldCaptureKeyEvent = (event) => {
  if (event.shiftKey || event.metaKey || event.altKey || event.ctrlKey) {
    return false;
  }
  return document.activeElement === document.body;
};

AFRAME.registerComponent('rotation-controls', {

  dependencies: ['rotation'],

  schema: {
    enabled: { default: true },
    wsEnabled: { default: true },
    pointerlockEnabled: { default: true },
    mouseSensitivity: { default: 0.002 },
    keyboardSensitivity: { default: 1 }
  },

  init: function () {
    this.pitch = new THREE.Object3D();
    this.yaw = new THREE.Object3D();
    this.lookVector = new THREE.Vector2();
    this.totalRotationDelta = new THREE.Vector2();

    this.keys = {};
    this.mouseDown = false;
    this.pointerLocked = false;
    
    this.bindMethods();
  },

  bindMethods: function () {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onPointerLockChange = this.onPointerLockChange.bind(this);
  },

  tick: function (t, dt) {
    if (isNaN(dt) || dt/1000 > MAX_DELTA) { return; }
    if(this.data.enabled) {
      this.updateRotation(dt);
    }
  },

  updateRotation: function(dt) {
    let data = this.data;
    this.totalRotationDelta.set(0,0);

    let keyboardRotationDelta = this.getKeyboardRotationDelta();
    this.totalRotationDelta.add(keyboardRotationDelta);

    if(this.isMouseRotationActive()) {
      let mouseRotationDelta = this.getMouseRotationDelta();
      this.totalRotationDelta.add(mouseRotationDelta);
    }

    this.yaw.rotation.y -= this.totalRotationDelta.x;
    this.pitch.rotation.x -= this.totalRotationDelta.y;
    this.pitch.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.pitch.rotation.x));
    this.el.setAttribute('rotation', {
      x: THREE.Math.radToDeg(this.pitch.rotation.x),
      y: THREE.Math.radToDeg(this.yaw.rotation.y),
      z: 0
    });
  },

  getKeyboardRotationDelta: function () {
    let yaw = 0;
    let pitch = 0;
    if(this.data.wsEnabled) {
      if (this.keys[87] || this.keys[38]) { pitch -= 1} // W or Up
      if (this.keys[83] || this.keys[40]) { pitch += 1} // S or Down
    }
    if (this.keys[65] || this.keys[37]) { yaw -= 1} // A or Left
    if (this.keys[68] || this.keys[39]) { yaw += 1} // D or Right
    let rotationDelta = new THREE.Vector2(
      THREE.Math.degToRad(yaw), 
      THREE.Math.degToRad(pitch)
    ).multiplyScalar(this.data.keyboardSensitivity);
    return rotationDelta;
  },

  getMouseRotationDelta: function () {
    var rotationDelta = this.lookVector.clone().multiplyScalar(this.data.mouseSensitivity);
    this.lookVector.set(0, 0);
    return rotationDelta;
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
    this.attachEventListeners();
  },

  pause: function () {
    this.keys = {};
    this.lookVector.set(0, 0);
    this.removeEventListeners();
  },

  remove: function () {
    this.pause();
    document.exitPointerLock();
  },

  attachEventListeners: function () {
    var sceneEl = this.el.sceneEl;
    var canvasEl = sceneEl.canvas;
    var data = this.data;

    if (!canvasEl) {
      sceneEl.addEventListener('render-target-loaded', this.addEventListeners.bind(this));
      return;
    }

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    canvasEl.addEventListener('mousedown', this.onMouseDown, false);
    canvasEl.addEventListener('mousemove', this.onMouseMove, false);
    canvasEl.addEventListener('mouseup', this.onMouseUp, false);
    canvasEl.addEventListener('mouseout', this.onMouseUp, false);

    if (data.pointerlockEnabled) {
      document.addEventListener('pointerlockchange', this.onPointerLockChange, false);
      document.addEventListener('mozpointerlockchange', this.onPointerLockChange, false);
      document.addEventListener('pointerlockerror', this.onPointerLockError, false);
    }
  },

  removeEventListeners: function () {
    var canvasEl = this.el.sceneEl && this.el.sceneEl.canvas;
    if (canvasEl) {
      canvasEl.removeEventListener('mousedown', this.onMouseDown, false);
      canvasEl.removeEventListener('mousemove', this.onMouseMove, false);
      canvasEl.removeEventListener('mouseup', this.onMouseUp, false);
      canvasEl.removeEventListener('mouseout', this.onMouseUp, false);
    }
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);

    document.removeEventListener('pointerlockchange', this.onPointerLockChange, false);
    document.removeEventListener('mozpointerlockchange', this.onPointerLockChange, false);
    document.removeEventListener('pointerlockerror', this.onPointerLockError, false);
  },

  isMouseRotationActive: function () {
    return this.data.enabled && (this.mouseDown || this.pointerLocked);
  },

  onMouseMove: function (event) {
    var previousMouseEvent = this.previousMouseEvent;

    if (!this.data.enabled || !(this.mouseDown || this.pointerLocked)) {
      return;
    }

    var movementX = event.movementX || event.mozMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || 0;

    if (!this.pointerLocked) {
      movementX = event.screenX - previousMouseEvent.screenX;
      movementY = event.screenY - previousMouseEvent.screenY;
    }

    this.lookVector.x += movementX;
    this.lookVector.y += movementY;

    this.previousMouseEvent = event;
  },

  onMouseDown: function (event) {
    var canvasEl = this.el.sceneEl.canvas;

    this.mouseDown = true;
    this.previousMouseEvent = event;

    if (this.data.pointerlockEnabled && !this.pointerLocked) {
      if (canvasEl.requestPointerLock) {
        canvasEl.requestPointerLock();
      } else if (canvasEl.mozRequestPointerLock) {
        canvasEl.mozRequestPointerLock();
      }
    }
  },

  onMouseUp: function () {
    this.mouseDown = false;
  },

  onPointerLockChange: function () {
    this.pointerLocked = !!(document.pointerLockElement || document.mozPointerLockElement);
  },

  onPointerLockError: function () {
    this.pointerLocked = false;
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
