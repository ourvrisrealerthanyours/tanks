import React from 'react';
import Arena from './Arena';
import PlayerTank from './PlayerTank';
import EnemyTank from './EnemyTank';

const colors = ['green', 'red', 'blue', 'orange', 'black'];

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
    this.socket.emit('requestCharacters', this.props.roomId);
    this.socket.on('roleUpdate', characters => {
      const charactersArr = [];
      for (var characterId in characters) {
        charactersArr.push(characters[characterId]);
      }
      // TODO: make sure the update was for this room
      this.setState({ characters: charactersArr });
    });
    this.socket.on('shotFired', projectileData => {
      const projectile = document.createElement('a-entity');
      projectile.setAttribute('mixin', 'projectile');
      projectile.setAttribute('position', projectileData.position);
      projectile.setAttribute('velocity', projectileData.velocity);
      document.querySelector('#scene').appendChild(projectile);
    });
  }

  renderCharacters () {
    // TODO: How do we map if two characters per tank?
    return this.state.characters.map(character => {
      const position = [
        character.position.x,
        character.position.y,
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
