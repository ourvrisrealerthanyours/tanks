AFRAME.registerComponent('socket-controls', {
  schema: {
    previousPos: {default: new THREE.Vector3()},
    currentPos: {default: new THREE.Vector3()},
    nextPos: {default: new THREE.Vector3()},
    updateRate: {default: 1}, // Dynamic updateRate in Hz
    socket: {default: null},
    lastUpdateTime: new Date(),
    updateWaiting: {default: false},
    dur: {default: 100} // set this to update cycle length
  },

  init: function() {
    const data = this.data;
    const socket = window.socket;
    const el = this.el;
    socket.on('enemyPositionUpdate', positionUpdate => {
      data.updateWaiting = true;
      data.previousPos = data.nextPos; // switch this to current position
      data.nextPos = positionUpdate;
    });
  },

  tick: function(t, dt) {
    const data = this.data;

    if (data.updateWaiting) {
      data.updateRate = 1/(t - data.lastUpdateTime);
      data.lastUpdateTime = t;
      data.updateWaiting = false;
    }

    // linear interp from data.lastPos to data.nextPos
    data.alpha = (t - data.lastUpdateTime) * data.updateRate;
    data.currentPos.lerpVectors(data.previousPos, data.nextPos, data.alpha);
    this.el.setAttribute('position', this.data.currentPos);
  },

  update: function (previousData) {
  },

});
