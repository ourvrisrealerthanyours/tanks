import React from 'react';
import Arena from './Arena';
import Tank from './Tank';
import Turret from './Turret';
import WallMixin from './WallMixin';
import Projectile from './Projectile';
import Enemy from './Enemy';
import Player from './Player';
import extras from 'aframe-extras';
import uuid from 'uuid';

require('./../aframeComponents/tank-controls');
require('./../aframeComponents/kinematic-body');
require('./../aframeComponents/quick-rotate');
require('./../aframeComponents/spawner');
extras.physics.registerAll();

class TankScene extends React.Component {

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
      this.state.players.push(admissionData.playerId)
      this.setState({
        players: this.state.players
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

  render () {
    return (
      <a-scene physics='debug:true'>
        <a-assets>
          <WallMixin height={8}/>
          <Projectile />
        </a-assets>

        <a-sky color='blue' />

        <Arena wallHeight={8}>
          {/*<Tank socket={this.props.socket}/>*/}
          {this.state.players.map(playerId => {
            if (playerId === this.playerId) {
              return <Player key={playerId} roomId={this.roomId} playerId={playerId}/>
            } else {
              return <Enemy key={playerId} roomId={this.roomId} playerId={playerId}/>
            }
          })}
        </Arena>

      </a-scene>
    )
  }
}

module.exports = TankScene;
