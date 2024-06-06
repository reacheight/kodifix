const calculateCodeLines = (userCode) => userCode
  .split(/\r\n|\r|\n/)
  .filter(s => !s.startsWith('#'))
  .filter(s => /\S/.test(s))
  .length

const arePointsEqual = (first, second) => first.x === second.x && first.y === second.y

const Direction = {
  UP: { x: -1, y: 0 },
  DOWN: { x: 1, y: 0 },
  LEFT: { x: 0, y: -1 },
  RIGHT: { x: 0, y: 1 }
}

module.exports.calculateCodeLines = calculateCodeLines
module.exports.arePointsEqual = arePointsEqual
module.exports.Direction = Direction