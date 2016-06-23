const v0 = { x: 0, y: 0, z: 0 };
const uuid = require('uuid');

class Player {
  constructor(playerId = uuid.v4()) {
    this.playerId = playerId;
    this.position = v0;
    this.tankRotation = v0;
    this.turretRotation = v0;
  }
}

module.exports = Player;
