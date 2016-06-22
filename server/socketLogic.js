const { rand } = require('../math/vectorHelpers');
const Simulation = require('../simulation/Simulation');
const Room = require('../simulation/Room');
const Player = require('../simulation/Player');


module.exports = io => {
  const simulation = new Simulation(io);
  io.on('connection', client => {
    console.log('connected!');

    client.on('createPlayer', playerId => {
      const newPlayer = new Player(playerId);
      // currently there can only be one room. Ideally the data passed with this 
      // event would include a roomId if they were joining one, and no room Id if
      // they were creating one
      let firstRoom = simulation.getFirstRoom();
      if (firstRoom) {
        firstRoom.addPlayer(newPlayer);
        console.log('player ', newPlayer.playerId, ' joined room ', firstRoom.roomId);
      } else {
        firstRoom = simulation.createRoom(newPlayer);
        console.log('player ', newPlayer.playerId, ' created room ', firstRoom.roomId);
      }
      io.emit('playerAdmittedToRoom', {
        playerId: newPlayer.playerId,
        roomId: firstRoom.roomId,
        players: firstRoom.players,
      });
    });

    client.on('createRoom', roomInfo => {
      simulation.addRoom()
      // data has:
        // room number
        // user id? name?
        // role (driver)?

    });

    client.on('joinRoom', data => {
      // data has:
        // room number
        // user id? name?
        // role (driver)?
    });

    client.on('chooseRole', data => {
      // data has:
        // tankId
        // role
        // playerId?
    });

    client.on('playerUpdate', playerData => {
      // console.log('playerData', playerData);
      simulation.update(playerData)
    });



    client.on('disconnect', data => {
      console.log('our client disconnected...');
      // essential to delete player and room
    });

    client.on('enterRoom', socketId => {
      // console.log(`Socket ID ${socketId} just entered the room`);
      // // Do some stuff to put them in the room
      // io.emit('confirmEnterRoom', {
      //   id: socketId,
      //   role: 'turret',
      // });
    });

    client.on('shotFired', data => {
      // console.log('SHOTS FIRED!!', data);
    })

  });
}
