import React from 'react';

const WallMixin = (props) => {
  const material = props.material || 'color: brown;'
  const height = props.height || 8;
  return (
    <a-mixin
    id='wall'
    static-body
    geometry={`primitive: box; height: ${height}; width: 0.5;`}
    material={material} />
  )
}

module.exports = WallMixin;
