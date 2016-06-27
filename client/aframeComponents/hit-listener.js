AFRAME.registerComponent('hit-listener', {
 schema: {
    characterId: { default: undefined },
    barWidth: { default: 1 },
    maxLife: { default: 100 }
  },

  init: function () {
    const el = this.el;
    const data = this.data;
    const position = el.getAttribute('position');
    window.addEventListener('characterHit', function (e) {
      if(data.characterId === e.detail.characterId) {
        const width = Math.max((e.detail.remainingHealth/data.maxLife) * data.barWidth, 0);
        const xPosition = (e.detail.remainingHealth/data.maxLife - 1) * data.barWidth / 2;
        el.setAttribute('width', width);
        el.setAttribute('position', {
          x: xPosition,
          y: position.y,
          z: position.z
        });
      }
    });
  }
});
