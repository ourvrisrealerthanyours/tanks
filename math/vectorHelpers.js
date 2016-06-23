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

function lerpRotations(output, start, end, alpha) {
  output.x = lerpRotation(start.x, end.x, alpha);
  output.y = lerpRotation(start.y, end.y, alpha);
  output.z = lerpRotation(start.z, end.z, alpha);
}

function lerpRotation(start, end, alpha) {
  shortest_angle=((((end - start) % 360) + 540) % 360) - 180;
  return start + shortest_angle * alpha;
}

module.exports = {
  rand,
  randStart,
  lerpRotations,
}
