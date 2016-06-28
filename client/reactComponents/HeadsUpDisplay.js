import React from 'react';

class HeadsUpDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.state = {
      inTank: false,
    };
  }

  render () {
    return (
      <div className='hud'>
        Health
        <div id='hud-health-bar'>40</div>
      </div>
    )
  }

}

module.exports = HeadsUpDisplay;
