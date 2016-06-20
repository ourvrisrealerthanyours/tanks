import React from 'react';
import Arena from './Arena';
import Tank from './Tank';

class JoinGameScene extends React.Component {

  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.enterBattle = props.enterBattle;
    setTimeout(this.enterBattle, 10000);
  }

  componentDidMount() {
  }

  render () {
    return (
      <a-scene >
        <a-assets>
        </a-assets>

        <a-sky color='blue' />

        <Arena wallHeigh={8} >
          <Tank position='-5 1 -10' rotation='0 -120 0'/>
          <Tank position='5 1 -10' rotation='0 120 0'/>
          <a-camera position='0 1.78 0' wasd-controls='enabled: false;'>
            <a-cursor/>
          </a-camera>
        </Arena>

      </a-scene>
    )
  }
}

module.exports = JoinGameScene;
