import React from 'react';
import Arena from './Arena';
import EnemyTank from './EnemyTank';
import WallMixin from './WallMixin';
import { colors } from '../../simulation/constants';

class JoinGameScene extends React.Component {

  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.enterBattle = props.enterBattle;
    this.state = {
      loaded: false,
      characters: {}
    }
    const self = this;
    this.bindMethods();
    this.socket.emit('requestCharacters', props.roomId);
    this.socket.on('roleUpdate', function advanceToBattleScene(characters) {
      self.setState({ characters: characters, loaded: true });
    });
    this.socket.on('seatConfirmation', confirmation => {
      if (confirmation) {
        this.removeListeners();
        this.enterBattle(confirmation.characterId, confirmation.role);
      } else {
        this.socket.emit('requestCharacters', this.roomId);
      }
    })
  }

  requestSeat(characterId, role) {
    if(this.props.playerId) {
      this.socket.emit('requestSeat', {
        playerId: this.props.playerId,
        characterId,
        role,
        roomId: this.props.roomId,
      });
    } else {
      this.socket.emit('requestPlayerId'); // Just in case they somehow didn't get one
    }
  }

  componentDidUpdate() {
    if (this.state.loaded) {
      this.registerListeners();
    }
  }

  pickRole(event) {
    const characterId = event.target.getAttribute('characterId')
    const role = event.target.getAttribute('role')
    if (!this.state.characters[characterId][role]) {
      this.requestSeat(characterId, role);
    }
  }

  bindMethods() {
    this.pickRole = this.pickRole.bind(this);
  }

  registerListeners() {
    this.selectables = Array.from(document.getElementsByClassName('delectableSelectable'));
    this.selectables.forEach(selectable => {
      selectable.addEventListener('click', this.pickRole);
    })
  }

  removeListeners() {
    this.selectables.forEach(selectable => {
      selectable.removeEventListener('click', this.pickRole);
    });
  }

  renderSelectables() {
    const characters = [];
    for (var characterId in this.state.characters) {
      characters.push(this.state.characters[characterId]);
    }
    const n = characters.length;
    const totalLength = 3 * n;
    return characters.map((character, index) => {
      const x = index * totalLength / (n - 1) - totalLength / 2;
      return (
        <a-entity key={index}>
          <a-box class='delectableSelectable' position={`${x} 3.3 -8`} characterId={character.characterId}
          role='gunner' material={`color: ${colors[index]}; opacity: ${1 - 0.5 * !!characters[index].gunner}`}/>
          <a-box class='delectableSelectable' position={`${x} 1.3 -8`} characterId={character.characterId}
          role='driver' material={`color: ${colors[index]}; opacity: ${1 - 0.5 * !!characters[index].driver}`}/>
        </a-entity>
      )}
    );
  }

  render () {
    return this.state.loaded ? (
      <a-entity>
        <a-sky color='blue' />

        <Arena wallHeight={8} >
          {this.renderSelectables.call(this)}
          {/*<a-box id='greenTurret' position='-6 3.3 -8'
          material={`color: green; opacity: ${1 - 0.5 * !!this.state.characters[0].gunner}`}/>
          <a-box id='greenBody' position='-6 1.3 -8'
          material={`color: green; opacity: ${1 - 0.5 * !!this.state.characters[0].driver}`}/>
          <a-box id='redTurret' position='6 3.3 -8'
          material={`color: red; opacity: ${1 - 0.5 * !!this.state.characters[1].gunner}`}/>
          <a-box id='redBody' position='6 1.3 -8'
          material={`color: red; opacity: ${1 - 0.5 * !!this.state.characters[1].driver}`}/>*/}

          <a-camera position='0 3 0' wasd-controls='enabled: false;'>
            <a-cursor maxDistance='10'>
              <a-animation begin="fusing" easing="ease-in" attribute="scale"
              fill="none" from="1 1 1" to="0.1 0.1 0.1" dur='1500'/>
              <a-animation begin="click" easing="ease-in" attribute="scale"
              direction='alternate' repeat='1'
              fill="backwards" from="1 1 1" to="1.8 1.8 1.8" dur='80'/>
            </a-cursor>
          </a-camera>

        </Arena>
      </a-entity>
    ) : <a-entity />;
  }
}

module.exports = JoinGameScene;
