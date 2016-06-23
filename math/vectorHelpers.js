// This file could have a better name

function rand(min, max) {
  min = min || 0;
  max = max || 1;
  return min + Math.random() * (max - min);
}

function randStart(rangeX, rangeY, rangeZ) {
  return {
    x: rand(-rangeX/2, rangeX/2),
    y: rand(-rangeY/2, rangeY/2),
    z: rand(-rangeZ/2, rangeZ/2),
  };
}

module.exports = {
  rand,
  randStart,
}
