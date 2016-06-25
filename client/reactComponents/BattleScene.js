import React from 'react';
import Arena from './Arena';
import PlayerTank from './PlayerTank';
import EnemyTank from './EnemyTank';
import { colors } from '../../simulation/constants';

class BattleScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
    };

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
    this.socket.on('shotHit', hitData => {
      console.log('Someone was hit!', hitData);
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
        2.6,
        character.position.z
      ].join(' ');

      if (character.characterId === this.characterId) {
        return (
          <PlayerTank key={character.characterId}
          position={position}
          material={`color: ${colors[character.characterId]}`}
          role={this.role}
          characterId={character.characterId}/>
        )
      } else {
        return (
          <EnemyTank key={character.characterId}
          position={position}
          material={`color: ${colors[character.characterId]}`}
          characterId={character.characterId}/>
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
