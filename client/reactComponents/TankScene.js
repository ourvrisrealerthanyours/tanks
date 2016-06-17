import React from 'react';
import Arena from './Arena';
import Tank from './Tank';
import WallMixin from './WallMixin';
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
          <WallMixin height={8}/>
        </a-assets>

        <a-sky color='blue' />

        <Arena wallHeight={8}>
          <Tank/>
        </Arena>

      </a-scene>
    )
  }
}

module.exports = TankScene;
