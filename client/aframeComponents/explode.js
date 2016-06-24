AFRAME.registerComponent('explode', {
  schema: {
    event: {default: 'collide'},
    socket: {default: null} // Potentially broadcast socket event
  },

  init: function() {
    const el = this.el;
    el.addEventListener('collide', function (e) {
      const expandAnimation = document.createElement('a-animation');
      // animation.setAttribute('mixin', 'explosion');
      expandAnimation.setAttribute('attribute', 'geometry.radius');
      expandAnimation.setAttribute('to', 3);
      expandAnimation.setAttribute('dur', 200);
      expandAnimation.setAttribute('easing', 'ease-out');

      const opacityAnimation = document.createElement('a-animation');
      // animation.setAttribute('mixin', 'explosion');
      opacityAnimation.setAttribute('attribute', 'material.opacity');
      opacityAnimation.setAttribute('to', 0);
      opacityAnimation.setAttribute('dur', 200);
      opacityAnimation.setAttribute('easing', 'ease-out');

      el.setAttribute('material', 'color:red;');
      el.setAttribute('velocity', '0 0 0');
      el.appendChild(expandAnimation);
      el.appendChild(opacityAnimation);

      setTimeout(() => {
        if(el.sceneEl.contains(el)) {
          el.sceneEl.removeChild(el);
        }
      }, 200);

    });

    setTimeout(() => {
      if(el.sceneEl.contains(el)) {
        el.sceneEl.removeChild(el);
      }
    }, 15000)
  },
});
