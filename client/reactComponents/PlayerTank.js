import React from 'react';
import PlayerDriver from './PlayerDriver';
import TankBody from './TankBody';
import Turret from './Turret';
import Barrel from './Barrel';
import { rand } from '../../math/vectorHelpers';

class PlayerTank extends React.Component {

  constructor(props) {
    super(props);
    this.rotation = props.rotation || '0 0 0';
    this.radius = 2.5;
    this.socket = props.socket;
  }

  render () {
    if(this.props.role === 'driver') {
      return (
        <PlayerDriver
        socket={this.props.socket}
        position={this.props.position}
        rotation={this.rotation}
        role={this.props.role}
        characterId={this.props.characterId}
        material={this.props.material}/>
      )
    } else if(this.props.role === 'gunner') {
      return (
        <a-entity 
        position={this.props.position} 
        kinematic-body={`radius: ${this.radius}; height: ${this.radius};`}
        socket-controls={`characterId: ${this.props.characterId}; controlledAttribute: position; simulationAttribute: position`}>
          <TankBody
          characterId={this.props.characterId}
          position={this.props.position}
          material={this.props.material}
          rotation={this.rotation}
          socket={this.props.socket}>
            <a-cone
            position='0 0 -5'
            rotation='-90 0 0'
            radius-top='0'
            radius-bottom='0.25'
            height='1'
            material='color: blue; opacity: 0.5;'/>
          </TankBody>
          <Turret
          activeControl={true}
          role={this.props.role}
          characterId={this.props.characterId}
          position={'0 2.75 0'}
          material={this.props.material}
          socket={this.props.socket}/>
        </a-entity>
      );
    }
  }
}

module.exports = PlayerTank;
