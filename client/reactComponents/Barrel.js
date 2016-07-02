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
      <a-entity class='barrel'
      position={position}
      rotation={rotation}>
        <a-cylinder
        position={`0 0 ${-barrelLength / 2}`}
        rotation='90 0 0'
        height={barrelLength}
        radius='0.2'
        open-ended='false'
        theta-length='360'
        material={`side:double; ${props.material}`}/>
        <a-cylinder
        position={`0 0 ${-barrelLength}`}
        rotation='90 0 0'
        spawner={`mixin: projectile; on: click; characterId: ${props.characterId}`}
        death-listener={`characterId: ${props.characterId};`}
        height='0.3'
        radius='0.25'
        open-ended='false'
        theta-length='360'
        material={`side:double; ${props.material}`}
        click-space-listener/>
      </a-entity>
    )
  } else {
    return (
      <a-entity class='barrel'
      position={position}
      rotation={rotation}>
        <a-cylinder
        position={`0 0 ${-barrelLength / 2}`}
        rotation='90 0 0'
        height={barrelLength}
        radius='0.2'
        open-ended='false'
        theta-length='360'
        material={`side:double; ${props.material}`}/>
        <a-cylinder
        position={`0 0 ${-barrelLength}`}
        rotation='90 0 0'
        height='0.3'
        radius='0.25'
        open-ended='false'
        theta-length='360'
        material={`side:double; ${props.material}`}/>
      </a-entity>
    )
  }
};

module.exports = Barrel;
