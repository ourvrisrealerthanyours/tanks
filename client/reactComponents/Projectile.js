import React from 'react';

const Projectile = (props) => {
  return (
    <a-mixin
    id='projectile'
    dynamic-body
    geometry='primitive: sphere; radius: 0.25;'
    explode
    material='color: white;' />
  )
}

module.exports = Projectile;
