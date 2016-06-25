import React from 'react';
import TankBody from './TankBody';
import Turret from './Turret';
import Barrel from './Barrel';
import { TANK_RADIUS } from '../../simulation/constants';

class PlayerDriver extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || `0 ${TANK_RADIUS} 0`;
    this.rotation = props.rotation || '0 0 0';
    this.socket = props.socket;
    this.compartmentWidth = 1.5;
    this.compartmentRadius = 0.8;
  }


  render () {
    return (
      <a-sphere id='playerTankContainer'
      material='opacity: 0;'
      position={this.position}
      kinematic-body={`radius: ${TANK_RADIUS}; height: ${TANK_RADIUS};`}
      data-emitter={`characterId: ${this.props.characterId}; simulationAttribute: position;`}
      death-listener={`characterId: ${this.props.characterId};`}
      forward-movement-controls='rotationElSelector: #tankBody;'
      rotation='0 0 0'>
        <a-entity id='tankBody'
        material='opacity: 0;'
        position={'0 0 0'}
        rotation={this.rotation}
        look-controls
        // universal-controls='movementEnabled: false; rotationControls: hmd, mouse;'
        // tank-controls
        data-emitter={`characterId: ${this.props.characterId}; simulationAttribute: tankRotation;`}>

          <Compartment
          compartmentWidth={this.compartmentWidth}
          compartmentRadius={this.compartmentRadius}
          material={this.props.material}/>

          <a-entity id='camera' position={`0 0 -1`}
          camera='near: 0.05;' />

        </a-entity>
        <a-sphere
        position={`0 ${TANK_RADIUS} 0`}
        material={this.props.material}
        radius='0.25'
        socket-controls={`characterId: ${this.props.characterId}; simulationAttribute: turretRotation`}>
          <Barrel
          position='0 0 0'
          characterId={this.props.characterId}
          material={this.props.material}/>
        </a-sphere>
      </a-sphere>
    )
  }
}

module.exports = PlayerDriver;

const Compartment = (props) => {
  return (
    <a-cylinder
    position='0 0 -1'
    rotation='0 0 90'
    height={props.compartmentWidth}
    radius={props.compartmentRadius}
    open-ended='true'
    theta-length='285' // Larger angle rotates hood over top of head
    theta-start='210'
    material={`side: back; ${props.material}`}>
      <a-ring
      position={`0 ${-props.compartmentWidth/2 + 0.01} 0`}
      rotation='90 0 0'
      radius-outer={props.compartmentRadius}
      radius-inner={props.compartmentRadius * 0.4}
      material={`side: double; ${props.material}`}/>
      <a-ring
      position={`0 ${props.compartmentWidth/2} 0`}
      rotation='90 0 0'
      radius-outer={props.compartmentRadius + 0.01}
      radius-inner={props.compartmentRadius * 0.4}
      material={`side: double; ${props.material}`}/>
    </a-cylinder>
  )
}
