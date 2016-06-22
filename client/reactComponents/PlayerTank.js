import React from 'react';
import PlayerDriver from './PlayerDriver';
import TankBody from './TankBody';
import Turret from './Turret';
import Barrel from './Barrel';

class PlayerTank extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 3 0'; // TODO: reason for floating?
    this.rotation = props.rotation || '0 0 0';
    this.socket = props.socket;
    this.state = {
      turretAngle: '0 0 0',
      position: this.position,
      rotation: this.rotation,
    }
  }


  componentDidMount() {
    if(this.socket && this.props.control === 'body') {
      this.tank = document.querySelector('#tankBody').object3D.el;

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
      }, 1000);

      // Set turret angle to simulate state changes coming from socket:
      setInterval(() => {
        this.setState({
          turretAngle: `0 ${Math.random() * 60 - 30} 0`
        })
      }, 1000)

    } else if(this.socket && this.props.control === 'turret') {
      this.camera = document.querySelector('#camera').object3D.el;
      window.socket = this.socket;

      setInterval(() => {
        let rotation = this.camera.getAttribute('rotation');
        this.socket.emit('clientPositionUpdate', {
          user:'NOT SET', 
          role: 'turret',
          tankNo: 'NOT SET',
          rotation: rotation,
          absRotation: 'NOT SET'
        });
      }, 1000)
      
      // Set tank position to simulate state changes coming from socket:
      setInterval(() => {
        const positionArr = this.state.position.split(' ');
        const rotationArr = this.state.rotation.split(' ');
        positionArr[2] = Number(positionArr[2]) + 1;
        rotationArr[2] = Number(rotationArr[2]) + 1;
        this.setState({
          position: positionArr.join(' '),
          rotation: rotationArr.join(' ')
        });
        // console.log('changed:', this.state.position, this.state.rotation)
      }, 50)

    }
 
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({
  //       turretAngle: Math.random() * 60 - 30
  //     })
  //   }, 1000)
  // }

  render () {
    if(this.props.control === 'body') {
      return (
        <PlayerDriver 
        socket={this.props.socket}
        position={this.position}
        rotation={this.rotation}>
          <Barrel 
          position='0 2 0'
          rotation={this.state.turretAngle}
          material={'color:red;'} 
          barrelLength={6} />
        </PlayerDriver>
      )
    } else if(this.props.control === 'turret') {
      console.log('PT', this.state.position);
      return (
        <a-entity position='0 0 0' rotation='0 0 0'>
          <TankBody
          position={this.state.position}
          rotation={this.state.rotation}
          socket={this.props.socket}>
            <Turret
            activeControl={true}
            position={'0 2.75 0'}
            socket={this.props.socket}/>
          <a-cone
          position='0 0 -5'
          rotation='-90 0 0'
          radius-top='0'
          radius-bottom='0.25'
          height='1'
          material='color: blue; opacity: 0.5;'/>
          </TankBody>
        </a-entity>
      );
    } 
  }
}

module.exports = PlayerTank;
