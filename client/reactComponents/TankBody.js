import React from 'react';

class TankBody extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 3 0'; // TODO reason for floating?
    this.rotation = props.rotation || '0 0 0';
    this.bodyLength = props.bodyLength || 5;
    this.bodyWidth = props.bodyWidth || 3;
    this.driverCompartmentLength = Math.min(2, this.bodyLength);
    this.activeControl = props.activeControl || false;
  }

  componentDidMount() {
    this.tank = document.querySelector('#tankBody').object3D.el;
    var socket = this.props.socket;
    setInterval(() => {
      socket.emit('clientPositionUpdate', this.tank.getAttribute('position'))
    }, 1000)
  }

  render () {
    const driverBlockLength = this.bodyLength - this.driverCompartmentLength;
    const driverCameraOffset = (this.driverCompartmentLength - this.bodyLength) / 2;
    if(this.activeControl) {
      return (
        <a-entity id='tankBody' material='opacity: 0;'
        geometry={`primitive: box; width: ${this.bodyWidth}; height: 2.5; depth: ${this.bodyLength}`}
        position={this.position} rotation={this.rotation}
        tank-controls
        kinematic-body='radius: 2.5; enableSlopes: false'>

          <a-entity id='camera' position={`0 1 ${driverCameraOffset}`}
          camera='near: 0.05' look-controls />

          {/* Top and bottom driver plate */}
          <a-box width={this.bodyWidth} height='0.5' depth={this.bodyLength}
          position='0 0 0'
          color='red'/>
          <a-box width={this.bodyWidth} height='0.5' depth={this.bodyLength}
          position='0 2 0'
          color='red'/>

          {/* Driver compartment block */}
          <a-box width={this.bodyWidth} height='1.5'
          depth={driverBlockLength}
          position={`0 1 ${(this.bodyLength - driverBlockLength) / 2}`} color='red'/>

          {/* Driver compartment window liners */}
          <a-box width='0.2' height='1.5' depth='1'
          position={`${-(this.bodyWidth - 0.2) / 2} 1 ${-(this.bodyLength - 1) / 2}`}
          color='red'/>
          <a-box width='0.2' height='1.5' depth='1'
          position={`${(this.bodyWidth - 0.2) / 2} 1 ${-(this.bodyLength - 1) / 2}`}
          color='red'/>

          {this.props.children}

        </a-entity>
      )
    } else {
      return (
        <a-entity id='tankBody' material='opacity: 0;'
        geometry={`primitive: box; width: ${this.bodyWidth}; height: 2.5; depth: ${this.bodyLength}`}
        position={this.position}  rotation={this.rotation}
        // tank-controls
        velocity='0 0 -5'
        kinematic-body='radius: 2.5; enableSlopes: false'>

          {/* Top and bottom driver plate */}
          <a-box width={this.bodyWidth} height='0.5' depth={this.bodyLength}
          position='0 0 0'
          color='red'/>
          <a-box width={this.bodyWidth} height='0.5' depth={this.bodyLength}
          position='0 2 0'
          color='red'/>

          {/* Driver compartment block */}
          <a-box width={this.bodyWidth} height='1.5'
          depth={driverBlockLength}
          position={`0 1 ${(this.bodyLength - driverBlockLength) / 2}`} color='red'/>

          {/* Driver compartment window liners */}
          <a-box width='0.2' height='1.5' depth='1'
          position={`${-(this.bodyWidth - 0.2) / 2} 1 ${-(this.bodyLength - 1) / 2}`}
          color='red'/>
          <a-box width='0.2' height='1.5' depth='1'
          position={`${(this.bodyWidth - 0.2) / 2} 1 ${-(this.bodyLength - 1) / 2}`}
          color='red'/>

          {this.props.children}

        </a-entity>
      )
    }
  }
}

module.exports = TankBody;
