const v0 = { x: 0, y: 0, z: 0 };
const uuid = require('uuid');
const { randStart } = require('../math/vectorHelpers');
const { ARENA_WIDTH } = require('./constants');

class Character {
  constructor(characterId = uuid.v4()) {
    this.characterId = characterId;
    this.position = randStart();
    this.tankRotation = v0;
    this.turretRotation = v0;
    this.gunner = null;
    this.driver = null;
    this.health = 1000;
  }

  update(freshData) {
    this[freshData.simulationAttribute] = freshData.value;
  }
}

module.exports = Character;
