AFRAME.registerComponent('hit-listener', {
 schema: {
    characterId: { default: undefined }
  },

  init: function () {
    const el = this.el;
    const data = this.data;
    window.addEventListener('characterHit', function (e) {
      if(data.characterId === e.detail.characterId) {
        console.log('HIT!!!!')
      }
    });
  }
});
