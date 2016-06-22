// TODO: Remove unnecessary bits from schema

AFRAME.registerComponent('socket-controls', {
  schema: {
    previousPos: {default: new THREE.Vector3()},
    currentPos: {default: new THREE.Vector3()},
    nextPos: {default: new THREE.Vector3()},
    updateRate: {default: 100}, // Dynamic updateRate in Hz
    playerId: {default: ''},
    socket: {default: null},
    lastUpdateTime: {default: 0},
    updateWaiting: {default: false},
  },

  init: function() {
    const data = this.data;
    const socket = window.socket;
    socket.on('simulationUpdate', players => {
      data.updateWaiting = true;
      data.previousPos = data.nextPos;
      data.nextPos = players[data.playerId].position;
    });
  },

  tick: function(t, dt) {
    const data = this.data;

    if (data.updateWaiting) {
      data.updateRate = (t - data.lastUpdateTime);
      data.lastUpdateTime = t;
      data.updateWaiting = false;
    }

    // linear interp from data.lastPos to data.nextPos
    data.alpha = (t - data.lastUpdateTime) / data.updateRate;
    data.currentPos.lerpVectors(data.previousPos, data.nextPos, data.alpha);
    this.el.setAttribute('position', this.data.currentPos);
  },

  update: function (previousData) {
  },

});
