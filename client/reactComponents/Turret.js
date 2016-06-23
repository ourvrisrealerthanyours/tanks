import React from 'react';
import Barrel from './Barrel';

class Turret extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 0 0';
    this.rotation = props.rotation || '0 0 0';
    this.barrelLength = props.barrelLength || 5;
    this.activeControl = props.activeControl || false;
    this.material = props.material || 'color: red;';
    this.socket = props.socket;
  }

  render () {
    if (this.activeControl) {
      return (
        <a-entity class='turretContainer' position={this.position}>
          <a-sphere // Turret
          id={this.props.turretId}
          position={`0 0 0`}
          rotation='0 0 0'
          material={this.material}
          radius={1.5}>
            <a-entity id='camera' class='turret'
            position={`0 1 0`}
            rotation={this.rotation}
            camera='near: 0.05'
            look-controls
            data-emitter={`role: ${this.props.role}; characterId: ${this.props.characterId}`}>
              <Barrel
              position='0 -1 0'
              characterId={this.props.characterId}
              fireEvent='on: click'
              material={this.material}/>
            </a-entity>
          </a-sphere>
        </a-entity>
      )
    } else {
      return (
        <a-entity class='turretContainer' position={this.position}>
          <a-sphere class='turret'
          id={this.props.turretId}
          position={`0 0 0`}
          rotation={this.rotation}
          material={this.material}
          radius={1.5}>
            <Barrel
            position='0 0 0'
            characterId={this.props.characterId}
            // fireEvent='on: click; callback:handleClick;'
            material={this.material}/>
          </a-sphere>
        </a-entity>
      )
    }
  }
}

module.exports = Turret;
