import React from 'react';

const Barrel = (props) => {
  const position = props.position || '0 0 0';
  const rotation = props.rotation || '0 0 0';
  const barrelLength = props.barrelLength || 5;
  // TODO: Make better turret angle interpolator
  return (
    <a-entity class='turret' position={position} rotation={rotation}>
      <a-cylinder height={barrelLength} radius='0.2' material={props.material}
      position={`0 0 ${-barrelLength / 2}`} rotation='90 0 0' />
      <a-cylinder height='0.3' radius='0.25' material={props.material}
      position={`0 0 ${-barrelLength}`}
      rotation='90 0 0' />
    </a-entity>
  )
};

module.exports = Barrel;
