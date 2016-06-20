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

    client.on('mango', data => {
      console.log('What are mangos?:', data.are);
    });

    const enemyPosition = { x: 0, y:2, z:0 };

    client.on('clientPositionUpdate', data => {
      enemyPosition.x += rand(-10, 10);
      enemyPosition.x = Math.max(Math.min(enemyPosition.x, 100), -100);

      enemyPosition.z += rand(-10, 10);
      enemyPosition.z = Math.max(Math.min(enemyPosition.z, -1), -100);

      io.emit('enemyPositionUpdate', enemyPosition);
    });

  });
}
