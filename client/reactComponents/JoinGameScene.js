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
          <Tank position='-6 1 -8' rotation='0 -110 0'/>
          <Tank position='6 1 -8' rotation='0 110 0'/>
          <a-camera position='0 3 0' wasd-controls='enabled: false;'>
            <a-cursor>
              <a-animation begin="fusing" easing="ease-in" attribute="scale"
              fill="none" from="1 1 1" to="0.1 0.1 0.1" dur='1500'/>
              <a-animation begin="click" easing="ease-in" attribute="scale"
              direction='alternate' repeat='1'
              fill="backwards" from="1 1 1" to="1.8 1.8 1.8" dur='80'/>
            </a-cursor>
          </a-camera>
        </Arena>

      </a-scene>
    )
  }
}

module.exports = JoinGameScene;
