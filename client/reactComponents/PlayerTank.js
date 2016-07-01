import React from 'react';
import HeadsUpDisplay from './HeadsUpDisplay';
import PlayerDriver from './PlayerDriver';
import TankBody from './TankBody';
import Turret from './Turret';
import Barrel from './Barrel';
import { rand } from '../../math/vectorHelpers';
import { TANK_RADIUS } from '../../simulation/constants';

class PlayerTank extends React.Component {

  constructor(props) {
    super(props);
    this.rotation = props.rotation || '0 0 0';
    this.radius = TANK_RADIUS;
    this.socket = props.socket;
    this.character = props.character;
    this.characterId = props.character.characterId;
  }

  renderAsDriver() {
    return (
      <PlayerDriver
      socket={this.props.socket}
      position={this.props.position}
      rotation={this.rotation}
      role={this.props.role}
      characterId={this.characterId}
      isTouch={this.props.isTouch}
      material={this.props.material}/>
    );
  }

  renderAsGunner() {
    return (
      <a-entity
      position={this.props.position}
      kinematic-body={`radius: ${this.radius}; height: ${this.radius};`}
      characterId={this.characterId}
      socket-controls={`characterId: ${this.characterId}; simulationAttribute: position`}>
        <TankBody
        characterId={this.characterId}
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
        isTouch={this.props.isTouch}
        characterId={this.characterId}
        position={'0 2.75 0'}
        material={this.props.material}
        socket={this.props.socket}/>
      </a-entity>
    );
  }

  renderSeat() {
    return this.props.role === 'driver' ? this.renderAsDriver() : this.renderAsGunner();
  }

  renderHUD() {
    return (
      <HeadsUpDisplay
      character={this.character}/>
    );
  }


  render() {
    return (
      <a-entity>
        {this.renderHUD()}
        {this.renderSeat()}
      </a-entity>
    );
  }
}

module.exports = PlayerTank;
