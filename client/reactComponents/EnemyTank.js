import React from 'react';
import Turret from './Turret';
import TankBody from './TankBody';

class EnemyTank extends React.Component {

  constructor(props) {
    super(props);
    this.radius = 2.5;
    this.position = props.position || `0 ${this.radius} 0`;
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
        position={this.state.position}
        rotation={this.state.rotation}
        material={this.material}
        socket={this.props.socket}
        socket-controls={`playerId: ${this.props.driverPlayerId}`}>
          <Turret
          position={`0 ${this.radius - 0.5} 0`}
          rotation={this.state.turretAngle} 
          material={this.material}
          socket={this.props.socket}
          socket-controls={`playerId: ${this.props.gunnerPlayerId}`}/>
        </TankBody>
      </a-entity>
    )
  }
}

module.exports = EnemyTank;
