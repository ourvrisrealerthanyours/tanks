const { UPLOAD_PERIOD } = require('../../simulation/constants');

AFRAME.registerComponent('data-emitter', {
  schema: {
    roomId: {default: window.roomId},
    characterId: {default: window.characterId},
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
        roomId: data.roomId,
        characterId: data.characterId,
        position: this.el.getAttribute('position'),
        rotation: this.el.getAttribute('rotation')
      })
    }
  },
});
