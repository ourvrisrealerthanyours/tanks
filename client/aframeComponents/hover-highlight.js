AFRAME.registerComponent('hover-highlight', {
  init: function () {
    this.isHovered = false;
  },

  tick: function () {
    if(this.el.is('hovered') && !this.isHovered) {
      this.isHovered = true;
      this.handleHover();
    } else if(!this.el.is('hovered') && this.isHovered) {
      this.isHovered = false;
      this.handleHoverRemove();
    }
  },

  handleHover: function () {
    this.el.setAttribute('material', 'opacity', 0.3);
  },

  handleHoverRemove: function () {
    this.el.setAttribute('material', 'opacity', 0);
  }
});
