
AFRAME.registerComponent('spawner', {
  schema: {
    on: { default: 'click' },
    mixin: { default: '' }
  },

  /**
   * Add event listener.
   */
  update: function (oldData) {
    this.el.addEventListener(this.data.on, this.spawn.bind(this));
  },

  /**
   * Spawn new entity at entity's current position.
   */
  spawn: function () {
    var el = this.el;
    var entity = document.createElement('a-entity');
    var matrixWorld = el.object3D.matrixWorld;
    var position = new THREE.Vector3();
    var rotation = el.getAttribute('rotation');
    var cameraEl = el.parentElement;
    var tankEl = cameraEl.parentElement.parentElement;
    var cameraRotation = cameraEl.getAttribute('rotation');
    var tankRotation = tankEl.getAttribute('rotation');
    var tankVel = tankEl.getAttribute('velocity');
    var entityRotation;

    position.setFromMatrixPosition(matrixWorld);
    entity.setAttribute('position', position);
    entity.setAttribute('mixin', this.data.mixin);

    // Rotate to heading based on turret rotation and tank rotation
    var velocity = new THREE.Vector3(0, 0, -30); 
    if (cameraRotation) {
      const cameraHeading = new THREE.Euler(0, 0, 0, 'YXZ');
      cameraHeading.set(
        THREE.Math.degToRad(cameraRotation.x), 
        THREE.Math.degToRad(cameraRotation.y), 
        THREE.Math.degToRad(cameraRotation.z)
      );
      velocity.applyEuler(cameraHeading);
    }
    if(tankRotation) {
      const tankHeading = new THREE.Euler(0, 0, 0, 'YXZ');
      tankHeading.set(0, THREE.Math.degToRad(tankRotation.y), 0);
      velocity.applyEuler(tankHeading); 
    }

    // Add momentum from tank
    velocity.add(tankVel);

    // Set velocity on projectile
    entity.setAttribute('velocity', velocity);

    // Have the spawned entity face the same direction as the entity.
    // Allow the entity to further modify the inherited rotation.
    // entity.addEventListener('loaded', function () {
    //   entityRotation = entity.getComputedAttribute('rotation');
    //   entity.setAttribute('rotation', {
    //     x: entityRotation.x + rotation.x,
    //     y: entityRotation.y + rotation.y,
    //     z: entityRotation.z + rotation.z
    //   });
    // });
    el.sceneEl.appendChild(entity);
  }
});
