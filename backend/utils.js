export const calculateCodeLines = (userCode) => userCode
  .split(/\r\n|\r|\n/)
  .filter(s => !s.trim().startsWith('#'))
  .filter(s => /\S/.test(s))
  .length;

export const arePointsEqual = (first, second) => first.x === second.x && first.y === second.y;

export const getDistance = (first, second) => Math.abs(first.x - second.x) + Math.abs(first.y - second.y);

export const Direction = {
  UP: { x: -1, y: 0 },
  DOWN: { x: 1, y: 0 },
  LEFT: { x: 0, y: -1 },
  RIGHT: { x: 0, y: 1 }
};