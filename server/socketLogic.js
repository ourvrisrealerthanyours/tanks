const { rand } = require('../math/vectorHelpers');
const Simulation = require('../simulation/Simulation');
const Character = require('../simulation/Character');


module.exports = io => {
  const simulation = new Simulation(io);
  simulation.start();

  io.on('connection', client => {
    console.log('connected!');

    client.on('requestCharacters', () => {
      io.emit('roleUpdate', simulation.characters);
    });

    client.on('requestSeat', requestData => {
      const character = simulation.characters[requestData.characterId];
      if (!character || character[requestData.role]) {
        requestData.playerId = null;
      }
      io.emit('seatConfirmation', requestData);
    });

    client.on('characterUpdate', characterData => {
      simulation.update(characterData)
    });

    client.on('disconnect', data => {
      console.log('our client disconnected...');
      // essential to delete character
    });

    client.on('shotFired', data => {
      // console.log('SHOTS FIRED!!', data);
    })

  });
}
