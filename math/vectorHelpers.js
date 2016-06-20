// This file could have a better name

function rand(min = 0, max = 1) {
  return min + Math.random() * (max - min);
}

module.exports = {
  rand,
}
