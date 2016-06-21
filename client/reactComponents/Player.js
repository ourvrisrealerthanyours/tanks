import React from 'react';
require('./../aframeComponents/socket-controls');
require('./../aframeComponents/data-emitter');
const uuid = require('uuid');

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 2 0';
    this.playerId = uuid.v4();
    window.playerId = this.playerId; // Assume only one player per window
    window.socket.emit('createPlayer', this.playerId);
  }

  componentDidMount() {
  }

  render () {
    return(
      <a-entity position={this.position} data-emitter={`playerId: ${this.playerId}`}
        wasd-controls socket={this.props.socket}>
        <a-sphere color="white" radius="1.5" shader="flat">
          <a-light type="point" color="white" />
          <a-entity id='camera' position={`0 3 3`}
          camera='near: 0.05' look-controls/>
        </a-sphere>
      </a-entity>
    );
  }
}

module.exports = Player;
