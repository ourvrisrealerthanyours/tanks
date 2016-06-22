const v0 = { x: 0, y: 0, z: 0 }; // should this be a THREE.Vector3()?
const uuid = require('uuid');
const { DOWNLOAD_PERIOD  } = require('../simulation/constants');

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

class Room {
  constructor(host, socket) {
    this.socket = socket;
    this.roomId = uuid.v4();
    this.hostId = host.playerId;
    this.players = {}; // { playerId: Player}
    this.addPlayer(host);
    setInterval(() => this.updatePositions(), DOWNLOAD_PERIOD)
  }

  addPlayer(player) {
    this.players[player.playerId] = player;
    this.emitPlayerAdded(player);
  }

  removePlayer(player) {
    // figure this out
  }

  update(freshData) {
    this.players[freshData.playerId].position = freshData.position;
  }

  emitPlayerAdded(player) {
    this.socket.emit('playerAdded', {
      roomId: this.roomId,
      player: player,
    });
  }
  updatePositions() {
    this.socket.emit('simulationUpdate', this.players);
  }
}

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

class ControlledPlayer extends Player {
  constructor(id) {
    super(id);
  }
}

module.exports = {
  Simulation,
  Room,
  Player,
  ControlledPlayer
}
