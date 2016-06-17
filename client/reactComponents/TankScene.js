import React from 'react';
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
        
        <Tank/>

        <a-sky color='blue' />
        <a-plane static-body height='100' width='100' color='grey' rotation='-90 0 0' />

      </a-scene>
    )
  }
}

module.exports = TankScene;
