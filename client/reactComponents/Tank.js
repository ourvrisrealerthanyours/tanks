import React from 'react';
import Turret from './Turret';

class Tank extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 3 0';
    this.rotation = props.rotation || '0 0 0';
    this.driverLength = 5;
    this.driverWidth = 3;
    this.driverCompartmentLength = Math.min(2, this.driverLength);
    this.state = {
      turretAngle: 0
    }

    setInterval(() => {
      this.setState({ 
        turretAngle: Math.random() * 60 - 30
      })
    }, 1000)
  }

  render () {
    const driverBlockLength = this.driverLength - this.driverCompartmentLength;
    const driverCameraOffset = (this.driverCompartmentLength - this.driverLength) / 2;
     return (
      <a-entity id='tank' material='opacity: 0;' 
      geometry={`primitive: box; width: ${this.driverWidth}; height: 2.5; depth: ${this.driverLength}`}
      position={this.position} 
      tank-controls 
      kinematic-body='radius: 2.5; enableSlopes: false'>

        <a-entity id='camera' position={`0 1 ${driverCameraOffset}`} 
        rotation={this.rotation}
        camera='near: 0.05' look-controls />

        {/* Top and bottom driver plate */}
        <a-box width={this.driverWidth} height='0.5' depth={this.driverLength} 
        position='0 0 0' 
        color='red'/>
        <a-box width={this.driverWidth} height='0.5' depth={this.driverLength} 
        position='0 2 0' 
        color='red'/>

        {/* Driver compartment block */}
        <a-box width={this.driverWidth} height='1.5' 
        depth={driverBlockLength} 
        position={`0 1 ${(this.driverLength - driverBlockLength) / 2}`} color='red'/>

        {/* Driver compartment window liners */}
        <a-box width='0.2' height='1.5' depth='1' 
        position={`${-(this.driverWidth - 0.2) / 2} 1 ${-(this.driverLength - 1) / 2}`} 
        color='red'/>
        <a-box width='0.2' height='1.5' depth='1' 
        position={`${(this.driverWidth - 0.2) / 2} 1 ${-(this.driverLength - 1) / 2}`}
        color='red'/>

        {/* turret */}
        <Turret turretAngle={this.state.turretAngle}/>

      </a-entity>
    )
  }
}

module.exports = Tank;
