import React from 'react';
import Turret from './Turret';
import TankBody from './TankBody';
import LifeBar from './LifeBar';
import { TANK_RADIUS } from '../../simulation/constants';

class EnemyTank extends React.Component {

  constructor(props) {
    super(props);
    this.radius = TANK_RADIUS;
    this.rotation = props.rotation || '0 0 0';
    this.turretAngle = props.turretAngle || '0 0 0';
    this.material = props.material || 'color: red;'
    this.characterId = props.character.characterId;
  }

  render () {
    // TODO: Add flash component for when shooting
    return (
      <a-entity>
        <a-entity
        position={this.props.position}
        kinematic-body={`radius: ${this.radius}; height: ${this.radius}`}
        characterId={this.characterId}
        socket-controls={`characterId: ${this.characterId}; simulationAttribute: position`}>
          <TankBody
          radius={this.radius}
          material={this.props.material}
          rotation={this.rotation}
          socket={this.props.socket}
          characterId={this.characterId}/>
          <Turret
          position={`0 ${this.radius - 0.5} 0`}
          rotation={this.turretAngle}
          material={this.props.material}
          socket={this.props.socket}
          characterId={this.characterId}/>
        </a-entity>
        <LifeBar
        character={this.props.character}
        position={`0 ${this.radius + 2} 0`}/>
      </a-entity>
    )
  }
}

module.exports = EnemyTank;
