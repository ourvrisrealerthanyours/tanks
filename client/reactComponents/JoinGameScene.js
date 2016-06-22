import React from 'react';
import Arena from './Arena';
import EnemyTank from './EnemyTank';
import WallMixin from './WallMixin';

class JoinGameScene extends React.Component {

  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.enterBattle = props.enterBattle;
    setTimeout(this.enterBattle, 200000);
  }

  componentDidMount() {
    const redTurret = document.querySelector('#redTurret');
    const redBody = document.querySelector('#redBody');
    const greenTurret = document.querySelector('#greenTurret');
    const greenBody = document.querySelector('#greenBody');

    redTurret.addEventListener('click', function (event) {
      event.stopPropagation();
      redBody.setAttribute('material', 'color', 'red');
      greenBody.setAttribute('material', 'color', 'green');
      greenTurret.setAttribute('material', 'color', 'green');
      this.setAttribute('material', 'color', 'white');
    });
    redBody.addEventListener('click', function (event) {
      redTurret.setAttribute('material', 'color', 'red');
      greenBody.setAttribute('material', 'color', 'green');
      greenTurret.setAttribute('material', 'color', 'green');
      this.setAttribute('material', 'color', 'white');
    });
    greenTurret.addEventListener('click', function (event) {
      event.stopPropagation();
      redBody.setAttribute('material', 'color', 'red');
      greenBody.setAttribute('material', 'color', 'green');
      redTurret.setAttribute('material', 'color', 'red');
      this.setAttribute('material', 'color', 'white');
    });
    greenBody.addEventListener('click', function (event) {
      redTurret.setAttribute('material', 'color', 'red');
      redBody.setAttribute('material', 'color', 'red');
      greenTurret.setAttribute('material', 'color', 'green');
      this.setAttribute('material', 'color', 'white');
    });
  }

  render () {
    return (
      <a-scene physics='debug: true;'>
        <a-assets>
          <WallMixin height={8}/>
        </a-assets>

        <a-sky color='blue' />
        <a-entity light="type: directional; color: #EEE; intensity: 1.0" position="-1 1 0"/>
        <a-entity light="type: hemisphere; color: #882; groundColor: #333; intensity: 2"/>

        <Arena wallHeight={8} >
          <EnemyTank turretId='redTurret' bodyId='redBody'
          position='-6 1.3 -8' rotation='0 -110 0' material='color: red;'/>
          <EnemyTank turretId='greenTurret' bodyId='greenBody'
          position='6 1.3 -8' rotation='0 110 0' material='color: green;'/>
          <a-camera position='0 3 0' wasd-controls='enabled: false;'>
            <a-cursor maxDistance='10'>
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
