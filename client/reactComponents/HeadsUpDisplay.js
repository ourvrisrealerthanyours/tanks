import React from 'react';
import { MAX_HEALTH } from '../../simulation/constants';

class HeadsUpDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { health: props.character.health || MAX_HEALTH };
    window.addEventListener('characterHit', (e) => {
      if(props.character.characterId === e.detail.characterId) {
        this.setState({ health: e.detail.remainingHealth });
      }
    });
  }

  render () {
    return (
      <div id='hud-health-outer'>
        <div className='hud-health-bar' id='hud-health-red'>
          <div className='hud-health-bar' id='hud-health-inner-green'
          style={{ width: (Math.max((this.state.health / MAX_HEALTH), 0) * 100) + '%'}}>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = HeadsUpDisplay;
