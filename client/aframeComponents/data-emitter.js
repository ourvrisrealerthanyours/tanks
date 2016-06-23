const { UPLOAD_PERIOD } = require('../../simulation/constants');

AFRAME.registerComponent('data-emitter', {
  schema: {
    characterId: {default: window.characterId},
    role: {default: window.role},
    socket: {default: null},
    lastUpdateTime: {default: 0},
  },

  init: function() {
    const data = this.data;
    data.socket = window.socket;
  },

  tick: function(t, dt) {
    const data = this.data;
    if (data.characterId && t - data.lastUpdateTime >= UPLOAD_PERIOD) {
      data.socket.emit('characterUpdate', {
        characterId: data.characterId,
        role: data.role,
        position: this.el.getAttribute('position'),
        rotation: this.el.getAttribute('rotation')
      })
    }
  },
});
