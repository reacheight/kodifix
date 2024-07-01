export const levels = {
  [1]: {
    height: 2,
    width: 4,
    hero: { x: 0, y: 0 },
    finish: { x: 1, y: 3 },
    gems: [
      { x: 0, y: 2 }
    ],
    walls: [],
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
      { x: 0, y: 1 }, { x: 1, y: 1 },
      { x: 2, y: 3 },
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
      { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 },
      { x: 7, y: 4 }, { x: 8, y: 4 }
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