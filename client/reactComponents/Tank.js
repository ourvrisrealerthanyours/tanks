import React from 'react';
import PlayerDriver from './PlayerDriver';
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
      control: props.control
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
    if(this.state.control === 'body') {
      return (
        <PlayerDriver socket={this.props.socket}/>
      )
    } else if(this.state.control === 'turret') {
      return (
        <a-entity id='tank' position='0 0 0' rotation='0 0 0'>
          <TankBody
          position={this.position}
          rotation={this.rotation}
          socket={this.props.socket}>
            <Turret
            activeControl={true}
            position={'0 2.75 0'}
            socket={this.props.socket}/>
          </TankBody>
        </a-entity>
      );
    } 
  }
}

module.exports = Tank;
