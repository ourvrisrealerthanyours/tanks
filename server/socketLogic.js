const { rand } = require('../math/vectorHelpers');
const Simulation = require('../simulation/Simulation');
const Room = require('../simulation/Room');
const Character = require('../simulation/Character');


module.exports = io => {
  const simulation = new Simulation(io);
  io.on('connection', client => {
    console.log('connected!');

    client.on('createCharacter', characterId => {
      const newCharacter = new Character(characterId);
      // currently there can only be one room. Ideally the data passed with this
      // event would include a roomId if they were joining one, and no room Id if
      // they were creating one
      let firstRoom = simulation.getFirstRoom();
      if (firstRoom) {
        firstRoom.addCharacter(newCharacter);
        console.log('character ', newCharacter.characterId, ' joined room ', firstRoom.roomId);
      } else {
        firstRoom = simulation.createRoom(newCharacter);
        console.log('character ', newCharacter.characterId, ' created room ', firstRoom.roomId);
      }
      io.emit('characterAdmittedToRoom', {
        characterId: newCharacter.characterId,
        roomId: firstRoom.roomId,
        characters: firstRoom.characters,
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
        // character?
    });

    client.on('characterUpdate', characterData => {
      simulation.update(characterData)
    });



    client.on('disconnect', data => {
      console.log('our client disconnected...');
      // essential to delete character and room
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
