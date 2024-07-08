export const levels = {
  [1]: {
    height: 11,
    width: 11,
    hero: { x: 11, y: 6 },
    finish: { x: 2, y: 0 },
    gems: [
      { x: 1, y: 6 },
      { x: 3, y: 4 },
      { x: 7, y: 8 }
    ],
    walls: [
      { x: 0, y: 9, type: 'tree' },
      { x: 1, y: 2, type: 'tree' },
      { x: 9, y: 1, type: 'tree' },
      { x: 10, y: 0, type: 'tree' },
      { x: 5, y: 10, type: 'tree' },
      { x: 11, y: 1, type: 'tree' },
      { x: 11, y: 9, type: 'tree' },
      { x: 3, y: 5, type: 'rock' },
      { x: 5, y: 1, type: 'rock' },
      { x: 5, y: 9, type: 'rock' },
      { x: 11, y: 5, type: 'rock' },
    ],
    enemies: [],
  },

  [2]: {
    height: 1,
    width: 10,
    hero: { x: 0, y: 0 },
    finish: { x: 0, y: 9 },
    linesGoal: 1,
    walls: [],
    gems: [],
    enemies: [],
  },

  [3]: {
    height: 3,
    width: 5,
    hero: { x: 0, y: 0 },
    finish: { x: 2, y: 4 },
    walls: [
      { x: 0, y: 1, type: 'rock' }, { x: 1, y: 1, type: 'tree' },
      { x: 2, y: 3, type: 'rock' },
    ],
    gems: [ { x: 0, y: 4 }],
    enemies: [],
  },

  [4]: {
    height: 10,
    width: 10,
    hero: { x: 3, y: 0 },
    finish: { x: 7, y: 9 },
    gems: [
      { x: 1, y: 4 },
      { x: 2, y: 6 },
      { x: 8, y: 3 }
    ],
    walls: [
      { x: 0, y: 3, type: 'rock' }, { x: 1, y: 3, type: 'rock' }, { x: 2, y: 3, type: 'rock' }, { x: 3, y: 3, type: 'rock' }, { x: 4, y: 3, type: 'rock' }, { x: 5, y: 3, type: 'rock' }, { x: 6, y: 3, type: 'rock' }, { x: 7, y: 3, type: 'rock' },
      { x: 7, y: 4, type: 'tree' }, { x: 8, y: 4, type: 'tree' }
    ],
    enemies: [ { x: 9, y: 5, alive: true, name: "John" }]
  },

  [5]: {
    height: 15,
    width: 7,
    hero: { x: 12, y: 6 },
    finish: { x: 1, y: 2 },
    gems: [ { x: 5, y: 3 } ],
    linesGoal: 10,
    walls: [],
    enemies: [],
  },
}