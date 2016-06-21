import React from 'react';
import Arena from './Arena';
import Tank from './Tank';
import PlayerDriver from './PlayerDriver';
import PlayerTurret from './PlayerTurret';
import Turret from './Turret';
import WallMixin from './WallMixin';
import Projectile from './Projectile';
import EnemyTarget from './EnemyTarget';

class BattleScene extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var playerEl = document.querySelector('#tank');
    playerEl.addEventListener('collide', function (e) {
      console.log('Player has collided with body #' + e.detail.body.id);

      e.detail.target.el;  // Original entity (playerEl).
      e.detail.body.el;    // Other entity, which playerEl touched.
      e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
      e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
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
          <PlayerTurret socket={this.props.socket}/>
        </Arena>

      </a-scene>
    )
  }
}

module.exports = BattleScene;
