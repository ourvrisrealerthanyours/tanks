import React from 'react';
import Arena from './Arena';
import Tank from './Tank';
import Turret from './Turret';
import WallMixin from './WallMixin';
import Projectile from './Projectile';
import Enemy from './Enemy';
import Player from './Player';
import extras from 'aframe-extras';

require('./../aframeComponents/tank-controls');
require('./../aframeComponents/kinematic-body');
require('./../aframeComponents/quick-rotate');
require('./../aframeComponents/spawner');
extras.physics.registerAll();

class TankScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enemies: [],
    };
    window.socket.on('playerAdmittedToRoom', admissionData => {
      if (admissionData.roomId === window.roomId) {
        this.state.enemies.push(admissionData.player)
        this.setState({
          enemies: this.state.enemies
        });
      }
    })
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
          <Player socket={this.props.socket}/>
          {this.state.enemies.map(player => <Enemy key={player.playerId} playerId={player.playerId}/>)}
        </Arena>

      </a-scene>
    )
  }
}

module.exports = TankScene;
