import React from 'react';

const Projectile = (props) => {
  return (
    <a-mixin
    id='projectile'
    dynamic-body
    geometry='primitive: sphere; radius: 0.25;'
    velocity='0 0 -10'
    material='color: black;' />
  )
}

module.exports = Projectile;
