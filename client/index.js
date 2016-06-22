import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import AFRAME from 'aframe';
import extras from 'aframe-extras';

extras.physics.registerAll();
require('./aframeComponents/tank-controls');
require('./aframeComponents/quick-rotate');
require('./aframeComponents/spawner');
require('./aframeComponents/event-listener');

import WelcomePage from './reactComponents/WelcomePage';
import TankScene from './reactComponents/TankScene';

// TODO: switch to browser history
// TODO: pass socketID in tanksURL? Is that even necessary?
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component = {WelcomePage}/>
    <Route path='/tanks' component={TankScene}/>
  </Router>
, document.getElementById('app'));
