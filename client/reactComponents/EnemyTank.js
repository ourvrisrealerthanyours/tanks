import React from 'react';
import Barrel from './Barrel';

class EnemyTank extends React.Component {

  constructor(props) {
    super(props);
    this.radius = 2.5;
    this.position = props.position || `0 ${this.radius} 0`;
    this.rotation = props.rotation || '0 0 0';
    this.turretAngle = props.turretAngle || '0 0 0';
    this.material = props.material || 'color: red;'
    this.state = {
      position: this.position,
      rotation: this.rotation,
      turretAngle: this.turretAngle,
    }
  }

  render () {
    // TODO: Figure out why kinematic-body radius isn't working 
    // (making 1.2 height necessary to be flush with ground)
    // TODO: Add flash component for when shooting
    return (
      <a-entity position='0 0 0' rotation='0 0 0'>
        <a-sphere class='enemyTank'
        kinematic-body
        material='opacity: 0;'
        position={this.state.position}
        rotation='0 0 0'
        radius={this.radius}>
          <a-sphere // Body
          position='0 0 0'
          rotation={this.rotation}
          material={this.material}
          radius={this.radius}>
            <a-torus
            position='0 0 0'
            rotation='90 0 0'
            material={this.material}
            radius={this.radius}
            radius-tubular={0.1}/>

            <a-sphere // Turret
            position={`0 ${this.radius - 0.5} 0`}
            rotation='0 0 0' 
            material={this.material}
            radius={1.5}>
              <Barrel material={this.material} 
              barrelLength={6} 
              rotation={this.state.turretAngle}/>
            </a-sphere>

            <a-sphere // Windows
            position={`0 0.6 ${0.4 - this.radius}`}
            radius='0.5'
            scale='2.5 1 1.5'
            material='color:black; opacity:0.4;'/>
            <a-sphere
            position={`${-(this.radius - 0.5)} 0.6 -1`}
            radius='0.4'
            material='color:black; opacity:0.4;'/>
            <a-sphere
            position={`${this.radius - 0.5} 0.6 -1`}
            radius='0.4'
            material='color:black; opacity:0.4;'/>

          </a-sphere>
        </a-sphere>
      </a-entity>
    )
  }
}

module.exports = EnemyTank;
