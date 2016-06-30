import React from 'react';
import ReactDOM from 'react-dom';
import AFRAME from 'aframe';
import extras from 'aframe-extras';

extras.physics.registerAll();
extras.controls.registerAll();

require('./aframeComponents/tank-controls');
require('./aframeComponents/spawner');
require('./aframeComponents/event-listener');
require('./aframeComponents/explode');
require('./aframeComponents/data-emitter');
require('./aframeComponents/socket-controls');
require('./aframeComponents/forward-movement-controls');
require('./aframeComponents/rotation-keyboard-controls');
require('./aframeComponents/death-listener');
require('./aframeComponents/hit-listener');

import WelcomePage from './reactComponents/WelcomePage'

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

ReactDOM.render(
  <WelcomePage isTouch={isTouch}/>
, document.getElementById('app'));
