AFRAME.registerComponent('death-listener', {
 schema: {
    characterId: {default: undefined}
  },

  init: function () {
    const el = this.el;
    window.addEventListener('characterDestroyed', function (e) {
      const characterId = e.detail.characterId;
      console.log('character killed:', characterId);

      // const blackPlane = document.createElement('a-plane');
      // blackPlane.setAttribute('position', '0 0 -0.2');
      // camera.appendChild(blackPlane);

      // const opacityAnimation = document.createElement('a-animation');
      // opacityAnimation.setAttribute('attribute', 'material.opacity');
      // opacityAnimation.setAttribute('from', 0);
      // opacityAnimation.setAttribute('to', 1);
      // opacityAnimation.setAttribute('dur', 1500);
      // opacityAnimation.setAttribute('easing', 'ease-out');

      // blackPlane.appendChild(opacityAnimation);
      // el.appendChild(blackPlane);
    });
  }
});
