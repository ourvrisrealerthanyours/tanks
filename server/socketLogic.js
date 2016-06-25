const { rand } = require('../math/vectorHelpers');
const Simulation = require('../simulation/Simulation');
const Character = require('../simulation/Character');


module.exports = io => {
  const simulation = new Simulation(io);
  simulation.start();

  io.on('connection', client => {
    console.log('Client', client.id, 'connected');
    io.to(client.id).emit('assignPlayerId', client.id);

    client.on('requestPlayerId', () => {
      io.to(client.id).emit('assignPlayerId', client.id);
    })

    client.on('requestCharacters', () => {
      console.log('line 19');
      io.to(client.id).emit('roleUpdate', simulation.characters);
    });

    client.on('requestSeat', requestData => {
      const character = simulation.characters[requestData.characterId];
      if (!character || character[requestData.role]) {
        io.to(client.id).emit('seatConfirmation', false);
      } else {
        io.to(client.id).emit('seatConfirmation', {
          characterId: requestData.characterId,
          role: requestData.role
        });
        simulation.updateCharacterRoles(requestData.characterId, requestData.role, requestData.playerId);
        io.emit('roleUpdate', simulation.characters);
      }
    });

    client.on('characterUpdate', characterData => {
      simulation.update(characterData)
    });

    client.on('disconnect', data => {
      console.log(`Client ${client.id} disconnected...`);
      simulation.removePlayer(client.id);
      client.broadcast.emit('roleUpdate', simulation.characters);
    });

    client.on('shotFired', projectileData => {
      client.broadcast.emit('shotFired', projectileData);
    });

    client.on('shotHit', collisionDetails => {
      // TODO: hit tanks that are nearby
      // TODO: include amount of damage to apply
      const hitCharacterId = collisionDetails.hitCharacterId;
      const firedCharacterId = collisionDetails.firedCharacterId;
      if(hitCharacterId) {
        const remainingHealth = simulation.registerHit(hitCharacterId);
        io.emit('shotHit', {
          characterId: hitCharacterId,
          remainingHealth
        });
      }
    });

  });
}
