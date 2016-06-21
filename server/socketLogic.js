const { rand } = require('../math/vectorHelpers');

module.exports = io => {
  io.on('connection', client => {
    console.log('connected!');
    // Set Up
    client.on('createRoom', data => {
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


    client.on('disconnect', data => {
      console.log('our client disconnected...');
    });

    client.on('enterRoom', socketId => {
      console.log(`Socket ID ${socketId} just entered the room`);
      // Do some stuff to put them in the room
      io.emit('confirmEnterRoom', {
        id: socketId,
        role: 'turret',
      });
    });

    const enemyPosition = { x: 0, y:2, z:0 };

    client.on('clientPositionUpdate', data => {
      enemyPosition.x += rand(-10, 10);
      enemyPosition.x = Math.max(Math.min(enemyPosition.x, 100), -100);

      enemyPosition.z += rand(-10, 10);
      enemyPosition.z = Math.max(Math.min(enemyPosition.z, -1), -100);
      console.log('got deets from client:', data)

      io.emit('enemyPositionUpdate', enemyPosition);
    });

    client.on('shotFired', data => {
      console.log('SHOTS FIRED!!', data);
    })

  });
}
