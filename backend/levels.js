export const levels = {
  [0]: {
    height: 12,
    width: 12,
    grid: [
      ["lawn","lawn","lawn","lawn","lawn","sand","sand","lawn","lawn","lawn","lawn","lawn",],
      ["lawn","lawn","lawn","sand","sand","sand","sand","sand","lawn","lawn","grass","lawn",],
      ["lawn","lawn","lawn","sand","lawn","lawn","lawn","sand","lawn","lawn","lawn","lawn",],
      ["lawn","grass","lawn","sand","sand","sand","sand","sand","lawn","lawn","lawn","lawn",],
      ["lawn","lawn","lawn","lawn","lawn","sand","sand","lawn","lawn","lawn","lawn","lawn",],
      ["lawn","lawn","sand","sand","sand","sand","sand","sand","sand","sand","lawn","lawn",],
      ["lawn","lawn","lawn","lawn","lawn","lawn","lawn","lawn","lawn","sand","sand","sand",],
      ["lawn","lawn","lawn","lawn","lawn","lawn","sand","sand","sand","sand","lawn","lawn",],
      ["lawn","lawn","lawn","sand","sand","sand","sand","sand","sand","sand","lawn","lawn",],
      ["lawn","lawn","lawn","lawn","grass","sand","sand","lawn","lawn","lawn","lawn","lawn",],
      ["lawn","lawn","lawn","lawn","lawn","sand","sand","lawn","lawn","lawn","lawn","lawn",],
      ["lawn","lawn","lawn","lawn","sand","sand","sand","sand","lawn","lawn","lawn","lawn",],
    ],
    hero: { x: 11, y: 6 },
    finish: { x: 0, y: 6 },
    gems: [
      { x: 1, y: 6 },
      { x: 3, y: 4 },
      { x: 7, y: 8 },
    ],
    walls: [
      { x: 0, y: 9, type: "tree" },
      { x: 1, y: 2, type: "tree" },
      { x: 9, y: 1, type: "tree" },
      { x: 10, y: 0, type: "tree" },
      { x: 5, y: 10, type: "tree" },
      { x: 11, y: 1, type: "tree" },
      { x: 11, y: 9, type: "tree" },
      { x: 3, y: 5, type: "rock" },
      { x: 5, y: 1, type: "rock" },
      { x: 5, y: 9, type: "rock" },
      { x: 11, y: 5, type: "rock" },

      { x: 3, y: 6, type: "water" }, { x: 3, y: 7, type: "water" }, { x: 3, y: 8, type: "water" },
      { x: 4, y: 6, type: "water" }, { x: 4, y: 7, type: "water" }, { x: 4, y: 8, type: "water" },
    ],
    bridges: [
      {
        id: "bridge",
        vertical: true,
        start: { x: 3, y: 7 },
        end: { x: 4, y: 7 },
        activated: false,
      },
    ],
    levers: [
      { x: 6, y: 8, name: "Мост", activatesId: "bridge", enabled: false },
    ],
    enemies: [{ x: 5, y: 2, alive: true, name: "Vlad" }],
    goals: [
      { type: 'finish', name: 'Добраться до финиша', heroText: 'Мне нужно добраться\nдо финиша', required: true },
      { type: 'lines', name: 'Использовать не больше 3 строк кода', heroText: 'Использовать не больше\n3 строк кода', linesCount: 3, required: true },
      { type: 'gems', name: 'Собрать все алмазы', heroText: 'Неплохо было бы собрать\nалмазы по пути', required: false },
    ]
  },

  [1]: {
    height: 3,
    width: 5,
    grid: [
      ["lawn","grass","lawn","lawn","lawn",],
      ["sand","sand","sand","lawn","lawn",],
      ["lawn","sand","sand","sand","sand",],
    ],
    hero: { x: 1, y: 0 },
    finish: { x: 2, y: 4 },
    linesGoal: 0,
    walls: [
      { x: 0, y: 2, type: "tree" },
      { x: 1, y: 3, type: "tree" },
      { x: 1, y: 4, type: "tree" },
    ],
    gems: [
      { x: 1, y: 2 },
    ],
    enemies: [],
    goals: [
      { type: 'finish', name: 'Добраться до финиша', heroText: 'Помоги мне добраться до финиша', required: true },
      { type: 'gems', name: 'Подобрать алмаз', heroText: 'Было бы неплохо подобрать алмаз по пути', required: false },
    ],
    levers: [],
    bridges: [],
  },

  [2]: {
    height: 4,
    width: 4,
    grid: [
      ["lawn","sand","lawn","grass",],
      ["lawn","sand","lawn","lawn",],
      ["lawn","sand","sand","sand",],
      ["lawn","grass","lawn","sand",],
    ],
    hero: { x: 1, y: 2 },
    finish: { x: 3, y: 3 },
    linesGoal: 0,
    walls: [
      { x: 0, y: 0, type: "tree" },
      { x: 0, y: 2, type: "tree" },
    ],
    gems: [
      { x: 1, y: 0 },
      { x: 3, y: 0 },
    ],
    enemies: [],
    goals: [
      { type: 'finish', name: 'Добраться до финиша', heroText: 'Мне нужно дойти до финиша', required: true },
      { type: 'gems', name: 'Собрать алмазы', heroText: 'Давай соберем все алмазы', required: false },
    ],
    levers: [],
    bridges: [],
  },

  [3]: {
    height: 2,
    width: 7,
    grid: [
      ["lawn","lawn","sand","lawn","grass","lawn","lawn",],
      ["grass","lawn","sand","sand","sand","sand","sand",],
    ],
    hero: { x: 1, y: 0 },
    finish: { x: 1, y: 6 },
    linesGoal: 1,
    walls: [
      { x: 0, y: 1, type: 'tree' }
    ],
    gems: [ { x: 1, y: 3 }],
    enemies: [],

    goals: [
      { type: 'finish', name: 'Добраться до финиша', heroText: 'Проведи меня до финиша', required: true },
      { type: 'lines', name: 'Использовать 1 строчку кода', heroText: 'Ты должен использовать только 1 строчку кода', linesCount: 1, required: true },
      { type: 'gems', name: 'Подобрать алмаз', heroText: 'Давай подберем алмаз', required: false },
    ],
    levers: [],
    bridges: [],
  },

  [4]: {
    height: 5,
    width: 8,
    grid: [
      ["lawn","lawn","grass","lawn","lawn","lawn","sand","lawn"],
      ["sand","sand","sand","lawn","lawn","lawn","sand","lawn"],
      ["lawn","lawn","sand","lawn","lawn","sand","sand","grass"],
      ["grass","lawn","sand","sand","sand","sand","lawn","lawn"],
      ["lawn","grass","lawn","lawn","lawn","sand","sand","lawn"],
    ],
    hero: { x: 0, y: 0 },
    finish: { x: 0, y: 6 },
    walls: [
      { x: 0, y: 4, type: 'rock' }, { x: 1, y: 4, type: 'rock' }, { x: 2, y: 4, type: 'rock' },
      { x: 0, y: 7, type: 'tree' }, { x: 0, y: 5, type: 'tree'},
      { x: 2, y: 0, type: 'tree'}, { x: 3, y: 1, type: 'tree'}
    ],
    gems: [
      { x: 0, y: 3 },
      { x: 4, y: 3 },
      { x: 1, y: 7 },
    ],
    enemies: [],
    goals: [
      { type: 'finish', name: 'Добраться до финиша', heroText: 'Мне нужно дойти до финиша', required: true },
      { type: 'gems', name: 'Собрать алмазы', heroText: 'Давай соберем все алмазы', required: false },
    ],
    levers: [],
    bridges: [],
  },

  [5]: {
    height: 4,
    width: 9,
    grid: [
      ["lawn","lawn","lawn","grass","lawn","lawn","lawn","sand","lawn",],
      ["sand","sand","grass","lawn","lawn","lawn","lawn","sand","lawn",],
      ["lawn","sand","sand","sand","lawn","lawn","sand","sand","sand",],
      ["lawn","grass","lawn","lawn","lawn","lawn","lawn","sand","lawn",],
    ],
    hero: { x: 2, y: 0 },
    finish: { x: 2, y: 8 },
    gems: [
      { x: 1, y: 6 },
    ],
    walls: [
      { x: 0, y: 3, type: 'water' }, { x: 0, y: 4, type: 'water' }, { x: 0, y: 5, type: 'water' },
      { x: 1, y: 3, type: 'water' }, { x: 1, y: 4, type: 'water' }, { x: 1, y: 5, type: 'water' },  
      { x: 2, y: 3, type: 'water' }, { x: 2, y: 4, type: 'water' }, { x: 2, y: 5, type: 'water' },
      { x: 3, y: 3, type: 'water' }, { x: 3, y: 4, type: 'water' }, { x: 3, y: 5, type: 'water' },

      { x: 0, y: 0, type: 'tree' }, { x: 0, y: 2, type: 'tree' },
      { x: 0, y: 7, type: 'tree' }, { x: 1, y: 8, type: 'tree' },
    ],
    enemies: [],
    goals: [
      { type: 'finish', name: 'Добраться до финиша на другом берегу', heroText: 'Мне надо как-то перебраться через реку.\nМожет, этот рычаг мне поможет?', required: true },
      { type: 'gems', name: 'Подобрать алмаз', heroText: 'Было бы неплохо подобрать алмаз по пути', required: false },
    ],
    levers: [
      { x: 3, y: 2, name: "Мост", activatesId: "bridge", enabled: false }
    ],
    bridges: [
      {
        id: "bridge",
        vertical: false,
        start: { x: 2, y: 3 },
        end: { x: 2, y: 5 },
        activated: false,
      },
    ],
  },

  [6]: {
    height: 7,
    width: 9,
    grid: [
      ["lawn","lawn","grass","lawn","lawn","lawn","lawn","sand","lawn",],
      ["sand","sand","sand","lawn","lawn","lawn","sand","sand","lawn",],
      ["lawn","sand","lawn","lawn","lawn","lawn","grass","lawn","lawn",],
      ["lawn","lawn","lawn","lawn","lawn","lawn","lawn","lawn","lawn",],
      ["lawn","lawn","lawn","lawn","lawn","lawn","lawn","lawn","lawn",],
      ["sand","grass","sand","sand","lawn","sand","sand","sand","grass",],
      ["lawn","grass","lawn","sand","sand","sand","lawn","lawn","sand",],
    ],
    hero: { x: 1, y: 0 },
    finish: { x: 6, y: 8 },
    gems: [
      { x: 1, y: 7 },
    ],
    walls: [
      { x: 0, y: 3, type: 'water' }, { x: 0, y: 4, type: 'water' }, { x: 0, y: 5, type: 'water' },
      { x: 1, y: 3, type: 'water' }, { x: 1, y: 4, type: 'water' }, { x: 1, y: 5, type: 'water' },  
      { x: 2, y: 3, type: 'water' }, { x: 2, y: 4, type: 'water' }, { x: 2, y: 5, type: 'water' },
      { x: 3, y: 0, type: 'water' }, { x: 3, y: 1, type: 'water' }, { x: 3, y: 2, type: 'water' }, { x: 3, y: 3, type: 'water' }, { x: 3, y: 4, type: 'water' }, { x: 3, y: 5, type: 'water' }, { x: 3, y: 6, type: 'water' }, { x: 3, y: 7, type: 'water' }, { x: 3, y: 8, type: 'water' },
      { x: 4, y: 0, type: 'water' }, { x: 4, y: 1, type: 'water' }, { x: 4, y: 2, type: 'water' }, { x: 4, y: 3, type: 'water' }, { x: 4, y: 4, type: 'water' }, { x: 4, y: 5, type: 'water' }, { x: 4, y: 6, type: 'water' }, { x: 4, y: 7, type: 'water' }, { x: 4, y: 8, type: 'water' },

      { x: 0, y: 6, type: 'tree' }, { x: 0, y: 8, type: 'tree' },
      { x: 6, y: 0, type: 'tree' }, 
    ],
    enemies: [],
    goals: [
      { type: 'finish', name: 'Добраться до финиша на другом берегу', heroText: 'Мне надо как-то перебраться через реку.\nМожет, этот рычаг мне поможет?', required: true },
      { type: 'gems', name: 'Подобрать алмаз', heroText: 'Было бы неплохо подобрать алмаз по пути', required: false },
    ],
    levers: [
      { x: 2, y: 2, name: "Мост1", activatesId: "bridge1", enabled: false },
      { x: 1, y: 8, name: "Мост2", activatesId: "bridge2", enabled: false },
    ],
    bridges: [
      {
        id: "bridge1",
        vertical: false,
        start: { x: 1, y: 3 },
        end: { x: 1, y: 5 },
        activated: false,
      },
      {
        id: "bridge2",
        vertical: true,
        start: { x: 3, y: 1 },
        end: { x: 4, y: 1 },
        activated: false,
      },
      {
        id: "fakeBridge",
        vertical: true,
        start: { x: 3, y: 7 },
        end: { x: 4, y: 7 },
        activated: false,
      },
    ],
  },

  [7]: {
    height: 3,
    width: 8,
    grid: [
      ["lawn","lawn","lawn","grass","lawn","lawn","lawn","lawn",],
      ["sand","sand","lawn","lawn","lawn","lawn","lawn","lawn",],
      ["grass","sand","sand","sand","lawn","lawn","grass","lawn",],
    ],
    hero: { x: 0, y: 7 },
    finish: { x: 2, y: 7 },
    gems: [
      { x: 0, y: 0 },
    ],
    walls: [
      { x: 1, y: 7, type: "rock" },
      { x: 1, y: 6, type: "rock" },
      { x: 1, y: 5, type: "rock" },
      { x: 1, y: 4, type: "rock" },
      { x: 1, y: 3, type: "rock" },
      { x: 1, y: 2, type: "rock" },
    ],
    enemies: [
      { x: 0, y: 1, alive: true, name: "John" },
      { x: 2, y: 5, alive: true, name: "Greg" },
    ],
    goals: [
      { type: 'finish', name: 'Добраться до финиша', heroText: 'Проведи меня до финиша', required: true },
      { type: 'enemies', name: 'Победить всех врагов', heroText: 'Дорогу преградили враги, надо их уничтожить', required: true },
      { type: 'gems', name: 'Подобрать алмаз', heroText: 'Было бы неплохо подобрать алмаз по пути', required: false },
    ],
    levers: [],
    bridges: [],
  },

  [8]: {
    height: 5,
    width: 13,
    grid: [
      ["lawn","lawn","lawn","lawn","lawn","sand","grass","lawn","lawn","lawn","lawn","lawn","lawn",],
      ["lawn","sand","grass","lawn","lawn","sand","lawn","grass","lawn","lawn","lawn","grass","lawn",],
      ["lawn","sand","lawn","lawn","lawn","sand","lawn","lawn","lawn","lawn","grass","lawn","lawn",],
      ["lawn","sand","sand","lawn","lawn","sand","sand","sand","lawn","lawn","sand","sand","sand",],
      ["grass","lawn","lawn","lawn","lawn","lawn","lawn","lawn","lawn","lawn","lawn","lawn","grass",],
    ],
    hero: { x: 0, y: 5 },
    finish: { x: 3, y: 12 },
    gems: [
      { x: 1, y: 1 },
      { x: 3, y: 11 },
    ],
    walls: [
      { x: 0, y: 3, type: 'water' }, { x: 0, y: 4, type: 'water' }, { x: 0, y: 8, type: 'water' }, { x: 0, y: 9, type: 'water' },
      { x: 1, y: 3, type: 'water' }, { x: 1, y: 4, type: 'water' }, { x: 1, y: 8, type: 'water' }, { x: 1, y: 9, type: 'water' },
      { x: 2, y: 3, type: 'water' }, { x: 2, y: 4, type: 'water' }, { x: 2, y: 8, type: 'water' }, { x: 2, y: 9, type: 'water' },
      { x: 3, y: 3, type: 'water' }, { x: 3, y: 4, type: 'water' }, { x: 3, y: 8, type: 'water' }, { x: 3, y: 9, type: 'water' },
      { x: 4, y: 3, type: 'water' }, { x: 4, y: 4, type: 'water' }, { x: 4, y: 8, type: 'water' }, { x: 4, y: 9, type: 'water' },

      { x: 0, y: 0, type: 'rock' }, { x: 0, y: 1, type: 'rock' }, { x: 0, y: 2, type: 'rock' },
      { x: 0, y: 10, type: 'rock' }, { x: 0, y: 11, type: 'rock' }, { x: 0, y: 12, type: 'rock' },
      { x: 2, y: 0, type: 'tree' },
      { x: 0, y: 7, type: 'tree' },
      { x: 2, y: 10, type: 'tree' },
    ],
    enemies: [
      { x: 3, y: 2, alive: true, name: "Brad" },
      { x: 3, y: 10, alive: true, name: "Bobby" },
    ],
    goals: [
      { type: 'finish', name: 'Добраться до финиша', heroText: 'Помоги мне добраться на другой берег', required: true },
      { type: 'gems', name: 'Подобрать алмаз', heroText: 'Попробуем достать все алмазы?', required: false },
    ],  
    levers: [
      { x: 4, y: 5, activatesId: 'bridge1', name: "Мост1", enabled: false },
      { x: 2, y: 7, activatesId: 'bridge2', name: "Мост2", enabled: false },
    ],
    bridges: [
      {
        id: "bridge1",
        vertical: false,
        start: { x: 3, y: 3 },
        end: { x: 3, y: 4 },
        activated: false,
      },
      {
        id: "bridge2",
        vertical: false,
        start: { x: 3, y: 8 },
        end: { x: 3, y: 9 },
        activated: false,
      },
    ],
  },

  [9]: {
    height: 8,
    width: 3,
    grid: [
      ["lawn","sand","grass",],
      ["lawn","sand","lawn",],
      ["sand","sand","lawn",],
      ["lawn","sand","lawn",],
      ["grass","sand","sand",],
      ["lawn","sand","lawn",],
      ["sand","sand","lawn",],
      ["grass","sand","lawn",],
    ],
    hero: { x: 0, y: 1 },
    finish: { x: 7, y: 1 },
    gems: [
      { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
    ],
    walls: [
      { x: 0, y: 0, type: 'rock' },{ x: 0, y: 2, type: 'rock' },
    ],
    enemies: [
      { x: 2, y: 0, alive: true, name: "Brad" },
      { x: 4, y: 2, alive: true, name: "Bobby" },
      { x: 6, y: 0, alive: true, name: "Greg" },
    ],
    goals: [
      { type: 'finish', name: 'Добраться до финиша', heroText: 'Помоги мне добраться на другой берег', required: true },
      { type: 'gems', name: 'Подобрать алмаз', heroText: 'Попробуем достать все алмазы?', required: false },
    ],  
    levers: [],
    bridges: [],
    onlyVariablesInAttack: true,
  },
};
