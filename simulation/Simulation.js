const Room = require('./Room');

class Simulation {
  constructor(socket) {
    this.socket = socket;
    this.rooms = {}; // { roomId: Room }
  }

  createRoom(host) {
    const newRoom = new Room(host, this.socket);
    this.rooms[newRoom.roomId] = newRoom;
    return newRoom;
  }

  addRoom(room) {
    this.rooms[room.roomId] = room;
  }

  getFirstRoom() {
    return this.rooms[Object.keys(this.rooms)[0]];
  }

  update(freshData) {
    this.rooms[freshData.roomId] && this.rooms[freshData.roomId].update(freshData);
  }
}

module.exports = Simulation;
