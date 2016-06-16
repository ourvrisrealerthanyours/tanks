import React from 'react';

class Tank extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 3 0';
    this.rotation = props.rotation || '0 0 0';
  }

  render () {
    return (
      <a-entity position={this.position} 
        tank-controls wasd-controls='adEnabled: false; acceleration: 200;' 
        kinematic-body>
        <a-entity id='camera' position='0 1.8 0' rotation={this.rotation}
          camera='near: 0.05' look-controls/>
        <a-box width='3' height='0.5' depth='5' position='0 0 0' 
          color='red' material='side:double;'/>
      </a-entity>
    )
  }
}

module.exports = Tank;

var MAX_DELTA = 0.2;
var shouldCaptureKeyEvent = (event) => {
  if (event.shiftKey || event.metaKey || event.altKey || event.ctrlKey) {
    return false;
  }
  return document.activeElement === document.body;
};

AFRAME.registerComponent('tank-controls', {
  schema: {
  },

  init: function () {
    this.angularVelocity = 0;
    this.keys = {};
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.attachVisibilityEventListeners();
  },

  update: function (previousData) {
    var prevTime = this.prevTime = this.prevTime || Date.now();
    var time = window.performance.now();
    var delta = (time - prevTime) / 1000;
    var keys = this.keys;
    var el = this.el;
    this.prevTime = time;

    // If data changed or FPS too low, reset velocity.
    if (previousData || delta > MAX_DELTA) {
      this.angularVelocity = 0;
      return;
    }

    var rotation = el.getComputedAttribute('rotation');

    if (keys[65] && !keys[68]) { 
      this.angularVelocity = 1; 
    } else if (keys[68] && !keys[65]) { 
      this.angularVelocity = -1; 
    } else {
      this.angularVelocity = 0;
    }

    el.setAttribute('rotation', {
      x: rotation.x,
      y: rotation.y + this.angularVelocity,
      z: rotation.z
    });
  },

  play: function () {
    this.attachKeyEventListeners();
  },

  pause: function () {
    this.keys = {};
    this.removeKeyEventListeners();
  },

  tick: function (t) {
    this.update();
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
  },
 
});