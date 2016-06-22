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
  }

  render () {
    if(this.props.role === 'driver') {
      return (
        <PlayerDriver 
        socket={this.props.socket}
        position={this.position}
        rotation={this.rotation}
        playerId={this.props.playerId}
        roomId={this.props.roomId}>
          <Barrel 
          position='0 2 0'
          material={'color:red;'} 
          barrelLength={6} 
          fireEvent='on: click; callback:handleClick;' 
          socket={this.props.socket}
          copilotPlayerId={this.props.copilotPlayerId}/>
        </PlayerDriver>
      )
    } else if(this.props.role === 'gunner') {
      return (
        <a-entity position='0 0 0' rotation='0 0 0'>
          <TankBody
          position={this.state.position}
          rotation={this.state.rotation}
          socket={this.props.socket}
          playerId={this.props.copilotPlayerId}>
            <Turret
            activeControl={true}
            playerId={this.props.playerId}
            position={'0 2.75 0'}
            socket={this.props.socket}
            roomId={this.props.roomId}/>
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
