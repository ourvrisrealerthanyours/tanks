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
      material='color:grey;'
      width={width + 0.2}
      height={height + 0.2}>
        <a-plane
        position={`${(health / maxHealth - 1) * width / 2} 0 0.1`}
        material='color:green;'
        width={Math.max((health / maxHealth) * width, 0)}
        height={height}

        // TODO: remove hardcoded maxLife
        hit-listener={`characterId: ${characterId}; maxHealth: ${maxHealth}; barWidth: ${width}`}/>
        <a-plane
        position={`${(health / maxHealth) * width / 2} 0 0.1`}
        material='color:red;'
        width={Math.max((1 - health / maxHealth) * width, 0)}
        height={height}
        // TODO: remove hardcoded maxLife
        hit-listener={`characterId: ${characterId}; maxHealth: ${maxHealth}; barWidth: ${width}; direction: -1;`}/>
      </a-plane>
    </a-entity>
  )
};

module.exports = LifeBar;
