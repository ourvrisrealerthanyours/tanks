const Room = require('./Room');
const Character = require('./Character');
const uuid = require('uuid');
const { DOWNLOAD_PERIOD  } = require('../simulation/constants');

class Simulation {
  constructor(socket) {
    this.socket = socket;
    this.characters = {};
    setInterval(() => this.updatePositions(), DOWNLOAD_PERIOD)
  }

  start() {
    this.addCharacter(new Character('0'))
    this.addCharacter(new Character('1'))
  }

  update(freshData) {
    if (this.characters[freshData.characterId]) {
      this.characters[freshData.characterId].update(freshData);
    }
  }

  updatePositions() {
    this.socket.emit('simulationUpdate', this.characters);
  }

  addCharacter(character) {
    this.characters[character.characterId] = character;
    this[character.tankColor] = character.characterId;
  }
}

module.exports = Simulation;
