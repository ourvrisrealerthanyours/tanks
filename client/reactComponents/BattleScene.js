import React from 'react';
import Arena from './Arena';
import PlayerTank from './PlayerTank';
import EnemyTank from './EnemyTank';
import { colors } from '../../simulation/constants';

class BattleScene extends React.Component {

  constructor(props) {
    super(props);
    this.characterId = props.characterId;
    this.role = props.role;
    this.playerId = props.playerId
    this.socket = props.socket;

    this.socket.emit('requestCharacters');

    this.socket.on('shotFired', projectileData => {
      const projectile = document.createElement('a-entity');
      projectile.setAttribute('mixin', 'projectile');
      projectile.setAttribute('position', projectileData.position);
      projectile.setAttribute('velocity', projectileData.velocity);
      document.querySelector('#scene').appendChild(projectile);
    });

    this.socket.on('characterHit', hitDetails => {
      const hitEvent = new CustomEvent('characterHit', { detail: hitDetails });
      window.dispatchEvent(hitEvent);
    });

    this.socket.on('characterDestroyed', hitData => {
      const deathEvent = new CustomEvent('characterDestroyed', {
       detail: { characterId: hitData.characterId }
      });
      window.dispatchEvent(deathEvent);
      setTimeout(this.props.reset, 5000)
    });
  }

  renderCharacters () {
    this.characters = [];
    for (var characterId in this.props.characters) {
      this.characters.push(this.props.characters[characterId]);
    }
    return this.characters.map(character => {
      const position = [
        character.position.x,
        character.position.y, // used to be hard coded to TANK_RADIUS
        character.position.z
      ].join(' ');

      if (character.characterId === this.characterId) {
        return (
          <PlayerTank key={character.characterId}
          position={position}
          material={`color: ${colors[character.characterId]}`}
          role={this.role}
          isTouch={this.props.isTouch}
          characterId={character.characterId}/>
        )
      } else {
        return (
          <EnemyTank key={character.characterId}
          position={position}
          material={`color: ${colors[character.characterId]}`}
          character={character}/>
        )
      }
    });
  }

  render () {
    return (
      <a-entity>

        <a-sky color='blue' />

        <Arena wallHeight={8}>
          {this.renderCharacters.call(this)}
        </Arena>

      </a-entity>
    )
  }
}

module.exports = BattleScene;
