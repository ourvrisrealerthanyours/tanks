AFRAME.registerComponent('explode', {
  schema: {
    event: {default: 'collide'},
    socket: {default: null} // Potentially broadcast socket event
  },

  init: function() {
    entity.addEventListener('collide', function (e) {
      console.log('Shot has collided with ' + e.detail.body.el);
      const position = entity.getAttribute('position');
      // console.log(entity.body);
      setTimeout(() => {
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

        entity.components['dynamic-body'].remove();
        entity.setAttribute('material', 'color:red;');
        entity.setAttribute('velocity', '0 0 0');
        entity.appendChild(expandAnimation);
        entity.appendChild(opacityAnimation);

        setTimeout(() => {
          entity.sceneEl.removeChild(entity);
        }, 200);

      },1)
      // e.detail.target.el;  // Original entity (playerEl).
      // e.detail.body.el;    // Other entity, which playerEl touched.
      // e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
      // e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    });
  }
});
