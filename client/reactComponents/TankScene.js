import React from 'react';
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
        
        <a-entity id='camera' position={`0 1.8 0`} width='0.5'
          camera='near: 0.05' universal-controls kinematic-body='radius: 0.6' />

        <a-plane static-body height='20' width='20' color='grey' rotation='-90 0 0' />

      </a-scene>
    )
  }
}

module.exports = TankScene;
