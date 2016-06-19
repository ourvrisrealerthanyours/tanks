import React from 'react';
import TankScene from './TankScene';
const io = require('socket.io-client/socket.io');
const server = 'http://localhost:3000'; // change for production

class WelcomePage extends React.Component {

  constructor(props) {
    super(props);
    this.socket = io.connect(server);
    window.socket = this.socket; // figure out a better way for everyone to have
                                 //access to this socket
  }

  componentDidMount() {
    this.socket.emit('mango', { are: 'Delicious' });
    this.socket.on('pie', favPie => {
      console.log('my favorite kind of pie is ' + favPie);
    })
  }

  render () {
    return (
      <TankScene socket={this.socket}/>
    )
  }
}

module.exports = WelcomePage;
