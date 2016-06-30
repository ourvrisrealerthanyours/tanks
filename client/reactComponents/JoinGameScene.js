import React from 'react';
import Arena from './Arena';
import TankBody from './TankBody';
import Turret from './Turret';
import WallMixin from './WallMixin';
import { colors, TANK_RADIUS } from '../../simulation/constants';

class JoinGameScene extends React.Component {

  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.enterBattle = props.enterBattle;
    this.bindMethods();
    this.socket.emit('requestCharacters');
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
    if (!this.props.characters[characterId][role]) {
      console.log('reqesting', role, characterId);
      if(this.props.playerId) {
        this.socket.emit('requestSeat', {
          playerId: this.props.playerId,
          characterId,
          role
        });
      } else {
        this.socket.emit('requestPlayerId'); // Just in case they somehow didn't get one
      }
    }
  }

  componentDidUpdate() {
    this.registerListeners();
  }

  gunner0() { this.requestSeat.call(this, '0', 'gunner') }
  driver0() { this.requestSeat.call(this, '0', 'driver') }
  gunner1() { this.requestSeat.call(this, '1', 'gunner') }
  driver1() { this.requestSeat.call(this, '1', 'driver') }

  bindMethods() {
    this.gunner0 = this.gunner0.bind(this);
    this.driver0 = this.driver0.bind(this);
    this.gunner1 = this.gunner1.bind(this);
    this.driver1 = this.driver1.bind(this);
  }

  registerListeners() {
    this.selectables = Array.from(document.getElementsByClassName('delectableSelectable'));
    this.selectables.forEach(selectable => {
      const role = selectable.getAttribute('role');
      const characterId = selectable.getAttribute('characterId');
      selectable.addEventListener('click', this[role + characterId]);
    });
  }

  removeListeners() {
    this.selectables.forEach(selectable => {
      // This hackery could probably be improved
      const role = selectable.getAttribute('role');
      const characterId = selectable.getAttribute('characterId');
      selectable.removeEventListener('click', this[role + characterId]);
    });
  }

  renderSelectables() {
    const characters = [];
    for (var characterId in this.props.characters) {
      characters.push(this.props.characters[characterId]);
    }
    const n = characters.length;
    const totalLength = 4 * n;
    return characters.map((character, index) => {
      const x = index * totalLength / (n - 1) - totalLength / 2;
      return (
        <a-entity key={index}
        position={`${x} ${TANK_RADIUS} -10`}>
          <a-entity
          class='delectableSelectable'
          role='driver'
          characterId={character.characterId}
          >
            <TankBody
            radius={TANK_RADIUS}
            role='driver'
            characterId={character.characterId}
            rotation='0 180 0'
            material={`color: ${colors[index]}; opacity: ${1 - 0.5 * !!characters[index].driver}`}
            socketControlsDisabled={true}/>
          </a-entity>
          <a-entity
          class='delectableSelectable'
          role='gunner'
          characterId={character.characterId}
          >
            <Turret
            position={`0 ${TANK_RADIUS - 0.5} 0`}
            rotation={`10 ${180 + x * 10} 0`}
            className='delectableSelectable'
            characterId={character.characterId}
            role='gunner'
            material={`color: ${colors[index]}; opacity: ${1 - 0.5 * !!characters[index].gunner}`}
            socketControlsDisabled={true}/>
          </a-entity>
        </a-entity>
      )}
    );
  }

  render () {
    return (
      <a-entity>
        <a-sky color='blue' />

        <Arena wallHeight={8} >
          {this.renderSelectables.call(this)}
          <a-camera
          position='0 3 0'
          wasd-controls='enabled: false;'
          rotation-keyboard-controls={`enabled:${!this.props.isTouch};`}
          look-controls={`enabled:${this.props.isTouch};`}
          // look-controls='enabled: false;'
          // universal-controls={`movementEnabled: false; rotationControls: mouse, hmd;`}
          >
            <a-cursor
            material='color: #AAF; shader: flat;'
            maxDistance='10'
            fuse={this.props.isTouch}>
              <a-animation begin="fusing" easing="ease-in" attribute="scale"
              fill="none" from="1 1 1" to="0.1 0.1 0.1" dur='1500'/>
              <a-animation begin="click" easing="ease-in" attribute="scale"
              direction='alternate' repeat='1'
              fill="backwards" from="1 1 1" to="1.8 1.8 1.8" dur='80'/>
            </a-cursor>
          </a-camera>

        </Arena>
      </a-entity>
    )
  }
}

module.exports = JoinGameScene;
