import React from 'react';

const LifeBar = (props) => {
  const position = props.position || '0 0 0';
  const width = props.width || 3;
  // TODO: Make better turret angle interpolator
  return (
    <a-entity
    look-at='#camera'
    socket-controls={`characterId: ${props.characterId}; simulationAttribute: position`}>
      <a-plane 
      position={position}
      material='color:grey;'
      width={width}
      height='0.5'
      hitListener={`characterId: ${props.characterId};`}/>
    </a-entity>
  ) 
};

module.exports = LifeBar;
