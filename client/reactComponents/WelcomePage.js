import React from 'react';
import BattleScene from './BattleScene';
import JoinGameScene from './JoinGameScene';
const uuid = require('uuid');
const io = require('socket.io-client/socket.io');
const server = 'http://localhost:8080'; // change for production

class WelcomePage extends React.Component {

  constructor(props) {
    super(props);
    this.socket = io.connect(server);
    window.socket = this.socket; // figure out a better way for everyone to have access to this socket
    window.uuid = uuid.v4();
    this.state = {
      scene: 'joinGame'
    };
  }

  changeScene(nextScene) {
    this.setState({
      scene: nextScene
    });
  }

  render () {
    if(this.state.scene === 'joinGame') {
      return (
        <JoinGameScene socket={this.socket}
        enterBattle={this.changeScene.bind(this, 'battleMode')}/>
      )
    } else if (this.state.scene === 'battleMode') {
      return (
        <BattleScene socket={this.socket}/>
      )
    }
  }
}

module.exports = WelcomePage;
