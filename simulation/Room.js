const uuid = require('uuid');
const { DOWNLOAD_PERIOD  } = require('../simulation/constants');

class Room {
  constructor(host, socket) {
    this.socket = socket;
    this.roomId = uuid.v4();
    this.hostId = host.playerId;
    this.players = {}; // { playerId: Player}
    this.addPlayer(host);
    setInterval(() => this.updatePositions(), DOWNLOAD_PERIOD)
  }

  addPlayer(player) {
    this.players[player.playerId] = player;
    this.emitPlayerAdded(player);
  }

  removePlayer(player) {
    // figure this out
  }

  update(freshData) {
    this.players[freshData.playerId].position = freshData.position;
  }

  emitPlayerAdded(player) {
    this.socket.emit('playerAdded', {
      roomId: this.roomId,
      player: player,
    });
  }
  updatePositions() {
    this.socket.emit('simulationUpdate', this.players);
  }
}

module.exports = Room;
