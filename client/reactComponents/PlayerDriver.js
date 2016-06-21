import React from 'react';
import TankBody from './TankBody';
import Barrel from './Barrel';

class PlayerDriver extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 3 0';
    this.rotation = props.rotation || '0 0 0';
    this.socket = props.socket;
    this.state = {
      turretAngle: '0 0 0'
    }
    this.compartmentWidth = 1.5;
    this.compartmentRadius = 0.8;
  }

  componentDidMount() {
    if(this.socket) {
      this.tank = document.querySelector('#tank').object3D.el;
      setInterval(() => {
        let position = this.tank.getAttribute('position');
        let rotation = this.tank.getAttribute('rotation');
        this.socket.emit('clientPositionUpdate', {
          user:'NOT SET', 
          role: 'driver',
          tankNo: 'NOT SET',
          position: position,
          rotation: rotation
        });
      }, 1000)
    }
    // setInterval(() => {
    //   this.setState({
    //     turretAngle: `0 ${Math.random() * 60 - 30} 0`
    //   })
    // }, 1000)
  }

  render () {
    return (
      <a-entity position='0 0 0' rotation='0 0 0'>
        <a-entity id='tank' material='opacity: 0;'
        position={this.position} rotation={this.rotation}
        tank-controls
        kinematic-body='enableSlopes: false'>

          <Compartment 
          compartmentWidth={this.compartmentWidth} 
          compartmentRadius={this.compartmentRadius}/>

          <a-entity id='camera' position={`0 0 -1`}
          camera='near: 0.05;' look-controls />

          <Barrel 
          position='0 2 0'
          rotation={this.state.turretAngle}
          material={'color:red;'} 
          barrelLength={6} />
        </a-entity>
      </a-entity>
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
    material='side: back; color: red;'>
      <a-ring
      position={`0 ${-props.compartmentWidth/2 + 0.01} 0`}
      rotation='90 0 0'
      radius-outer={props.compartmentRadius}
      radius-inner={props.compartmentRadius * 0.4}
      material='side:double; color: red;'/>
      <a-ring
      position={`0 ${props.compartmentWidth/2} 0`}
      rotation='90 0 0'
      radius-outer={props.compartmentRadius + 0.01}
      radius-inner={props.compartmentRadius * 0.4}
      material='side:double; color: red;'/>
    </a-cylinder>
  )
}
