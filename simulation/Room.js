const uuid = require('uuid');
const { DOWNLOAD_PERIOD  } = require('../simulation/constants');

class Room {
  constructor(host, socket) {
    this.socket = socket;
    this.roomId = uuid.v4();
    this.characters = {}; // { characterId: character}
    this.addCharacter(host);
    setInterval(() => this.updatePositions(), DOWNLOAD_PERIOD)
  }

  addCharacter(character) {
    this.characters[character.characterId] = character;
    // this.emitCharacterAdded(character);
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
