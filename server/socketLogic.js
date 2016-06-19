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
      // look into this
    });

    client.on('mango', data => {
      // look into this
      console.log('What are mangos?:', data.are);
    });

  });
}
