import React from 'react';
import Arena from './Arena';
import EnemyTank from './EnemyTank';
import WallMixin from './WallMixin';

class JoinGameScene extends React.Component {

  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.enterBattle = props.enterBattle;
    setTimeout(this.enterBattle, 5000);
  }

  componentDidMount() {
  }

  render () {
    return (
      <a-scene physics='debug: true;'>
        <a-assets>
          <WallMixin height={8}/>
        </a-assets>

        <a-sky color='blue' />

        <Arena wallHeight={8} >
          <EnemyTank position='-6 1.3 -8' rotation='0 -110 0' material='color: red;'/>
          <EnemyTank position='6 1.3 -8' rotation='0 110 0' material='color: green;'/>
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
