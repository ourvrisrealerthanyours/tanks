import React from 'react';
import Turret from './Turret';
import TankBody from './TankBody';

class EnemyTank extends React.Component {

  constructor(props) {
    super(props);
    this.radius = 2.5;
    this.position = props.position || `0 ${this.radius + 0.1} 0`;
    this.rotation = props.rotation || '0 0 0';
    this.turretAngle = props.turretAngle || '0 0 0';
    this.material = props.material || 'color: red;'
  }

  render () {
    // TODO: Figure out why kinematic-body radius isn't working
    // (making 1.2 height necessary to be flush with ground)
    // TODO: Add flash component for when shooting
    return (
      <a-entity position='0 0 0' rotation='0 0 0'>
        <TankBody class='enemyTank'
        bodyId={this.props.bodyId}
        position={this.position}
        rotation={this.rotation}
        radius={this.radius}
        material={this.material}
        socket={this.props.socket}
        characterId={this.props.characterId}>
          <Turret
          turretId={this.props.turretId}
          position={`0 ${this.radius - 0.5} 0`}
          rotation={this.turretAngle}
          material={this.material}
          socket={this.props.socket}
          characterId={this.props.characterId}/>
        </TankBody>
      </a-entity>
    )
  }
}

module.exports = EnemyTank;
