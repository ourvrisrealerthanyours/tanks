AFRAME.registerComponent('socket-controls', {
  schema: {
    previousPos: {default: 0},
    nextPos: {default: 0},
    socket: {default: null},
    lastUpdateTime: new Date(),
    dur: {default: 100} // set this to update cycle length
  },

  init: function() {
    const data = this.data;
    const socket = window.socket;
    const el = this.el;
    socket.on('enemyPositionUpdate', positionUpdate => {
      data.lastUpdateTime = Date.now()
      data.previousPos = data.nextPos; // switch this to current position
      data.nextPos = positionUpdate;
      el.setAttribute('position', data.nextPos);
    });
  },

  tick: function(t, dt) {
    // linear interp from data.lastPos to data.nextPos
  },

  update: function (previousData) {
  },

});
