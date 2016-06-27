import React from 'react';

const LifeBar = (props) => {
  const position = props.position || '0 0 0';
  const width = props.width || 1;
  // TODO: Make better turret angle interpolator
  return (
    <a-entity
    position={position}
    look-at='[camera]'>
      <a-plane 
      color='red'
      hitListener={`characterId: ${this.props.characterId};`}/>
    </a-entity>
  ) 
};

module.exports = LifeBar;
