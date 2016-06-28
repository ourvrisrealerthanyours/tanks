const { DOWNLOAD_PERIOD, TANK_RADIUS } = require('../../simulation/constants');
const { lerpRotations, getVelocity } = require('../../math/vectorHelpers');

AFRAME.registerComponent('socket-controls', {
  schema: {
    characterId: {default: ''},
    simulationAttribute: {default: 'position'}, // one of 'position', 'tankRotation', 'turretRotation'
    posEnabled: {default: true},
    rotEnabled: {default: true},
    enabled: {default: true}
  },

  init: function() {
    const data = this.data;
    const socket = window.socket;
    if(data.enabled) {
      this.previous = new THREE.Vector3();
      this.current = new THREE.Vector3();
      this.next = new THREE.Vector3();

      this.lastUpdateTime = 0;
      this.updateWaiting = false;
      this.updateRate = DOWNLOAD_PERIOD;
      this.velocity = { x: 0, y: 0, z: 0 };

      if (data.simulationAttribute === 'position') {
        this.controlledAttribute = 'position';
      } else {
        this.controlledAttribute = 'rotation';
      }

      socket.on('simulationUpdate', characters => {
        if (characters[data.characterId]) {
          this.updateWaiting = true;
          this.previous = this.el.getAttribute(this.controlledAttribute) || new THREE.Vector3();
          this.next = characters[data.characterId][data.simulationAttribute];
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

    if (this.controlledAttribute === 'rotation') {
      lerpRotations(this.current, this.previous, this.next, alpha);
    } else {
      this.current.lerpVectors(this.previous, this.next, alpha);
      this.current.y = TANK_RADIUS;
    }

    this.el.setAttribute(this.controlledAttribute, this.current);
  }

});
