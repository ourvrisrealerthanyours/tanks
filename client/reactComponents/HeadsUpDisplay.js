import React from 'react';
import { MAX_HEALTH } from '../../simulation/constants';

const HeadsUpDisplay = (props) => {
  const health = props.character ? props.character.health : MAX_HEALTH;
  return (
    <div id='hud-health-outer'
    >
      <div className='hud-health-bar' id='hud-health-red'>
        <div className='hud-health-bar' id='hud-health-inner-green' />
        {/*hud-hit-listener={`characterId: ${props.character.characterId}; maxHealth: ${MAX_HEALTH};`}/>*/}
      </div>
    </div>
  );
};

module.exports = HeadsUpDisplay;
