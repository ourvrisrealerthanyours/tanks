const uuid = require('uuid');
const { DOWNLOAD_PERIOD  } = require('../simulation/constants');

class Room {
  constructor(roomId, socket) {
    this.socket = socket;
    this.roomId = roomId;
    this.characters = {}; // { characterId: character}
    setInterval(() => this.updatePositions(), DOWNLOAD_PERIOD)
  }

  addCharacter(character) {
    this.characters[character.characterId] = character;
    this[character.tankColor] = character.characterId;
  }

  removeCharacter(character) {
    // figure this out
  }

  update(freshData) {
    this.characters[freshData.characterId] && this.characters[freshData.characterId].update(freshData);
  }

  // emitCharacterAdded(character) {
  //   this.socket.emit('characterAdded', {
  //     roomId: this.roomId,
  //     character: character,
  //   });
  // }

  updatePositions() {
    this.socket.emit('simulationUpdate', this.characters);
  }
}

module.exports = Room;
