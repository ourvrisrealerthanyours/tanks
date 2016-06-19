import React from 'react';
import TankBody from './TankBody';
import Turret from './Turret';

class Tank extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 3 0'; // TODO: reason for floating?
    this.rotation = props.rotation || '0 0 0';
    this.bodyLength = 5;
    this.bodyWidth = 3;
    this.state = {
      turretAngle: 0,
      control: 't'
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        turretAngle: Math.random() * 60 - 30
      })
    }, 1000)
  }

  render () {
    if(this.state.control === 'body') {
      return (
        <a-entity id='tank' position='0 0 0' rotation='0 0 0'>
          <TankBody
          activeControl={true}
          position={this.position}
          rotation={this.rotation}
          bodyLength={this.bodyLength}
          bodyWidth={this.bodyWidth}
          socket={this.props.socket}>
            <Turret
            position={'0 2.75 0'}
            turretRadius={this.bodyWidth/2}
            turretAngle={this.state.turretAngle}/>
          </TankBody>
        </a-entity>
      )
    } else {
      return (
        <a-entity id='tank' position='0 0 0' rotation='0 0 0'>
          <TankBody
          position={this.position}
          rotation={this.rotation}
          // velocity={this.state.velocity} TODO: set velocity and heading based on incoming state
          // heading={this.state.heading}
          bodyLength={this.bodyLength}
          bodyWidth={this.bodyWidth}
          socket={this.props.socket}>
            <Turret
            activeControl={true}
            position={'0 2.75 0'}
            turretRadius={this.bodyWidth/2}/>
          </TankBody>
        </a-entity>
      );
    }
  }
}

module.exports = Tank;
