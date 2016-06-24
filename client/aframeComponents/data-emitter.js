const { UPLOAD_PERIOD } = require('../../simulation/constants');

AFRAME.registerComponent('data-emitter', {
  schema: {
    characterId: {default: window.characterId},
    simulationAttribute: {default: 'position'}, // one of 'position', 'tankRotation', 'turretRotation'
    role: {default: window.role},
    socket: {default: null},
    lastUpdateTime: {default: 0},
  },

  init: function() {
    const data = this.data;
    data.socket = window.socket;
    if (data.simulationAttribute === 'position') {
      this.attributeToEmit = 'position';
    } else {
      this.attributeToEmit = 'rotation';
    }
  },

  tick: function(t, dt) {
    const data = this.data;
    if (data.characterId && t - data.lastUpdateTime >= UPLOAD_PERIOD) {
      data.socket.emit('characterUpdate', {
        characterId: data.characterId,
        simulationAttribute: data.simulationAttribute,
        value: this.el.getAttribute(this.attributeToEmit);
      })
    }
  },
});
