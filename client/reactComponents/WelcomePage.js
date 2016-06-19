import React from 'react';
import TankScene from './TankScene';

class WelcomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <TankScene/>
    )
  }
}

module.exports = WelcomePage;
