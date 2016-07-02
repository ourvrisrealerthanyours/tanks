import React from 'react';
import { MAX_HEALTH } from '../../simulation/constants';

const LifeBar = (props) => {
  const position = props.position || '0 0 0';
  const width = props.width || 4;
  const height = props.height || 0.7;
  const characterId = props.character.characterId;
  const health = props.character.health;

  // TODO: Make better turret angle interpolator
  return (
    <a-entity
    look-at='#camera'
    socket-controls={`characterId: ${characterId}; simulationAttribute: position`}>
      <a-plane
      position={position}
      material='color:grey; opacity: 0.5; shader: flat'
      width={width + 0.2}
      height={height + 0.2}>
        <a-plane
        position={`${(health / MAX_HEALTH - 1) * width / 2} 0 0.1`}
        material='color: #0F5; opacity: 0.7;  shader: flat'
        width={Math.max((health / MAX_HEALTH) * width, 0)}
        height={height}
        hit-listener={`characterId: ${characterId}; maxHealth: ${MAX_HEALTH}; barWidth: ${width}`}/>
        <a-plane
        position={`${(health / MAX_HEALTH) * width / 2} 0 0.1`}
        material='color: #F03; opacity: 0.7; shader: flat'
        width={Math.max((1 - health / MAX_HEALTH) * width, 0)}
        height={height}
        hit-listener={`characterId: ${characterId}; maxHealth: ${MAX_HEALTH}; barWidth: ${width}; direction: -1;`}/>
      </a-plane>
    </a-entity>
  )
};

module.exports = LifeBar;
