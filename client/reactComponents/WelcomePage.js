import React from 'react';
import TankScene from './TankScene';
const uuid = require('uuid');
const io = require('socket.io-client/socket.io');
const server = 'http://localhost:8080'; // change for production

class WelcomePage extends React.Component {

  constructor(props) {
    super(props);
    this.socket = io.connect(server);
    window.socket = this.socket; // figure out a better way for everyone to have access to this socket
    window.uuid = uuid.v4();
  }

  componentDidMount() {
  }

  render () {
    return (
      <TankScene socket={this.socket}/>
    )
  }
}

module.exports = WelcomePage;
