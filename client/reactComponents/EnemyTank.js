import React from 'react';
import Turret from './Turret';
import TankBody from './TankBody';

class EnemyTank extends React.Component {

  constructor(props) {
    super(props);
    this.radius = 2.5;
    this.rotation = props.rotation || '0 0 0';
    this.turretAngle = props.turretAngle || '0 0 0';
    this.material = props.material || 'color: red;'
  }

  render () {
    // TODO: Figure out why kinematic-body radius isn't working
    // (making 1.2 height necessary to be flush with ground)
    // TODO: Add flash component for when shooting
    return (
      <a-entity 
      position={this.props.position} 
      kinematic-body={`radius: ${this.radius}; height: ${this.radius}`}
      socket-controls={`characterId: ${this.props.characterId}; controlledAttribute: position; simulationAttribute: position`}>
        <TankBody
        radius={this.radius}
        material={this.props.material} 
        rotation={this.rotation}
        socket={this.props.socket}
        characterId={this.props.characterId}/>
        <Turret
        position={`0 ${this.radius - 0.5} 0`}
        rotation={this.turretAngle}
        material={this.props.material}
        socket={this.props.socket}
        characterId={this.props.characterId}/>
      </a-entity>
    )
  }
}

module.exports = EnemyTank;
