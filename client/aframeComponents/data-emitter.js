const { UPLOAD_PERIOD } = require('../../simulation/constants');

AFRAME.registerComponent('data-emitter', {
  schema: {
    roomId: {default: ''},
    playerId: {default: ''},
    socket: {default: null},
    lastUpdateTime: {default: 0},
  },

  init: function() {
    const data = this.data;
    data.socket = window.socket;
    data.socket.on('playerAdmittedToRoom', admission => {
      if (admission.player.playerId === data.playerId) {
        data.roomId = admission.roomId;
        window.roomId = admission.roomId;
      }
    });
  },

  tick: function(t, dt) {
    const data = this.data;

    if (data.playerId && t - data.lastUpdateTime >= UPLOAD_PERIOD) {
      data.socket.emit('playerUpdate', {
        roomId: data.roomId,
        playerId: data.playerId,
        position: this.el.getAttribute('position'),
      })
    }
  },
});
