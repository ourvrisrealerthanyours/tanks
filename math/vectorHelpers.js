// This file could have a better name
var ARENA_WIDTH = require('../simulation/constants').ARENA_WIDTH;

function rand(min, max) {
  min = min || 0;
  max = max || 1;
  return min + Math.random() * (max - min);
}

function randStart() {
  return {
    x: rand(-ARENA_WIDTH/2, ARENA_WIDTH/2),
    y: 5,
    z: rand(-ARENA_WIDTH/2, ARENA_WIDTH/2),
  };
}

function lerpRotations(output, start, end, alpha) {
  if (!output || !start || !end) { return; }

  output.x = lerpRotation(start.x, end.x, alpha);
  output.y = lerpRotation(start.y, end.y, alpha);
  output.z = lerpRotation(start.z, end.z, alpha);
}

function lerpRotation(start, end, alpha) {
  shortest_angle=((((end - start) % 360) + 540) % 360) - 180;
  return (360 + start + shortest_angle * alpha) % 360;
}

function getVelocity(start, end, period) {
  return {
    x: (end.x - start.x)/period*1000,
    y: (end.y - start.y)/period*1000,
    z: (end.z - start.z)/period*1000,
  }
}

module.exports = {
  rand,
  randStart,
  lerpRotations,
  getVelocity,
}
