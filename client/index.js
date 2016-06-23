import React from 'react';
import ReactDOM from 'react-dom';
import AFRAME from 'aframe';
import extras from 'aframe-extras';

extras.physics.registerAll();
require('./aframeComponents/tank-controls');
require('./aframeComponents/quick-rotate');
require('./aframeComponents/spawner');
require('./aframeComponents/event-listener');
require('./aframeComponents/explode');
require('./aframeComponents/data-emitter');
require('./aframeComponents/socket-controls');

import WelcomePage from './reactComponents/WelcomePage'

ReactDOM.render(
  <WelcomePage/>
, document.getElementById('app'));
