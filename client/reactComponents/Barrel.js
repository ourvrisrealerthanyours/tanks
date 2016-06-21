import React from 'react';

const Barrel = (props) => {
  const position = props.position || '0 0 0';
  const rotation = props.rotation || '0 0 0';
  const barrelLength = props.barrelLength || 6;
  // TODO: Make better turret angle interpolator
  if(props.fireEvent) {
    const fireEventArray = props.fireEvent.replace(' ', '').split(';');
    const event = fireEventArray.filter(params => params.slice(0,3) === 'on:')[0];
    return (
      <a-entity class='barrel' position={position} rotation={rotation}>
        <a-cylinder height={barrelLength} radius='0.2' material={props.material}
        position={`0 0 ${-barrelLength / 2}`} rotation='90 0 0' />
        <a-cylinder height='0.3' radius='0.25' material={props.material}
        position={`0 0 ${-barrelLength}`}
        rotation='90 0 0' 
        spawner={`mixin: projectile; ${event}`}
        event-listener={props.fireEvent}/>

        {props.children}

      </a-entity>
    )
  } else {
    return (
      <a-entity class='barrel' position={position} rotation={rotation}>
        <a-cylinder height={barrelLength} radius='0.2' material={props.material}
        position={`0 0 ${-barrelLength / 2}`} rotation='90 0 0' />
        <a-cylinder height='0.3' radius='0.25' material={props.material}
        position={`0 0 ${-barrelLength}`}
        rotation='90 0 0' />

        {props.children}

      </a-entity>
    )
  }
};

module.exports = Barrel;
