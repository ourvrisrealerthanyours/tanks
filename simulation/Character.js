const v0 = { x: 0, y: 0, z: 0 };
const uuid = require('uuid');

class Character {
  constructor(characterId = uuid.v4(), position = v0, rotation = v0) {
    this.characterId = characterId;
    this.position = position;
    this.rotation = rotation;
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
