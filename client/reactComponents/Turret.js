import React from 'react';
import Barrel from './Barrel';

class Turret extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 0 0';
    this.rotation = props.rotation || '0 0 0';
    this.barrelLength = props.barrelLength || 5;
    this.activeControl = props.activeControl || false;
    this.socket = props.socket;
  }

  render () {
    if (this.activeControl) {
      return (
        <a-entity class='turretContainer' position={this.position}>
          <a-sphere // Turret
          id={this.props.turretId}
          position={`0 0 0`}
          rotation={this.rotation}
          material={this.props.material}
          look-controls
          data-emitter={`characterId: ${this.props.characterId}; simulationAttribute: turretRotation;`}
          radius={1.5}>
            <a-entity id='camera'
            position={`0 1 0`}
            camera='near: 0.05'/>
            <Barrel
            position='0 0 0'
            characterId={this.props.characterId}
            fireEvent='on: click'
            material={this.props.material}/>
          </a-sphere>
        </a-entity>
      )
    } else {
      return (
        <a-entity class='turretContainer' position={this.position}>
          <a-sphere
          position={'0 0 0'}
          rotation={this.rotation}
          socket-controls={`characterId: ${this.props.characterId}; simulationAttribute: turretRotation`}
          material={this.props.material}
          radius={1.5}>
            <Barrel
            position='0 0 0'
            characterId={this.props.characterId}
            // fireEvent='on: click; callback:handleClick;'
            material={this.props.material}/>
          </a-sphere>
        </a-entity>
      )
    }
  }
}

module.exports = Turret;
