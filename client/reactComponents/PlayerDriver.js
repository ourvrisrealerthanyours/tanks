import React from 'react';
import TankBody from './TankBody';
import Turret from './Turret';

class PlayerDriver extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 2.6 0';
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
      kinematic-body='radius: 2.5; height:2.5;'
      data-emitter={`characterId: ${this.props.characterId}; simulationAttribute: position;`}
      rotation='0 0 0'>
        <a-entity id='tankBody'
        material='opacity: 0;'
        position={'0 0 0'}
        rotation={this.rotation}
        // universal-controls
        tank-controls
        data-emitter={`characterId: ${this.props.characterId}; simulationAttribute: tankRotation;`}>

          <Compartment
          compartmentWidth={this.compartmentWidth}
          compartmentRadius={this.compartmentRadius}
          material={this.props.material}/>

          <a-entity id='camera' position={`0 0 -1`}
          camera='near: 0.05;' />

        </a-entity>
        <Turret
        position={`0 ${this.radius - 0.5} 0`}
        rotation={this.turretAngle}
        material={this.props.material}
        socket={this.props.socket}
        characterId={this.props.characterId}/>
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
