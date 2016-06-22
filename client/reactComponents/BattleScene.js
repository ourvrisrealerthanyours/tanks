import React from 'react';
import Arena from './Arena';
import PlayerTank from './PlayerTank';
import WallMixin from './WallMixin';
import Projectile from './Projectile';
import Enemy from './Enemy';
import EnemyTank from './EnemyTank';
import Player from './Player';
import uuid from 'uuid';

class BattleScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
    // playerId has to be initialized on client
    this.playerId = uuid.v4();
    props.socket.emit('createPlayer', this.playerId);
    props.socket.on('playerAdmittedToRoom', data => this.admitPlayersIntoRoom(data));
  }

  admitPlayersIntoRoom(admissionData) {
    if (admissionData.roomId === this.roomId) {
      let players = [...this.state.players, admissionData.playerId];
      this.setState({
        players: players
      });
    } else if (admissionData.playerId === this.playerId) {
      this.roomId = admissionData.roomId;
      this.setState({
        players: Object.keys(admissionData.players)
      });
    }
  }

  // componentDidMount() {
  //   var playerEl = document.querySelector('#tank');
  //   playerEl.addEventListener('collide', function (e) {
  //     console.log('Player has collided with body #' + e.detail.body.id);
  //
  //     e.detail.target.el;  // Original entity (playerEl).
  //     e.detail.body.el;    // Other entity, which playerEl touched.
  //     e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
  //     e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
  //   });
  // }

  renderPlayers () {
    // TODO: How do we map if two players per tank?
    return this.state.players.map(playerId => {
      if (playerId === this.playerId) {
        return (
          <PlayerTank key={playerId} 
          roomId={this.roomId} 
          role='driver'
          playerId={playerId}
          copilotPlayerId={undefined}/>
          // <Player key={playerId} 
          // roomId={this.roomId} 
          // playerId={playerId}/>
        )
      } else {
        return (
          <EnemyTank key={playerId} 
          roomId={this.roomId} 
          driverPlayerId={playerId}
          gunnerPlayerId={undefined}/>
          // <Enemy key={playerId}
          // roomId={this.roomId}
          // playerId={playerId}/>
        )
      }
    });
  }

  render () {
    return (
      <a-scene physics='debug:true'>
        <a-assets>
          <WallMixin height={8}/>
          <Projectile />
        </a-assets>

        <a-sky color='blue' />

        <Arena wallHeight={8}>
          {this.renderPlayers.call(this)}
        </Arena>

      </a-scene>
    )
  }
}

module.exports = BattleScene;
