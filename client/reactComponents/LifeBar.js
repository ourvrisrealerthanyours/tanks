import React from 'react';

const LifeBar = (props) => {
  const position = props.position || '0 0 0';
  const width = props.width || 4;
  const height = props.height || 0.7;
  // TODO: Make better turret angle interpolator
  return (
    <a-entity
    look-at='#camera'
    socket-controls={`characterId: ${props.characterId}; simulationAttribute: position`}>
      <a-plane 
      position={position}
      material='color:grey;'
      width={width + 0.2}
      height={height + 0.2}>
        <a-plane 
        position={'0 0 0.1'}
        material='color:red;'
        width={width}
        height={height}
        // TODO: remove hardcoded maxLife
        hit-listener={`characterId: ${props.characterId}; maxLife: 1000; barWidth: ${width}`}/>
      </a-plane>
    </a-entity>
  ) 
};

module.exports = LifeBar;
