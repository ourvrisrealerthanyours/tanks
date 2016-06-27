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
      console.log('Someone was hit!', hitDetails);
      const hitEvent = new CustomEvent('characterHit', { detail: hitDetails });
      window.dispatchEvent(hitEvent);
    });

    this.socket.on('characterDestroyed', hitData => {
      const deathEvent = new CustomEvent('characterDestroyed', {
       detail: { characterId: hitData.characterId }
      });
      window.dispatchEvent(deathEvent);
      // TODO: Update lives ui
      // TODO: Render death and respawn
      if(hitData.characterId === this.characterId) {
        console.log('You were destroyed!');
        blackoutCamera(2000)
      } else {
        console.log(hitData.characterId, 'was destroyed!');
      }
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

function blackoutCamera(fadeTime) {
  const camera = document.querySelector('#camera');
  const viewBlocker = document.createElement('a-plane');
  viewBlocker.setAttribute('position', '0 0 -0.2');
  viewBlocker.setAttribute('material', 'shader', 'flat');
  camera.appendChild(viewBlocker);

  const opacityAnimation = document.createElement('a-animation');
  opacityAnimation.setAttribute('attribute', 'material.opacity');
  opacityAnimation.setAttribute('from', 0);
  opacityAnimation.setAttribute('to', 1);
  opacityAnimation.setAttribute('dur', fadeTime /2);
  opacityAnimation.setAttribute('direction', 'alternate');
  opacityAnimation.setAttribute('repeat', 1);
  opacityAnimation.setAttribute('easing', 'ease-out');

  viewBlocker.appendChild(opacityAnimation);
  camera.appendChild(viewBlocker);
  setTimeout(() => {
    camera.removeChild(viewBlocker)
  }, fadeTime);
}
