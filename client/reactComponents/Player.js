import React from 'react';
require('./../aframeComponents/socket-controls');
require('./../aframeComponents/data-emitter');
const uuid = require('uuid');

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 2 0';
    this.playerId = props.playerId;
    this.roomId = props.roomId;
  }

  componentDidMount() {
  }

  render () {
    return(
      <a-entity position={this.position} wasd-controls
      data-emitter={`roomId: ${this.roomId}; playerId: ${this.playerId}`}>
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
