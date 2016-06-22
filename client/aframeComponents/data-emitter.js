const { UPLOAD_PERIOD } = require('../../simulation/constants');

AFRAME.registerComponent('data-emitter', {
  schema: {
    roomId: {default: window.roomId},
    playerId: {default: window.playerId},
    socket: {default: null},
    lastUpdateTime: {default: 0},
  },

  init: function() {
    const data = this.data;
    data.socket = window.socket;
  },

  tick: function(t, dt) {
    const data = this.data;

    if (data.playerId && t - data.lastUpdateTime >= UPLOAD_PERIOD) {
      data.socket.emit('playerUpdate', {
        roomId: data.roomId,
        playerId: data.playerId,
        position: this.el.getAttribute('position'),
        rotation: this.el.getAttribute('rotation')
      })
    }
  },
});
