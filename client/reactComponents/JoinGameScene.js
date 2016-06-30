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
    this.registerListeners();
  }

  pickRole(_, target) {
    const characterId = target.getAttribute('characterId')
    const role = target.getAttribute('role')
    if (!this.props.characters[characterId][role]) {
      this.requestSeat(characterId, role);
    }
  }

  bindMethods() {
    this.pickRole = this.pickRole.bind(this);
  }

  registerListeners() {
    this.selectables = Array.from(document.getElementsByClassName('delectableSelectable'));
    this.selectables.forEach(selectable => {
      selectable.addEventListener('click', this.pickRole.bind(this, null, selectable));
    });
  }

  removeListeners() {
    this.selectables.forEach(selectable => {
      // Not sure why we aren't getting the 'setState' error
      // this removeListeners isn't removing the bound version of pickRole
      selectable.removeEventListener('click', this.pickRole);
    });
  }

  renderSelectables() {
    const characters = [];
    for (var characterId in this.props.characters) {
      characters.push(this.props.characters[characterId]);
    }
    const n = characters.length;
    const totalLength = 3 * n;
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
          id='camera'
          position='0 3 0'
          wasd-controls='enabled: false;'
          rotation-keyboard-controls={`enabled:${!this.props.isTouch};`}
          look-controls={`enabled:${this.props.isTouch};`}
          // look-controls='enabled: false;'
          // universal-controls={`movementEnabled: false; rotationControls: mouse, hmd;`}
          >
            <a-cursor maxDistance='10' fuse={this.props.isTouch}>
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
