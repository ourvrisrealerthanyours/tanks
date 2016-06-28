import React from 'react';
import BattleScene from './BattleScene';
import JoinGameScene from './JoinGameScene';
import WallMixin from './WallMixin';
import Projectile from './Projectile';

const io = require('socket.io-client/socket.io');
const server = 'http://localhost:8080'; // change for production

class WelcomePage extends React.Component {

  constructor(props) {
    super(props);
    this.roomId = '0';
    this.socket = io.connect(server);
    window.socket = this.socket; // figure out a better way for everyone to have access to this socket

    this.socket.on('assignPlayerId', (playerId) => {
      this.setState({ playerId });
      window.playerId = this.state.playerId;
    });

    this.socket.on('roleUpdate', characters => {
      this.setState({ characters });
    });

    this.state = {
      scene: 'joinGame',
      characterId: undefined,
      charcters: {},
      playerId: undefined,
      role: undefined
    };
  }

  changeScene(nextScene, characterId, role) {
    this.setState({
      scene: nextScene,
      characterId,
      role,
    });
  }

  renderScene() {
    if(this.state.scene === 'joinGame') {
      return (
        <JoinGameScene
        socket={this.socket}
        playerId={this.state.playerId}
        characters={this.state.characters}
        enterBattle={this.changeScene.bind(this, 'battleMode')}
        />
      )
    } else if (this.state.scene === 'battleMode') {
      return (
        <BattleScene
        socket={this.socket}
        playerId={this.state.playerId}
        role={this.state.role}
        characters={this.state.characters}
        characterId={this.state.characterId}
        reset={this.changeScene.bind(this, 'joinGame')}/>
      )
    }
  }

  render () {
    return (
      <a-scene id='scene' physics='debug:false' vr-mode-ui='enabled: false'>
        <a-assets>
          <WallMixin height={8}/>
          <Projectile />
        </a-assets>
        <a-entity light='type: directional; color: #EEE; intensity: 1.0' position='-1 1 0'/>
        <a-entity light='type: hemisphere; color: #222; groundColor: #555; intensity: 2'/>

        {this.renderScene.call(this)}

      </a-scene>
    )
  }

}

module.exports = WelcomePage;
