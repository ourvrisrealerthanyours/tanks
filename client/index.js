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

import WelcomePage from './reactComponents/WelcomePage'

ReactDOM.render(
  <WelcomePage/>
, document.getElementById('app'));
