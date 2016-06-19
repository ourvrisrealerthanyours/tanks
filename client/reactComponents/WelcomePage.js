import React from 'react';
import TankScene from './TankScene';
const io = require('socket.io-client/socket.io');
const server = 'http://localhost:3000'; // change for production

class WelcomePage extends React.Component {

  constructor(props) {
    super(props);
    this.socket = io.connect(server);
  }

  componentDidMount() {
    this.socket.emit('mango', { are: 'Delicious' });
  }

  render () {
    return (
      <TankScene socket={this.socket}/>
    )
  }
}

module.exports = WelcomePage;
