const v0 = { x: 0, y: 0, z: 0 };
const uuid = require('uuid');

class Player {
  constructor(playerId = uuid.v4(), position = v0, tankRotation = v0, turretRotation = v0) {
    this.playerId = playerId;
    this.position = position;
    this.tankRotation = tankRotation;
    this.turretRotation = turretRotation;
  }

  joinRoom(simulation, roomId) {
    let self = this;
    simulation.rooms[roomId].addPlayer(self); // self may be unnecessary
  }
}

module.exports = Player;
