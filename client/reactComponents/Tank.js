import React from 'react';

class Tank extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 3 0';
    this.rotation = props.rotation || '0 0 0';
    this.driverLength = 5;
    this.driverWidth = 3;
    this.driverCompartmentLength = Math.min(2, this.driverLength);
    this.state = {
      turretAngle: 0
    }

    setInterval(() => {
      this.setState({ 
        turretAngle: Math.random() * 60 - 30
      })
    }, 1000)
  }

  render () {
    const driverBlockLength = this.driverLength - this.driverCompartmentLength;
    const driverCameraOffset = (this.driverCompartmentLength - this.driverLength) / 2;
     return (
      <a-entity position={this.position} 
      tank-controls wasd-controls='adEnabled: false; acceleration: 200;' 
      kinematic-body>
        <a-entity id='camera' position={`0 1 ${driverCameraOffset}`} 
        rotation={this.rotation}
        camera='near: 0.05' look-controls />

        {/* Top and bottom driver plate */}
        <a-box width={this.driverWidth} height='0.5' depth={this.driverLength} 
        position='0 0 0' 
        color='red'/>
        <a-box width={this.driverWidth} height='0.5' depth={this.driverLength} 
        position='0 2 0' 
        color='red'/>

        {/* Driver compartment block */}
        <a-box width={this.driverWidth} height='1.5' 
        depth={driverBlockLength} 
        position={`0 1 ${(this.driverLength - driverBlockLength) / 2}`} color='red'/>

        {/* Driver compartment window liners */}
        <a-box width='0.2' height='1.5' depth='1' 
        position={`${-(this.driverWidth - 0.2) / 2} 1 ${-(this.driverLength - 1) / 2}`} 
        color='red'/>
        <a-box width='0.2' height='1.5' depth='1' 
        position={`${(this.driverWidth - 0.2) / 2} 1 ${-(this.driverLength - 1) / 2}`}
        color='red'/>

        {/* turret */}
        <a-entity id='turret' position={`0 2.75 0`}
        quick-rotate={`nextAngle: ${this.state.turretAngle}`}>
          <a-cylinder height='1' radius={this.driverWidth / 2} />
          <a-cylinder height='3' radius='0.08' position={`0 0 ${-(this.driverWidth + 3) / 2}`}
          rotation='90 0 0' />
          <a-cylinder height='0.3' radius='0.12' position={`0 0 ${-(this.driverWidth/2 + 3)}`}
          rotation='90 0 0' />
        </a-entity>

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

AFRAME.registerComponent('quick-rotate', {
  schema: {
    nextAngle: {default: 0},
    dur: {default: 50}
  },

  init: function () {
    this.lastTime = window.performance.now()
  },

  tick: function(t) {
    const lastTime = this.lastTime;
    this.lastTime = t;
    this.rotation = this.el.getComputedAttribute('rotation');
    const difference = this.data.nextAngle - this.rotation.y;
    if((this.step > 0 && difference > 1) || (this.step < 0 && difference < -1)) {
      this.el.setAttribute('rotation', {
        x: this.rotation.x,
        y: this.rotation.y + this.step * (t - lastTime),
        z: this.rotation.z
      })
    }
  },

  update: function (previousData) {
    this.rotation = this.el.getComputedAttribute('rotation');
    const distance = this.data.nextAngle - this.rotation.y;
    this.step = distance / this.data.dur;
    this.lastTime = window.performance.now();
  },
 
});

