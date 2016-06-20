import React from 'react';
require('./../aframeComponents/socket-controls');

class EnemyTarget extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '5 1 -5';
  }

  componentDidMount() {
  }

  render () {
    return(
      <a-entity position={this.position} socket-controls socket={this.props.socket}>
        <a-sphere color="white" radius="1.5" shader="flat">
          <a-light type="point" color="white" />
        </a-sphere>
      </a-entity>
    );
  }
}

module.exports = EnemyTarget;
