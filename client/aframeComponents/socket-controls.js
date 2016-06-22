// TODO: Remove unnecessary bits from schema

AFRAME.registerComponent('socket-controls', {
  schema: {
    updateRate: {default: 100}, // Dynamic updateRate in Hz
    playerId: {default: ''},
    socket: {default: null},
    enabled: {default: true}
  },

  init: function() {
    const data = this.data;
    const socket = window.socket;
    this.previousPos = new THREE.Vector3();
    this.currentPos = new THREE.Vector3();
    this.nextPos = new THREE.Vector3();
    this.lastUpdateTime = 0;
    this.updateWaiting = false;
    this.updateRate = data.updateRate;

    if(data.enabled) {
      socket.on('simulationUpdate', players => {
        this.updateWaiting = true;
        this.previousPos = this.nextPos;
        this.nextPos = players[data.playerId].position;
      });
    }
  },

  tick: function(t, dt) {
    if(this.data.enabled && this.updateWaiting) {
      this.updateRate = (t - this.lastUpdateTime);
      this.lastUpdateTime = t;
      this.updateWaiting = false;
      // linear interp from data.lastPos to data.nextPos
      const alpha = (t - this.lastUpdateTime) / this.updateRate;
      this.currentPos.lerpVectors(this.previousPos, this.nextPos, alpha);
      // Don't update y to enable compatibility with kinematic-body physics
      this.el.setAttribute('position', {
        x: this.currentPos.x,
        y: this.el.getAttribute('position').y,
        z: this.currentPos.z
      });
    }
  }

});
