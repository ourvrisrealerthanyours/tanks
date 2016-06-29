import React from 'react';

const HeadsUpDisplay = (props) => (
  props.inTank ? (
    <div id='hud-health-outer' >
      <div style={`width: ${(props.health / MAX_HEALTH) * 100}%`}
      className='hud-health-bar' id='hud-health-inner-green'></div>
      <div style={`width: ${100 - (props.health / MAX_HEALTH) * 100}%`}
      className='hud-health-bar' id='hud-health-inner-red'></div>
    </div>
  ) : (<div/>);
);

module.exports = HeadsUpDisplay;
