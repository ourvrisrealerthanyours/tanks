import React from 'react';
import Arena from './Arena';
import EnemyTank from './EnemyTank';
import WallMixin from './WallMixin';

class JoinGameScene extends React.Component {

  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.enterBattle = props.enterBattle;
    this.state = {
      loaded: false,
      characters: {}
    }
    this.socket.emit('requestCharacters', props.roomId);
    this.socket.on('roleUpdate', characters => {
      this.setState({ characters: characters, loaded: true });
    });
    this.socket.on('seatConfirmation', confirmation => {
      if (confirmation) {
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
      const greenTurret = document.querySelector('#greenTurret');
      const greenBody = document.querySelector('#greenBody');
      const redTurret = document.querySelector('#redTurret');
      const redBody = document.querySelector('#redBody');

      greenTurret.addEventListener('click', event => {
        if (!this.state.characters[0].gunner) {
          this.requestSeat('0', 'gunner')
        }
      });
      greenBody.addEventListener('click', event => {
        if (!this.state.characters[0].driver) {
          this.requestSeat('0', 'driver')
        }
      });
      redTurret.addEventListener('click', event => {
        if (!this.state.characters[1].gunner) {
          this.requestSeat('1', 'gunner')
        }
      });
      redBody.addEventListener('click', event => {
        if (!this.state.characters[1].driver) {
          this.requestSeat('1', 'driver')
        }
      });
    }
  }

  render () {
    return this.state.loaded ? (
      <a-entity>
        <a-sky color='blue' />
        <a-entity light="type: directional; color: #EEE; intensity: 1.0" position="-1 1 0"/>
        <a-entity light="type: hemisphere; color: #222; groundColor: #555; intensity: 2"/>

        <Arena wallHeight={8} >
          <a-box id='greenTurret' position='-6 3.3 -8'
          material={`color: green; opacity: ${1 - 0.5 * !!this.state.characters[0].gunner}`}/>
          <a-box id='greenBody' position='-6 1.3 -8'
          material={`color: green; opacity: ${1 - 0.5 * !!this.state.characters[0].driver}`}/>
          <a-box id='redTurret' position='6 3.3 -8'
          material={`color: red; opacity: ${1 - 0.5 * !!this.state.characters[1].gunner}`}/>
          <a-box id='redBody' position='6 1.3 -8'
          material={`color: red; opacity: ${1 - 0.5 * !!this.state.characters[1].driver}`}/>

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
