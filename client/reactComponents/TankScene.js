import React from 'react';
import Arena from './Arena';
import Tank from './Tank';
import extras from 'aframe-extras';

extras.registerAll();

class TankScene extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <a-scene physics='debug:true'>
        <a-assets>
        </a-assets>

        <a-sky color='blue' />

        <Arena>
          <Tank/>
        </Arena>

      </a-scene>
    )
  }
}

module.exports = TankScene;
