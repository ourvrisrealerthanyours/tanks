AFRAME.registerComponent('quick-rotate', {
  schema: {
    nextAngle: {default: 0},
    dur: {default: 50}
  },

  tick: function(t, dt) {
    if (isNaN(dt)) { return; }

    this.rotation = this.el.getComputedAttribute('rotation');
    const difference = this.data.nextAngle - this.rotation.y;
    if((this.step > 0 && difference > 1) || (this.step < 0 && difference < -1)) {
      this.el.setAttribute('rotation', {
        x: this.rotation.x,
        y: this.rotation.y + this.step * dt,
        z: this.rotation.z
      })
    }
  },

  update: function (previousData) {
    this.rotation = this.el.getComputedAttribute('rotation');
    const distance = this.data.nextAngle - this.rotation.y;
    this.step = distance / this.data.dur;
  },
 
});
