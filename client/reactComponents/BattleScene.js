import React from 'react';
import Arena from './Arena';
import PlayerTank from './PlayerTank';
import WallMixin from './WallMixin';
import Projectile from './Projectile';
import Enemy from './Enemy';
import EnemyTank from './EnemyTank';
import uuid from 'uuid';

class BattleScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
    };
    // characterId has to be initialized on client
    this.characterId = uuid.v4();
    props.socket.emit('createCharacter', this.characterId);
    props.socket.on('characterAdmittedToRoom', data => this.admitCharactersIntoRoom(data));
  }

  admitCharactersIntoRoom(admissionData) {
    if (admissionData.roomId === this.roomId) {
      let characters = [...this.state.characters, admissionData.characterId];
      this.setState({
        characters: characters
      });
    } else if (admissionData.characterId === this.characterId) {
      this.roomId = admissionData.roomId;
      this.setState({
        characters: Object.keys(admissionData.characters)
      });
    }
  }

  // componentDidMount() {
  //   var characterEl = document.querySelector('#tank');
  //   characterEl.addEventListener('collide', function (e) {
  //     console.log('Character has collided with body #' + e.detail.body.id);
  //
  //     e.detail.target.el;  // Original entity (characterEl).
  //     e.detail.body.el;    // Other entity, which characterEl touched.
  //     e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
  //     e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
  //   });
  // }

  renderCharacters () {
    // TODO: How do we map if two characters per tank?
    return this.state.characters.map(characterId => {
      if (characterId === this.characterId) {
        return (
          <PlayerTank key={characterId}
          roomId={this.roomId}
          role='driver'
          characterId={characterId}
          copilotPlayerId={undefined}/>
        )
      } else {
        return (
          <EnemyTank key={characterId}
          roomId={this.roomId}
          characterId={characterId}
          driverPlayerId={characterId}
          gunnerPlayerId={undefined}/>
          // <Enemy key={characterId}
          // roomId={this.roomId}
          // characterId={characterId}/>
        )
      }
    });
  }

  render () {
    return (
      <a-scene physics='debug:true'>
        <a-assets>
          <WallMixin height={8}/>
          <Projectile />
        </a-assets>

        <a-sky color='blue' />

        <Arena wallHeight={8}>
          {this.renderCharacters.call(this)}
        </Arena>

      </a-scene>
    )
  }
}

module.exports = BattleScene;
