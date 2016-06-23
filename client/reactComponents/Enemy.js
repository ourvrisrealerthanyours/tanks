import React from 'react';
require('./../aframeComponents/socket-controls');

class Enemy extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '5 1 -5';
  }

  componentDidMount() {
  }

  render () {
    return(
      <a-entity position={this.position} socket={this.props.socket}
      socket-controls={`characterId: ${this.props.characterId}`}>
        <a-sphere color="white" radius="1.5" shader="flat">
          <a-light type="point" color="white" />
        </a-sphere>
      </a-entity>
    );
  }
}

module.exports = Enemy;
