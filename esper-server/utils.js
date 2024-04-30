const calculateCodeLines = (userCode) => userCode
  .split(/\r\n|\r|\n/)
  .filter(s => !s.startsWith('#'))
  .filter(s => /\S/.test(s))
  .length

const arePointsEqual = (first, second) => first.x === second.x && first.y === second.y

module.exports.calculateCodeLines = calculateCodeLines
module.exports.arePointsEqual = arePointsEqual