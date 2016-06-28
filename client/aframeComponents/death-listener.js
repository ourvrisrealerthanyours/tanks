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
        const deathPlane = document.createElement('a-plane');
        deathPlane.setAttribute('position', '0 0 -0.2');
        deathPlane.setAttribute('material', 'shader', 'flat');
        deathPlane.setAttribute('width', 3);
        deathPlane.setAttribute('height', 3);

        const opacityAnimation = document.createElement('a-animation');
        opacityAnimation.setAttribute('attribute', 'material.opacity');
        opacityAnimation.setAttribute('from', 0);
        opacityAnimation.setAttribute('to', 1);
        opacityAnimation.setAttribute('dur', 3000);
        opacityAnimation.setAttribute('easing', 'ease-out');

        deathPlane.appendChild(opacityAnimation);
        el.appendChild(deathPlane);
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

  play: function () {
    this.addListener();
  },

  pause: function () {
    this.removeListener();
  },

  removeListener: function() {
    window.removeEventListener('characterDestroyed', this.handleEvent);
  }
});
