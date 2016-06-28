AFRAME.registerComponent('death-listener', {
 schema: {
    characterId: { default: undefined },
  },

  init: function () {
    this.bindMethods();
    this.addListener();
  },

  handleEvent: function (e) {
    const el = this.el;
    const data = this.data;
    if(data.characterId === e.detail.characterId) {
      if(el.components.spawner) {
        el.components.spawner.pause();
      }
      
      if(el.components['forward-movement-controls']) {
        el.components['forward-movement-controls'].pause();
      }

      if(el.components.camera) {
        const blackPlane = document.createElement('a-plane');
        blackPlane.setAttribute('position', '0 0 -0.2');
        blackPlane.setAttribute('material', 'shader', 'flat');
        blackPlane.setAttribute('width', 3);
        blackPlane.setAttribute('height', 3);

        const opacityAnimation = document.createElement('a-animation');
        opacityAnimation.setAttribute('attribute', 'material.opacity');
        opacityAnimation.setAttribute('from', 0);
        opacityAnimation.setAttribute('to', 1);
        opacityAnimation.setAttribute('dur', 3000);
        opacityAnimation.setAttribute('easing', 'ease-out');

        blackPlane.appendChild(opacityAnimation);
        el.appendChild(blackPlane);
        this.removeListener();
      }
    }
  },

  bindMethods: function () {
    this.handleEvent = this.handleEvent.bind(this);
  },

  addListener: function () {
    window.addEventListener('characterDestroyed', this.handleEvent);
  },

  play: this.addListener,

  pause: this.removeListener,

  removeListener: function() {
    window.removeEventListener('characterDestroyed', this.handleEvent);
  }
});
