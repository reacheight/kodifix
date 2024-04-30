const calculateCodeLines = (userCode) => userCode
  .split(/\r\n|\r|\n/)
  .filter(s => !s.startsWith('#'))
  .filter(s => /\S/.test(s))
  .length

module.exports.calculateCodeLines = calculateCodeLines