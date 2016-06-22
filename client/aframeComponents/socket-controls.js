// TODO: Remove unnecessary bits from schema

AFRAME.registerComponent('socket-controls', {
  schema: {
    updateRate: {default: 100}, // Dynamic updateRate in Hz
    playerId: {default: ''},
    socket: {default: null},
    posEnabled: {default: true},
    rotEnabled: {default: true},
    enabled: {default: true}
  },

  init: function() {
    const data = this.data;
    const socket = window.socket;
    if(data.enabled) {
      
      if(data.posEnabled) {
        this.previousPos = new THREE.Vector3();
        this.currentPos = new THREE.Vector3();
        this.nextPos = new THREE.Vector3();
      }

      if(data.rotEnabled) {
        this.previousRot = new THREE.Vector3();
        this.currentRot = new THREE.Vector3();
        this.nextRot = new THREE.Vector3();
      }

      this.lastUpdateTime = 0;
      this.updateWaiting = false;
      this.updateRate = data.updateRate;

      socket.on('simulationUpdate', players => {
        this.updateWaiting = true;
        if(data.posEnabled) {
          this.previousPos = this.nextPos;
          this.nextPos = players[data.playerId].position;
        }
        if(data.rotEnabled) {
          this.previousRot = this.nextRot;
          this.nextRot = players[data.playerId].rotation;
        }
      });
    }
  },

  tick: function(t, dt) {
    const data = this.data;
    if(data.enabled && this.updateWaiting) {
      this.updateRate = (t - this.lastUpdateTime);
      this.lastUpdateTime = t;
      this.updateWaiting = false;

      const alpha = (t - this.lastUpdateTime) / this.updateRate;

      if(data.posEnabled) {
        // linear interp from data.lastPos to data.nextPos
        this.currentPos.lerpVectors(this.previousPos, this.nextPos, alpha);
        // Don't update y to enable compatibility with kinematic-body physics
        this.el.setAttribute('position', {
          x: this.currentPos.x,
          y: this.el.getAttribute('position').y,
          z: this.currentPos.z
        });
      }

      if(data.rotEnabled && this.previousRot && this.nextRot) {
        // linear interp from data.lastRot to data.nextRot
        this.currentRot.lerpVectors(this.previousRot, this.nextRot, alpha);
        this.el.setAttribute('rotation', this.currentRot);
      }
    }
  }

});
