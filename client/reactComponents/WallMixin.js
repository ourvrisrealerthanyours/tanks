import React from 'react';
import { WALL_OPACITY } from '../../simulation/constants';

const WallMixin = (props) => {
  const material = props.material || `src: #wallSrc; opacity: ${WALL_OPACITY}; metalness: 0;`
  const height = props.height || 8;
  return (
    <a-mixin
    id='wall'
    static-body
    geometry={`primitive: box; height: ${height}; width: 0.5;`}
    material={material}/>
  )
}

module.exports = WallMixin;
