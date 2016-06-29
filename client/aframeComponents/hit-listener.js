AFRAME.registerComponent('hit-listener', {
 schema: {
    characterId: { default: undefined },
    barWidth: { default: 1 },
    maxHealth: { default: 100 },
    direction: { default: 1 }
  },

  init: function () {
    const el = this.el;
    const data = this.data;
    const position = el.getAttribute('position');
    window.addEventListener('characterHit', (e) => {
      console.log('my hitta!', e.detail);
      if(data.characterId === e.detail.characterId) {
        const width = this.getWidth(e.detail.remainingHealth);
        const xPosition = this.getXPosition(e.detail.remainingHealth);
        el.setAttribute('width', width);
        el.setAttribute('position', {
          x: xPosition,
          y: position.y,
          z: position.z
        });
      }
    });
  },

  getWidth: function (remainingHealth) {
    if(this.data.direction == 1) {
      return Math.max((remainingHealth / this.data.maxHealth) * this.data.barWidth, 0);
    } else {
      return Math.min((1 - remainingHealth / this.data.maxHealth) * this.data.barWidth, this.data.barWidth);
    }
  },

  getXPosition: function (remainingHealth) {
    if(this.data.direction == 1) {
      return (Math.max(remainingHealth, 0)/this.data.maxHealth - 1) * this.data.barWidth / 2;
    } else {
      return (Math.max(remainingHealth, 0)/this.data.maxHealth) * this.data.barWidth / 2;
    }
  }
});
