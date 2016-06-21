import React from 'react';
// import TankBody from './TankBody';
// import Turret from './Turret';
import Barrel from './Barrel';

class PlayerTurret extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 3 0'; // TODO: reason for floating?
    this.rotation = props.rotation || '0 0 0';
    this.state = {
      tankPosition: this.position,
      tankRotation: this.rotation
    }
  }

  render () {
    return (
      <a-entity id='tank' position='0 0 0' rotation='0 0 0'>
        <TankBody
        position={this.state.position} // TODO: Interpolate tank body
        rotation={this.state.rotation}
        material='color:red;'>
          <Turret position={'0 2.75 0'} radius={2.5} material='color:red;'/>
        </TankBody>
      </a-entity>
    );
  }
}

module.exports = PlayerTurret;

const Turret = (props) => {
  return (
    <a-entity id='turret' position={props.position}>
      <a-sphere position={`0 ${props.radius - 0.5} 0`}
      rotation='0 0 0' 
      material={props.material}
      radius={1.5} />
      <a-entity id='camera' position={`0 1 0`} 
      rotation={props.rotation}
      camera='near: 0.05' look-controls >
        <Barrel position='0 -1 0' active={true}/>
      </a-entity>
    </a-entity>
  )
}

const TankBody = (props) => {
  return (
    <a-sphere // Body
    position={props.position}
    rotation={props.rotation}
    material={props.material}
    radius={props.radius}>
      <a-torus
      position='0 0 0'
      rotation='90 0 0'
      material={props.material}
      radius={props.radius}
      radius-tubular={0.1}/>

      <a-sphere // Windows
      position={`0 0.6 ${0.4 - props.radius}`}
      radius='0.5'
      scale='2.5 1 1.5'
      material='color:black; opacity:0.4;'/>
      <a-sphere
      position={`${-(props.radius - 0.5)} 0.6 -1`}
      radius='0.4'
      material='color:black; opacity:0.4;'/>
      <a-sphere
      position={`${props.radius - 0.5} 0.6 -1`}
      radius='0.4'
      material='color:black; opacity:0.4;'/>

      {props.children}

    </a-sphere>
  )
}

window.handleClick = () => {
  var camera = document.querySelector('#camera').object3D.el;
  window.socket.emit('shotFired', {
    user: 'NOT SET',
    tankNo: 'NOT SET',
    rotation: camera.getAttribute('rotation'),
    tankVel: 'NOT SET',
    absRotation: 'NOT SET'
  });
}
