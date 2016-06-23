// TODO: Remove unnecessary bits from schema
const { DOWNLOAD_PERIOD } = require('../../simulation/constants');
const { lerpRotations } = require('../../math/vectorHelpers');

AFRAME.registerComponent('socket-controls', {
  schema: {
    characterId: {default: ''},
    type: {default: 'turret'},
    socket: {default: null},
    posEnabled: {default: true},
    rotEnabled: {default: true},
    enabled: {default: true}
  },

  init: function() {
    const data = this.data;
    const socket = window.socket;
    if(data.enabled) {
      this.previousRot = new THREE.Vector3();
      this.currentRot = new THREE.Vector3();
      this.nextRot = new THREE.Vector3();

      if(data.type === 'body') {
        this.previousPos = new THREE.Vector3();
        this.currentPos = new THREE.Vector3();
        this.nextPos = new THREE.Vector3();
      }

      this.lastUpdateTime = 0;
      this.updateWaiting = false;
      this.updateRate = DOWNLOAD_PERIOD;

      socket.on('simulationUpdate', characters => {
        if (characters[data.characterId]) {
          this.updateWaiting = true;

          this.previousPos = this.el.getAttribute('position');
          this.previousRot = this.el.getAttribute('rotation');

          this.nextRot = characters[data.characterId].turretRotation;

          if (data.type === 'body') {
            this.nextPos = characters[data.characterId].position;
            this.nextRot = characters[data.characterId].tankRotation;
          }
        }
      });
    }
  },

  tick: function(t, dt) {
    const data = this.data;
    if(this.updateWaiting) {
      this.updateRate = Math.max(DOWNLOAD_PERIOD, (t - this.lastUpdateTime));
      this.lastUpdateTime = t;
      this.updateWaiting = false;
    }
    const alpha = (t - this.lastUpdateTime) / this.updateRate;

    // this.currentRot.lerpVectors(this.previousRot, this.nextRot, alpha);
    lerpRotations(this.currentRot, this.previousRot, this.nextRot, alpha);
    this.el.setAttribute('rotation', this.currentRot);

    if(data.type === 'body') {
      // linear interp from data.lastPos to data.nextPos
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
