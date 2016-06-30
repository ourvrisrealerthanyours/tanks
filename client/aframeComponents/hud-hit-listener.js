AFRAME.registerComponent('hud-hit-listener', {
 schema: {
    characterId: { default: undefined },
    barWidth: { default: 1 },
    maxHealth: { default: 100 },
    direction: { default: 1 }
  },

  init: function () {
    const data = this.data;
    window.addEventListener('characterHit', (e) => {
      if(data.characterId === e.detail.characterId) {
        const width = this.getWidth(e.detail.remainingHealth);
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
