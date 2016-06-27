AFRAME.registerComponent('death-listener', {
 schema: {
    characterId: { default: undefined },
    type: { default: undefined },
    respawnTime: { default: 5000 }
  },

  init: function () {
    const el = this.el;
    const data = this.data;
    window.addEventListener('characterDestroyed', function (e) {
      console.log(data.characterId, data.type, e.detail.characterId);
      if(data.characterId === e.detail.characterId) {
        if(data.type === 'spawner') {
          el.components.spawner.pause();
          setTimeout(() => {
            el.components.spawner.play();
          }, data.respawnTime)
        }
        
        if(data.type === 'driver') {
          // el.components['data-emitter'].pause();
          el.setAttribute('position', '0 2.5 0');
          // window.socket.emit('respawn', { characterId: data.characterId });
          // setTimeout(() => {
          //   // el.components['data-emitter'].play();
          //   el.setAttribute('position', '0 0 0')
          // }, data.respawnTime)
        }

        if(data.type === 'enemyTank') {
          // console.log(el.components['socket-controls']);
        }
      }
      // const characterId = e.detail.characterId;
      // console.log('character killed:', characterId);

      // const blackPlane = document.createElement('a-plane');
      // blackPlane.setAttribute('position', '0 0 -0.2');
      // blackPlane.setAttribute('material', 'shader', 'flat');
      // el.appendChild(blackPlane);

      // const opacityAnimation = document.createElement('a-animation');
      // opacityAnimation.setAttribute('attribute', 'material.opacity');
      // opacityAnimation.setAttribute('from', 0);
      // opacityAnimation.setAttribute('to', 1);
      // opacityAnimation.setAttribute('dur', 1500);
      // opacityAnimation.setAttribute('easing', 'ease-out');

      // blackPlane.appendChild(opacityAnimation);
      // el.appendChild(blackPlane);

      // setTimeout(() => {
      //   el.removeChild(blackPlane)
      // }, 3000);
    });
  }
});
