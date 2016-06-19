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

    client.on('clientPositionUpdate', data => {
      io.emit('enemyPositionUpdate', {
        x: Math.random()*5,
        y: Math.random()*5,
        z: Math.random()*5,
      });
    });

  });
}
