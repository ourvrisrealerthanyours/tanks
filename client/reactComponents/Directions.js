import React from 'react';
const letterHeight = 0.01;
const instructions = {
  browser: [
    'Use the mouse or arrow keys and spacebar to choose a spot in a tank',
    'GUNNER: Use the mouse or arrow keys to aim and spacebar to shoot',
    'DRIVER: Use the arrow keys to drive and steer',
  ],
  mobile: [
    'Hover your cursor over a tank spot and tap your screen to join',
    'GUNNER: Move your phone to aim and tap the screen to shoot',
    'DRIVER: Move your phone to steer press and the screen to drive',
  ]
};

function lenToX(string) {
  return -0.33 * string.length / 2;
}

const Directions = (props) => (
  <a-entity>
    <a-plane
    position='0 9 -7'
    rotation='30 0 0'
    opacity='0.7'
    width='24'
    height='4'
    color='black'>
      <a-entity
      position={`${lenToX(instructions[props.deviceType][0])} 1 0.1`}
      material='color: #FFF; shader: flat'
      text={`height: ${letterHeight}; text: ${instructions[props.deviceType][0]}`}/>
      <a-entity
      position={`${lenToX(instructions[props.deviceType][1])} 0 0.1`}
      material='color: #FFF; shader: flat'
      text={`height: ${letterHeight}; text: ${instructions[props.deviceType][1]}`}/>
      <a-entity
      position={`${lenToX(instructions[props.deviceType][2])} -1 0.1`}
      material='color: #FFF; shader: flat'
      text={`height: ${letterHeight}; text: ${instructions[props.deviceType][2]}`}/>
    </a-plane>
    <a-entity
    position='-5 0.2 -2'
    rotation='-90 0 0'
    material='color: #FFF; shader: flat'
    text={`height: ${letterHeight}; text: Use your phone to look forward`}/>
  </a-entity>
);

module.exports = Directions;
