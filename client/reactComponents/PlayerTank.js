import React from 'react';
import PlayerDriver from './PlayerDriver';
import TankBody from './TankBody';
import Turret from './Turret';
import Barrel from './Barrel';
import { rand } from '../../math/vectorHelpers';

class PlayerTank extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || `${rand(-100, 100)} 3 ${rand(-100, 100)}`;
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
        role={this.props.role}
        characterId={this.props.characterId}
        roomId={this.props.roomId}>
          <Barrel
          position='0 2 0'
          material={'color:red;'}
          barrelLength={6}
          socket={this.props.socket}
          characterId={this.props.characterId}/>
        </PlayerDriver>
      )
    } else if(this.props.role === 'gunner') {
      return (
        <a-entity position='0 0 0' rotation='0 0 0'>
          <TankBody
          characterId={this.props.characterId}
          position={this.position}
          rotation={this.rotation}
          socket={this.props.socket}>
            <Turret
            activeControl={true}
            role={this.props.role}
            characterId={this.props.characterId}
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
