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
    } else {
      console.error('Character does not exist!');
    }
  }

  updatePositions() {
    this.socket.emit('simulationUpdate', this.characters);
  }

  addCharacter(character) {
    this.characters[character.characterId] = character;
    this[character.tankColor] = character.characterId;
  }

  updateCharacterRoles(characterId, role, playerId) {
    if(this.characters[characterId]) {
      this.characters[characterId][role] = playerId;
    } else {
      console.error('Character does not exist!');
    }
    return this.characters[characterId][role] === playerId;
  }

  registerHit(characterId) {
    if(this.characters[characterId]) {
      this.characters[characterId].health -= 30;
      return this.characters[characterId].health;
    }
  }

  removePlayer(playerId) {
    // TODO: Make this function prettier
    for(const characterId in this.characters) {
      if(playerId === this.characters[characterId].driver) {
        this.updateCharacterRoles(characterId, 'driver', undefined);
      }
      if(playerId === this.characters[characterId].gunner) {
        this.updateCharacterRoles(characterId, 'gunner', undefined);
      }
    }
  }
}

module.exports = Simulation;
