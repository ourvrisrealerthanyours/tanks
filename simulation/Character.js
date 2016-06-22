const v0 = { x: 0, y: 0, z: 0 };
const uuid = require('uuid');
const { randStart } = require('../math/vectorHelpers');
const { ARENA_WIDTH } = require('./constants');

class Character {
  constructor(characterId = uuid.v4(),
              position = randStart(ARENA_WIDTH, 0, ARENA_WIDTH),
              tankRotation = randStart(0, 360, 0),
              turretRotation = v0) {
    this.characterId = characterId;
    this.position = position;
    this.tankRotation = tankRotation;
    this.turretRotation = turretRotation;
  }

  update(freshData) {
    if (freshData.role === 'gunner') {
      this.turretRotation = freshData.rotation;
    } else { // assume role is driver
      this.position = freshData.position;
      this.tankRotation = freshData.rotation;
    }
  }
}

module.exports = Character;
