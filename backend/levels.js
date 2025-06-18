export const levels = {
  ['forest']: {
    [1]: {
      height: 3,
      width: 5,
      grid: [
        ["lawn","grass","tree","lawn","lawn",],
        ["sand","sand","sand","tree","tree",],
        ["rock","sand","sand","sand","sand",],
      ],
      hero: { x: 1, y: 0 },
      finish: { x: 2, y: 4 },
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
        ["tree","sand","tree","grass",],
        ["lawn","sand","lawn","rock",],
        ["lawn","sand","sand","sand",],
        ["lawn","grass","lawn","sand",],
      ],
      hero: { x: 1, y: 2 },
      finish: { x: 3, y: 3 },
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
      height: 5,
      width: 7,
      grid: [
        ["tree","lawn","sand","lawn","rock","tree","rock",],
        ["lawn","lawn","sand","lawn","lawn","lawn","lawn",],
        ["lawn","lawn","sand","sand","sand","sand","sand",],
        ["watert","lawn","rock","watert","watert","lawn","lawn",],
        ["water","watert","watert","water","water","watert","tree",],
      ],
      hero: { x: 2, y: 0 },
      finish: { x: 2, y: 6 },
      gems: [ { x: 2, y: 3 }],
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
        ["lawn","lawn","grass","lawn","rock","tree","sand","tree"],
        ["sand","sand","sand","lawn","rock","lawn","sand","lawn"],
        ["tree","lawn","sand","lawn","rock","sand","sand","grass"],
        ["grass","tree","sand","sand","sand","sand","lawn","lawn"],
        ["lawn","grass","lawn","lawn","lawn","sand","sand","lawn"],
      ],
      hero: { x: 0, y: 0 },
      finish: { x: 0, y: 6 },
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
      height: 7,
      width: 8,
      grid: [
        ["sand","sand","tree","lawn","watert","watert","tree","tree"],
        ["lawn","sand","sand","lawn","water","water","lawn","lawn"],
        ["lawn","lawn","sand","lawn","water","water","lawn","lawn"],
        ["lawn","lawn","sand","lawn","sand","sand","sand","lawn"],
        ["rock","rock","sand","rock","lawn","lawn","sand","sand"],
        ["lawn","sand","sand","lawn","tree","lawn","sand","rock"],
        ["lawn","sand","lawn","lawn","lawn","tree","sand","lawn"],
      ],
      hero: { x: 0, y: 0 },
      finish: { x: 6, y: 1 },
      gems: [
        { x: 1, y: 7 },
        { x: 6, y: 6 },
        { x: 3, y: 0 },
        { x: 6, y: 4 },
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Помоги мне добраться до финиша', required: true },
        { type: 'lines', name: 'Использовать не более 10 строк', heroText: 'Ты должен использовать максимум 10 строчек кода', linesCount: 10, required: true },
        { type: 'gems', name: 'Собрать алмазы', heroText: 'Давай соберем все алмазы', required: false },
      ],
      levers: [],
      bridges: [],
    },

    [6]: {
      height: 4,
      width: 9,
      grid: [
        ["tree","lawn","tree","watert","watert","watert","rock","tree","lawn",],
        ["sand","sand","grass","water","water","water","lawn","sand","tree",],
        ["lawn","sand","sand","water","water","water","sand","sand","sand",],
        ["lawn","rock","lawn","water","water","water","lawn","sand","lawn",],
      ],
      hero: { x: 2, y: 0 },
      finish: { x: 2, y: 8 },
      gems: [
        { x: 1, y: 6 },
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

    [7]: {
      height: 6,
      width: 9,
      grid: [
        ["tree","tree","lawn","watert","watert","watert","lawn","lawn","rock",],
        ["lawn","sand","sand","water","water","water","sand","sand","sand",],
        ["watert","watert","watert","water","water","water","watert","watert","watert",],
        ["water","water","water","water","water","water","water","water","water",],
        ["lawn","sand","sand","water","water","water","sand","sand","sand",],
        ["lawn","rock","lawn","water","water","water","lawn","rock","lawn",],
      ],
      hero: { x: 4, y: 8 },
      finish: { x: 1, y: 8 },
      gems: [
        { x: 1, y: 7 }, { x: 1, y: 0 }
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Проведи меня по мостам', required: true },
        { type: 'lines', name: 'Использовать не более 8 строчек кода', heroText: 'Тебе надо уложиться в 8 строчек кода', linesCount: 8, required: true },
        { type: 'gems', name: 'Подобрать алмаз', heroText: 'Сможем собрать все алмазы?', required: false },
      ],
      levers: [
        { x: 5, y: 6, name: "Мост1", activatesId: "bridge1", enabled: false },
        { x: 4, y: 0, name: "Мост2", activatesId: "bridge2", enabled: true },
        { x: 0, y: 2, name: "Мост3", activatesId: "bridge3", enabled: false },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 4, y: 3 },
          end: { x: 4, y: 5 },
          activated: false,
        },
        {
          id: "bridge2",
          vertical: true,
          start: { x: 2, y: 1 },
          end: { x: 3, y: 1 },
          activated: true,
        },
        {
          id: "bridge3",
          vertical: false,
          start: { x: 1, y: 3 },
          end: { x: 1, y: 5 },
          activated: false,
        },
      ],
    },
  
    [8]: {
      height: 7,
      width: 9,
      grid: [
        ["lawn","lawn","rock","watert","watert","watert","tree","sand","tree",],
        ["sand","sand","sand","water","water","water","sand","sand","lawn",],
        ["lawn","sand","lawn","water","water","water","rock","lawn","lawn",],
        ["watert","watert","watert","water","water","water","watert","watert","watert",],
        ["water","water","water","water","water","water","water","water","water",],
        ["sand","grass","sand","sand","lawn","sand","sand","rock","grass",],
        ["tree","grass","lawn","sand","sand","sand","lawn","lawn","sand",],
      ],
      hero: { x: 1, y: 0 },
      finish: { x: 6, y: 8 },
      gems: [
        { x: 1, y: 7 },
        { x: 5, y: 4 },
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
          hidden: true
        },
        {
          id: "bridge2",
          vertical: true,
          start: { x: 3, y: 1 },
          end: { x: 4, y: 1 },
          activated: false,
          hidden: true
        },
      ],
    },

    [9]: {
      height: 9,
      width: 5,
      grid: [
        ["rock","tree","sand","tree","rock"],
        ["lawn","lawn","sand","sand","lawn"],
        ["watert","watert","watert","watert","watert"],
        ["water","water","water","water","water"],
        ["water","water","water","water","water"],
        ["water","water","water","water","water"],
        ["rock","sand","sand","lawn","lawn"],
        ["sand","sand","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn","tree"],
      ],
      hero: { x: 0, y: 2 },
      finish: { x: 8, y: 2 },
      gems: [
        { x: 6, y: 2 },
        { x: 7, y: 2 },
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: 'Добраться до финиша на другом берегу', heroText: 'На том берегу много алмазов, давай перейдём на него', required: true },
        { type: 'lever', leverName: "Секретный", name: 'Найти название рычага и переключить его', heroText: 'Для этого надо выяснить название рычага,\nкоторый откроет мне мост', required: true },
        { type: 'gems', name: 'Подобрать все алмазы', required: true },
      ],
      levers: [
        { x: 1, y: 1, name: "Секретный", activatesId: "bridge1", enabled: false, hidden: true },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: true,
          start: { x: 2, y: 2 },
          end: { x: 5, y: 2 },
          activated: false,
        },
      ],
    },
  
    [10]: {
      height: 5,
      width: 8,
      grid: [
        ["tree","lawn","lawn","lawn","lawn","lawn","lawn","lawn",],
        ["sand","sand","rock","lawn","lawn","lawn","watert","watert",],
        ["lawn","sand","lawn","tree","watert","watert","water","water",],
        ["tree","sand","sand","lawn","rock","water","water","lawn",],
        ["lawn","lawn","sand","sand","sand","sand","sand","sand",],
      ],
      hero: { x: 0, y: 7 },
      finish: { x: 4, y: 7 },
      gems: [
        { x: 4, y: 0 },
      ],
      enemies: [
        { x: 0, y: 1, alive: true, name: "John" },
        { x: 4, y: 5, alive: true, name: "Greg" },
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Проведи меня до финиша', required: true },
        { type: 'enemies', name: 'Победить всех врагов', heroText: 'Дорогу преградили враги, надо их уничтожить', required: true },
        { type: 'gems', name: 'Подобрать алмаз', heroText: 'Было бы неплохо подобрать алмаз по пути', required: false },
      ],
      levers: [],
      bridges: [],
    },

    [11]: {
      height: 6,
      width: 13,
      grid: [
        ["tree","tree","tree","watert","watert","watert","watert","watert","watert","watert","tree","tree","tree",],
        ["lawn","sand","sand","water","water","water","water","water","water","water","sand","sand","lawn",],
        ["lawn","sand","lawn","water","water","water","sand","water","water","water","lawn","sand","lawn",],
        ["lawn","sand","lawn","water","water","rock","sand","rock","water","water","lawn","sand","lawn",],
        ["grass","sand","lawn","water","water","lawn","sand","lawn","water","water","lawn","sand","lawn",],
        ["rock","sand","rock","water","water","tree","sand","lawn","water","water","rock","sand","rock",],
      ],
      hero: { x: 1, y: 11 },
      finish: { x: 5, y: 1 },
      gems: [
        { x: 1, y: 1 },
        { x: 5, y: 6 },
      ],
      enemies: [
        { x: 1, y: 3, alive: true, name: "Alog" },
        { x: 1, y: 5, alive: true, name: "Bran" },
        { x: 1, y: 7, alive: true, name: "Cerk" },
        { x: 1, y: 9, alive: true, name: "Dunrum" },
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: null, required: true },
        { type: 'enemies', name: 'Победить всех врагов', heroText: 'Надо уничтожить всех врагов.\nМы можем сделать это как-то быстрее?', required: true },
        { type: 'lines', linesCount: 9, name: 'Использовать не больше 9 строк', heroText: null, required: true },
        { type: 'gems', name: 'Подобрать все алмазы', heroText: 'Попробуем достать все алмазы?', required: false },
      ],  
      levers: [
        { x: 5, y: 11, activatesId: 'bridge1', name: "Мост1", enabled: true },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 1, y: 3 },
          end: { x: 1, y: 9 },
          activated: true,
        },
      ],
    },
  
    [12]: {
      height: 5,
      width: 13,
      grid: [
        ["rock","rock","rock","watert","watert","sand","grass","tree","watert","watert","rock","rock","rock",],
        ["lawn","sand","grass","water","water","sand","lawn","grass","water","water","lawn","grass","lawn",],
        ["tree","sand","lawn","water","water","sand","lawn","lawn","water","water","tree","lawn","lawn",],
        ["lawn","sand","sand","water","water","sand","sand","sand","water","water","sand","sand","sand",],
        ["grass","lawn","lawn","water","water","lawn","lawn","lawn","water","water","lawn","lawn","grass",],
      ],
      hero: { x: 0, y: 5 },
      finish: { x: 3, y: 12 },
      gems: [
        { x: 1, y: 1 },
        { x: 3, y: 11 },
      ],
      enemies: [
        { x: 3, y: 2, alive: true, name: "Brad" },
        { x: 3, y: 10, alive: true, name: "Bobby" },
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Помоги мне добраться на другой берег', required: true },
        { type: 'gems', name: 'Подобрать все алмазы', heroText: 'Попробуем достать все алмазы?', required: false },
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

    [13]: {
      height: 7,
      width: 9,
      grid: [
        ["tree","tree","tree","lawn","rock","sand","lawn","watert","tree",],
        ["rock","lawn","sand","sand","sand","sand","lawn","water","watert",],
        ["watert","watert","watert","watert","watert","watert","watert","water","water",],
        ["water","water","water","water","water","water","water","water","water",],
        ["rock","lawn","sand","lawn","lawn","lawn","lawn","sand","water",],
        ["watert","lawn","sand","lawn","lawn","rock","lawn","sand","lawn",],
        ["water","watert","sand","sand","sand","sand","sand","sand","tree",],
      ],
      hero: { x: 4, y: 7 },
      finish: { x: 1, y: 6 },
      gems: [
        { x: 6, y: 7 }, { x: 1, y: 1 },
      ],
      enemies: [
        { x: 1, y: 5, alive: true, name: "BigBoy", big: true, moveFinish: { x: 4, y: 2 } },
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: null, required: true },
        { type: 'big_enemy_bridge', bridgeName: "bridge1", enemyName: "BigBoy", name: 'Не дать огромному рыцарю перейти мост', heroText: 'Нам не справиться с этим огромным рыцарем,\nнельзя пропустить его на наш берег!', required: true },
        { type: 'gems', name: 'Подобрать алмазы', heroText: null, required: false },
      ],
      levers: [
        { x: 4, y: 1, name: "Мост1", activatesId: "bridge1", enabled: true },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: true,
          start: { x: 2, y: 2 },
          end: { x: 3, y: 2 },
          activated: true,
        },
      ],
    },

    [14]: {
      height: 8,
      width: 3,
      grid: [
        ["rock","sand","rock",],
        ["lawn","sand","lawn",],
        ["sand","sand","lawn",],
        ["lawn","sand","lawn",],
        ["grass","sand","sand",],
        ["lawn","sand","rock",],
        ["sand","sand","lawn",],
        ["grass","sand","lawn",],
      ],
      hero: { x: 0, y: 1 },
      finish: { x: 7, y: 1 },
      gems: [
        { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
      ],
      enemies: [
        { x: 2, y: 0, alive: true, name: "Brad" },
        { x: 4, y: 2, alive: true, name: "Bobby" },
        { x: 6, y: 0, alive: true, name: "Greg" },
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Мне нужно дойти до финиша', required: true },
        { type: 'enemies', name: 'Победить всех врагов, используя переменные', heroText: 'И победить всех врагов по пути, используя переменные', required: true },
        { type: 'gems', name: 'Подобрать алмаз', heroText: 'Как удобно лежат алмазы, давай их соберем', required: false },
      ],  
      levers: [],
      bridges: [],
      onlyVariablesInAttack: true,
    },

    [15]: {
      height: 8,
      width: 8,
      grid: [
        ["rock","sand","rock","watert","watert","tree","sand","tree",],
        ["sand","sand","lawn","water","water","lawn","sand","sand",],
        ["lawn","lawn","lawn","water","water","lawn","sand","lawn",],
        ["watert","watert","watert","water","water","watert","watert","watert",],
        ["water","water","water","water","water","water","water","water",],
        ["lawn","sand","lawn","water","water","lawn","sand","sand",],
        ["lawn","sand","sand","tree","tree","lawn","lawn","sand",],
        ["rock","lawn","sand","sand","lawn","lawn","lawn","rock",],
      ],
      hero: { x: 0, y: 6 },
      finish: { x: 0, y: 1 },
      gems: [
        { x: 7, y: 4 },
      ],
      enemies: [
        { x: 7, y: 5, alive: true, name: "Tav" },
        { x: 2, y: 1, alive: true, name: "Liam" },
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: null, required: true },
        { type: 'var bridges', name: 'Открыть мосты, используя переменные', heroText: '', required: true },
        { type: 'enemies', name: 'Победить всех врагов, используя переменные', heroText: 'Помоги мне одолеть всех врагов и добраться\nдо финиша по мостам, используя переменные', required: true },
        { type: 'gems', name: 'Подобрать алмаз', heroText: 'Как удобно лежат алмазы, давай их соберем', required: false },
      ],  
      levers: [
        { x: 2, y: 7, name: "Мост1", activatesId: "bridge1", enabled: false },
        { x: 5, y: 0, name: "Мост2", activatesId: "bridge2", enabled: false },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: true,
          start: { x: 3, y: 6 },
          end: { x: 4, y: 6 },
          activated: false,
        },
        {
          id: "bridge2",
          vertical: true,
          start: { x: 3, y: 1 },
          end: { x: 4, y: 1 },
          activated: false,
        },
      ],
      onlyVariablesInAttack: true,
      onlyVariablesInSwitch: true,
    },
  
    [16]: {
      height: 7,
      width: 8,
      grid: [
        ["tree","sand","tree","lawn","lawn","grass","sand","lawn",],
        ["watert","sand","sand","sand","sand","sand","sand","lawn",],
        ["water","watert","lawn","sand","lawn","lawn","sand","lawn",],
        ["water","water","watert","watert","watert","rock","sand","lawn",],
        ["water","water","water","water","water","lawn","sand","rock",],
        ["water","water","water","water","water","tree","sand","lawn",],
        ["water","lawn","lawn","lawn","lawn","lawn","sand","sand",],
      ],
      hero: { x: 1, y: 2 },
      finish: { x: 6, y: 1 },
      gems: [
        { x: 1, y: 6 }, { x: 6, y: 7 },
      ],
      enemies: [
        { x: 1, y: 7, alive: true, name: "Hidden1", hidden: true },
        { x: 6, y: 5, alive: true, name: "Hidden2", hidden: true },
        { x: 6, y: 2, alive: true, name: "Hidden3", hidden: true },
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Нужно пробраться к финишу через этих безымянных врагов', required: true },
        { type: 'enemies', name: 'Победить всех врагов', heroText: 'Давай разузнаем их имена и прогоним отсюда', required: true },
        { type: 'gems', name: 'Собрать все алмазы', heroText: 'Алмазы всегда пригодятся, давай соберем их', required: false },
      ],  
      levers: [],
      bridges: [],
      onlyVariablesInAttack: true,
    },

    [17]: {
      height: 7,
      width: 9,
      grid: [
        ["rock","sand","rock","lawn","watert","watert","lawn","lawn","lawn",],
        ["lawn","sand","lawn","watert","water","water","watert","lawn","watert",],
        ["lawn","sand","watert","water","water","water","water","watert","water",],
        ["tree","sand","tree","water","water","water","water","water","water",],
        ["lawn","sand","sand","water","water","water","sand","sand","lawn",],
        ["rock","lawn","rock","water","water","water","watert","lawn","lawn",],
        ["lawn","lawn","watert","water","water","water","water","watert","lawn",],
      ],
      hero: { x: 4, y: 7 },
      finish: { x: 0, y: 1 },
      gems: [
        { x: 6, y: 1 }, { x: 0, y: 7 }
      ],
      enemies: [
        { x: 1, y: 7, alive: true, name: "Hidden1", hidden: true },
        { x: 5, y: 1, alive: true, name: "Hidden2", hidden: true },
        { x: 3, y: 1, alive: true, name: "Hidden3", hidden: true },
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: null, required: true },
        { type: 'enemies', name: 'Победить всех врагов', heroText: 'Надо узнать имена этих рыцарей,\nчтобы их прогнать', required: true },
        { type: 'gems', name: 'Собрать все алмазы', heroText: null, required: false },
      ],  
      levers: [
        { x: 4, y: 8, name: "Мост1", activatesId: "bridge1", enabled: false },
        { x: 0, y: 6, name: "ИспользуйМеняСУмом", activatesId: "bridge2", enabled: false, hidden: true },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: true,
          start: { x: 2, y: 7 },
          end: { x: 3, y: 7 },
          activated: false,
        },
        {
          id: "bridge2",
          vertical: false,
          start: { x: 4, y: 3 },
          end: { x: 4, y: 5 },
          activated: false,
        },
      ],
      onlyVariablesInAttack: true,
    },

    [18]: {
      height: 5,
      width: 9,
      grid: [
        ["lawn","watert","watert","watert","watert","watert","watert","watert","watert"],
        ["sand","sand","sand","water","water","rock","lawn","tree","lawn"],
        ["lawn","lawn","sand","sand","sand","lawn","lawn","lawn","tree"],
        ["tree","lawn","lawn","lawn","sand","sand","sand","lawn","lawn"],
        ["rock","lawn","rock","lawn","lawn","lawn","sand","sand","sand"],
      ],
      hero: { x: 0, y: 0 },
      finish: { x: 4, y: 8 },
      gems: [
        { x: 3, y: 5 },
        { x: 1, y: 2 },
      ],
      enemies: [],
      levers: [],
      bridges: [],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Проведи меня до финиша, используя цикл', required: true },
        { type: 'gems', name: 'Собрать все алмазы', required: true },
        { type: 'lines', name: 'Использовать не более 3 строк кода', heroText: 'Уложись в 3 строчки кода!', linesCount: 3, required: true },
      ],
      isWhileTrue: true,
    },

    [19]: {
      height: 9,
      width: 5,
      grid: [
        ["sand","sand","sand","sand","sand"],
        ["sand","watert","watert","watert","watert"],
        ["sand","lawn","lawn","lawn","lawn"],
        ["sand","rock","watert","watert","lawn"],
        ["sand","lawn","lawn","lawn","lawn"],
        ["sand","lawn","tree","lawn","lawn"],
        ["sand","lawn","lawn","lawn","lawn"],
        ["sand","tree","lawn","watert","watert"],
        ["sand","sand","sand","sand","lawn"],
      ],
      hero: { x: 8, y: 4 },
      finish: { x: 0, y: 4 },
      gems: [
        { x: 6, y: 4 },
        { x: 2, y: 4 },
        { x: 4, y: 4 },
      ],
      enemies: [],
      levers: [],
      bridges: [],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', required: true },
        { type: 'gems', name: 'Собрать все алмазы', heroText: 'Алмазы всегда пригодятся, давай соберем их', required: true },
        { type: 'lines', name: 'Использовать не более 4 строк кода', heroText: 'Снова используй цикл и уложись в 4 строчки кода', linesCount: 4, required: true },
      ],
      isWhileTrue: true,
    },

    [20]: {
      height: 9,
      width: 9,
      grid: [
        ["lawn","lawn","lawn","lawn","rock","watert","watert","watert","watert"],
        ["lawn","lawn","lawn","lawn","lawn","water","water","water","water"],
        ["watert","watert","watert","lawn","lawn","water","water","water","water"],
        ["water","water","tree","lawn","lawn","water","water","water","water"],
        ["water","lawn","lawn","lawn","lawn","water","water","sand","lawn"],
        ["water","watert","watert","watert","watert","water","water","sand","lawn"],
        ["tree","lawn","lawn","water","water","water","lawn","sand","lawn"],
        ["lawn","sand","sand","water","water","water","sand","sand","lawn"],
        ["lawn","lawn","lawn","water","water","water","lawn","lawn","tree"],
      ],
      hero: { x: 7, y: 7 },
      finish: { x: 1, y: 1 },
      gems: [
        { x: 7, y: 1 },
      ],
      enemies: [
        { x: 4, y: 6, alive: true, name: "Hidden1", hidden: true },
        { x: 1, y: 3, alive: true, name: "Hidden2", hidden: true },
      ],
      levers: [
        { x: 8, y: 7, activatesId: 'bridge1', name: "Мост1", enabled: false },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 7, y: 3 },
          end: { x: 7, y: 5 },
          activated: false,
        },
        {
          id: "bridge2",
          vertical: false,
          start: { x: 4, y: 5 },
          end: { x: 4, y: 6 },
          activated: true,
        }
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', required: true },
        { type: 'gems', name: 'Подобрать алмаз', heroText: 'Давай сначала заберём этот алмаз', required: false },
        { type: 'lines', name: 'Использовать не более 8 строк кода', heroText: 'А потом дойдём до финиша, используя цикл', linesCount: 8, required: true },
      ],
      isWhileTrue: true,
    },

    [21]: {
      height: 9,
      width: 9,
      grid: [
        ["lawn","lawn","tree","lawn","watert","watert","watert","watert","watert"],
        ["sand","lawn","lawn","lawn","lawn","water","water","water","water"],
        ["sand","sand","sand","lawn","lawn","rock","water","water","water"],
        ["watert","lawn","sand","tree","lawn","lawn","lawn","water","water"],
        ["water","watert","sand","sand","sand","lawn","lawn","tree","water"],
        ["water","water","watert","lawn","sand","lawn","lawn","lawn","rock"],
        ["water","water","water","lawn","sand","sand","sand","lawn","lawn"],
        ["water","water","lawn","lawn","lawn","lawn","sand","lawn","lawn"],
        ["water","lawn","lawn","tree","lawn","lawn","sand","sand","sand"],
      ],
      hero: { x: 0, y: 0 },
      finish: { x: 8, y: 8 },
      gems: [
      ],
      enemies: [
        { x: 2, y: 1, alive: true, name: "Hidden1", hidden: true },
        { x: 6, y: 5, alive: true, name: "Hidden2", hidden: true },
      ],
      levers: [
      ],
      bridges: [
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', required: true },
        { type: 'lines', name: 'Использовать не более 7 строк кода', linesCount: 7, required: true },
      ],
      isWhileTrue: true,
    },

    [22]: {
      height: 6,
      width: 13,
      grid: [
        ["lawn","watert","tree","watert","watert","lawn","rock","sand","tree","sand","watert","watert","watert"],
        ["sand","water","sand","sand","lawn","lawn","lawn","sand","lawn","sand","sand","sand","sand"],
        ["sand","water","sand","lawn","lawn","lawn","lawn","sand","lawn","lawn","lawn","lawn","lawn"],
        ["sand","sand","sand","lawn","lawn","lawn","lawn","sand","sand","sand","lawn","lawn","lawn"],
        ["sand","watert","rock","lawn","tree","watert","lawn","lawn","lawn","sand","lawn","rock","lawn"],
        ["sand","water","watert","lawn","watert","water","lawn","rock","tree","sand","watert","watert","lawn"]
      ],
      hero: { x: 1, y: 0 },
      finish: { x: 1, y: 12 },
      gems: [
        { x: 5, y: 0 },
        { x: 5, y: 3 },
        { x: 5, y: 6 },
        { x: 5, y: 9 },
      ],
      enemies: [
        { x: 2, y: 2, alive: true, name: "Hidden1", hidden: true },
        { x: 2, y: 5, alive: true, name: "Hidden2", hidden: true },
        { x: 2, y: 11, alive: true, name: "Hidden3", hidden: true },
      ],
      levers: [
      ],
      bridges: [
      ],
      goals: [
        { type: 'finish', name: 'Добраться до финиша', required: true },
        { type: 'lines', name: 'Использовать не более 9 строк кода', linesCount: 9, required: true },
        { type: 'gems', name: 'Собрать все алмазы', heroText: 'Сможем захватит с собой все алмазы?', required: false },
      ],
      isWhileTrue: true,
    },

    // [23]: {
    //   height: 9,
    //   width: 13,
    //   grid: [
    //     ["tree","lawn","lawn","watert","watert","tree","lawn", "rock","watert","watert","watert","watert","watert",],
    //     ["lawn","sand","sand","water","water","sand","sand", "lawn","water","water","water","water","water",],
    //     ["rock","lawn","lawn","water","water","lawn","sand", "lawn","water","water","water","water","water",],
    //     ["watert","watert","watert","water","water","watert","watert", "watert","water","water","water","water","water",],
    //     ["water","water","water","water","water","water","water", "water","water","water","water","water","water",],
    //     ["water","water","water","water","water","water","water", "water","water","water","water","water","water",],
    //     ["water","water","water","water","water","rock","sand", "lawn","water","water","lawn","tree","rock"],
    //     ["water","water","water","water","water","sand","sand", "sand","water","water","lawn","lawn","lawn"],
    //     ["water","water","water","water","water","tree","lawn", "lawn","water","water","lawn","lawn","rock"],
    //   ],
    //   hero: { x: 1, y: 1 },
    //   finish: { x: 7, y: 12 },
    //   gems: [
    //     { x: 1, y: 6 },
    //     { x: 7, y: 6 },
    //     { x: 7, y: 11 },
    //   ],
    //   enemies: [
    //   ],
    //   goals: [
    //     { type: 'finish', name: 'Добраться до финиша', heroText: 'Давай аккуратно пройдём по этим островкам', required: true },
    //     { type: 'gems', name: 'Собрать все алмазы', heroText: 'Не забудь про алмазы', required: false },
    //   ],  
    //   levers: [
    //     { x: 2, y: 2, activatesId: 'bridge1', name: "Мост1", enabled: false },
    //     { x: 2, y: 7, activatesId: 'bridge2', name: "Мост2", enabled: true },
    //     { x: 8, y: 7, activatesId: 'bridge3', name: "Мост3", enabled: false },
    //   ],
    //   bridges: [
    //     {
    //       id: "bridge1",
    //       vertical: false,
    //       start: { x: 1, y: 3 },
    //       end: { x: 1, y: 4 },
    //       activated: false,
    //       random: true
    //     },
    //     {
    //       id: "bridge2",
    //       vertical: true,
    //       start: { x: 3, y: 6 },
    //       end: { x: 5, y: 6 },
    //       activated: true,
    //       random: true
    //     },
    //     {
    //       id: "bridge3",
    //       vertical: false,
    //       start: { x: 7, y: 8 },
    //       end: { x: 7, y: 9 },
    //       activated: false,
    //       random: true
    //     },
    //   ],
    //   additionalVariants: [
    //     {
    //       levers: [
    //         { x: 2, y: 2, activatesId: 'bridge1', name: "Мост1", enabled: false },
    //         { x: 2, y: 7, activatesId: 'bridge2', name: "Мост2", enabled: false },
    //         { x: 8, y: 7, activatesId: 'bridge3', name: "Мост3", enabled: false },
    //       ],
    //     },
    //     {
    //       levers: [
    //         { x: 2, y: 2, activatesId: 'bridge1', name: "Мост1", enabled: true },
    //         { x: 2, y: 7, activatesId: 'bridge2', name: "Мост2", enabled: false },
    //         { x: 8, y: 7, activatesId: 'bridge3', name: "Мост3", enabled: true },
    //       ],
    //     },
    //     {
    //       levers: [
    //         { x: 2, y: 2, activatesId: 'bridge1', name: "Мост1", enabled: false },
    //         { x: 2, y: 7, activatesId: 'bridge2', name: "Мост2", enabled: true },
    //         { x: 8, y: 7, activatesId: 'bridge3', name: "Мост3", enabled: true },
    //       ],
    //     },
    //     {
    //       levers: [
    //         { x: 2, y: 2, activatesId: 'bridge1', name: "Мост1", enabled: true },
    //         { x: 2, y: 7, activatesId: 'bridge2', name: "Мост2", enabled: true },
    //         { x: 8, y: 7, activatesId: 'bridge3', name: "Мост3", enabled: false },
    //       ],
    //     },{
    //       levers: [
    //         { x: 2, y: 2, activatesId: 'bridge1', name: "Мост1", enabled: true },
    //         { x: 2, y: 7, activatesId: 'bridge2', name: "Мост2", enabled: true },
    //         { x: 8, y: 7, activatesId: 'bridge3', name: "Мост3", enabled: true },
    //       ],
    //     },
    //   ],
    // },

    // [24]: {
    //   height: 8,
    //   width: 8,
    //   grid: [
    //     ["tree","lawn","tree","lawn","lawn","watert","watert","rock"],
    //     ["lawn","lawn","lawn","rock","watert","water","rock","lawn"],
    //     ["lawn","lawn","lawn","watert","water","lawn","lawn","lawn"],
    //     ["watert","watert","watert","water","water","watert","watert","watert"],
    //     ["water","water","water","water","water","water","water","water"],
    //     ["lawn","lawn","lawn","lawn","lawn","lawn","lawn","water"],
    //     ["lawn","lawn","lawn","lawn","rock","lawn","lawn","lawn"],
    //     ["rock","lawn","lawn","tree","rock","lawn","lawn","tree"],
    //   ],
    //   hero: { x: 5, y: 1 },
    //   finish: { x: 7, y: 5 },
    //   gems: [
    //     { x: 0, y: 1 },
    //     { x: 2, y: 7 },
    //   ],
    //   enemies: [
    //     { x: 2, y: 1, alive: true, name: "Crook" },
    //     { x: 2, y: 6, alive: true, name: "Brin" },
    //   ],
    //   goals: [
    //     { type: 'finish', name: 'Добраться до финиша', heroText: null, required: true },
    //     { type: 'enemies', name: 'Победить всех врагов', heroText: 'Давай победим всех встретившихся врагов', required: true },
    //     { type: 'gems', name: 'Собрать все алмазы', heroText: 'И соберем все алмазы', required: true },
    //   ],  
    //   levers: [
    //     { x: 5, y: 0, activatesId: 'bridge1', name: "Мост1", enabled: false },
    //     { x: 5, y: 6, activatesId: 'bridge2', name: "Мост2", enabled: true },
    //   ],
    //   additionalVariants: [
    //     {
    //       levers: [
    //         { x: 5, y: 0, activatesId: 'bridge1', name: "Мост1", enabled: true },
    //         { x: 5, y: 6, activatesId: 'bridge2', name: "Мост2", enabled: false },
    //       ],
    //     },
    //     {
    //       levers: [
    //         { x: 5, y: 0, activatesId: 'bridge1', name: "Мост1", enabled: false },
    //         { x: 5, y: 6, activatesId: 'bridge2', name: "Мост2", enabled: false },
    //       ],
    //     },
    //     {
    //       levers: [
    //         { x: 5, y: 0, activatesId: 'bridge1', name: "Мост1", enabled: true },
    //         { x: 5, y: 6, activatesId: 'bridge2', name: "Мост2", enabled: true },
    //       ],
    //     },
    //   ],
    //   bridges: [
    //     {
    //       id: "bridge1",
    //       vertical: true,
    //       start: { x: 3, y: 1 },
    //       end: { x: 4, y: 1 },
    //       activated: false,
    //       random: true  
    //     },
    //     {
    //       id: "bridge2",
    //       vertical: true,
    //       start: { x: 3, y: 5 },
    //       end: { x: 4, y: 5 },
    //       activated: true,
    //       random: true
    //     },
    //   ],
    //   checksCount: 4,
    // },
  
    // [25]: {
    //   height: 7,
    //   width: 9,
    //   grid: [
    //     ["lawn","sand","tree","rock","watert","watert","watert","watert","lawn"],
    //     ["sand","sand","sand","sand","tree","water","water","lawn","lawn"],
    //     ["tree","sand","lawn","sand","sand","water","tree","lawn","lawn"],
    //     ["sand","sand","lawn","lawn","sand","lawn","rock","tree","lawn"],
    //     ["lawn","tree","lawn","lawn","sand","lawn","lawn","lawn","lawn"],
    //     ["lawn","lawn","tree","lawn","watert","tree","lawn","lawn","watert"],
    //     ["tree","lawn","watert","watert","water","watert","lawn","watert","water"],
    //   ],
    //   hero: { x: 0, y: 1 },
    //   finish: { x: 0, y: 8 },
    //   gems: [
    //     { x: 6, y: 6 },
    //     { x: 1, y: 3 },
    //   ],
    //   enemies: [
    //     { x: 5, y: 3, alive: true, name: "Hidden1", hidden: true, random: true },
    //     { x: 5, y: 7, alive: true, name: "Hidden3", hidden: true, random: true },
    //     { x: 1, y: 7, alive: true, name: "Hidden2", hidden: true, random: true },
    //   ],
    //   additionalVariants: [
    //     {
    //       enemies: [
    //         { x: 5, y: 3, alive: false, name: "Hidden1", hidden: true, random: true },
    //         { x: 5, y: 7, alive: true, name: "Hidden3", hidden: true, random: true },
    //         { x: 1, y: 7, alive: true, name: "Hidden2", hidden: true, random: true },
    //       ],
    //     },
    //     {
    //       enemies: [
    //         { x: 5, y: 3, alive: true, name: "Hidden1", hidden: true, random: true },
    //         { x: 5, y: 7, alive: true, name: "Hidden3", hidden: true, random: true },
    //         { x: 1, y: 7, alive: false, name: "Hidden2", hidden: true, random: true },
    //       ],
    //     },
    //     {
    //       enemies: [
    //         { x: 5, y: 3, alive: false, name: "Hidden1", hidden: true, random: true },
    //         { x: 5, y: 7, alive: false, name: "Hidden3", hidden: true, random: true },
    //         { x: 1, y: 7, alive: true, name: "Hidden2", hidden: true, random: true },
    //       ],
    //     },
    //   ],
    //   goals: [
    //     { type: 'finish', name: 'Добраться до финиша', heroText: 'Проведи меня через этот таинственный лес', required: true },
    //     { type: 'enemies', name: 'Победить всех врагов', heroText: 'В лесу могут прятаться враги,\nнадо их найти и победить', required: true },
    //     { type: 'gems', name: 'Собрать все алмазы', heroText: 'И не забудь про алмазы!', required: false },
    //   ],
    //   levers: [],
    //   bridges: [],
    //   onlyVariablesInAttack: true,
    //   checksCount: 4,
    // },

    // [26]: {
    //   height: 7,
    //   width: 9,
    //   grid: [
    //     ["tree","sand","tree","lawn","watert","watert","watert","tree","lawn"],
    //     ["lawn","sand","sand","sand","water","water","sand","sand","tree"],
    //     ["tree","watert","watert","watert","water","water","watert","lawn","rock"],
    //     ["watert","water","water","water","water","water","water","lawn","watert"],
    //     ["water","water","lawn","tree","water","water","tree","lawn","tree"],
    //     ["tree","sand","sand","sand","water","water","sand","sand","lawn"],
    //     ["lawn","sand","rock","watert","water","water","watert","watert","watert"],
    //   ],
    //   hero: { x: 0, y: 1 },
    //   finish: { x: 5, y: 1 },
    //   gems: [
    //     { x: 1, y: 7 },
    //     { x: 5, y: 7 },
    //   ],
    //   enemies: [
    //     { x: 1, y: 6, alive: true, name: "Hidden1", hidden: true, random: true },
    //     { x: 5, y: 6, alive: true, name: "Hidden2", hidden: true, random: true },
    //   ],
    //   additionalVariants: [
    //     {
    //       enemies: [
    //         { x: 1, y: 6, alive: false, name: "Hidden1", hidden: true, random: true },
    //         { x: 5, y: 6, alive: true, name: "Hidden2", hidden: true, random: true },
    //       ],
    //       levers: [
    //         { x: 0, y: 3, activatesId: 'bridge1', name: "Мост1", enabled: true },
    //         { x: 5, y: 8, activatesId: 'bridge2', name: "Мост2", enabled: false },
    //       ],
    //     },
    //     {
    //       enemies: [
    //         { x: 1, y: 6, alive: true, name: "Hidden1", hidden: true, random: true },
    //         { x: 5, y: 6, alive: false, name: "Hidden2", hidden: true, random: true },
    //       ],
    //       levers: [
    //         { x: 0, y: 3, activatesId: 'bridge1', name: "Мост1", enabled: false },
    //         { x: 5, y: 8, activatesId: 'bridge2', name: "Мост2", enabled: false },
    //       ],
    //     },
    //     {
    //       enemies: [
    //         { x: 1, y: 6, alive: false, name: "Hidden1", hidden: true, random: true },
    //         { x: 5, y: 6, alive: false, name: "Hidden2", hidden: true, random: true },
    //       ],
    //       levers: [
    //         { x: 0, y: 3, activatesId: 'bridge1', name: "Мост1", enabled: true },
    //         { x: 5, y: 8, activatesId: 'bridge2', name: "Мост2", enabled: true },
    //       ],
    //     },
    //   ],
    //   goals: [
    //     { type: 'finish', name: 'Добраться до финиша', required: true },
    //     { type: 'enemies', name: 'Победить всех врагов', required: true },
    //     { type: 'gems', name: 'Собрать все алмазы', required: false },
    //   ],  
    //   levers: [
    //     { x: 0, y: 3, activatesId: 'bridge1', name: "Мост1", enabled: false },
    //     { x: 5, y: 8, activatesId: 'bridge2', name: "Мост2", enabled: true },
    //   ],
    //   bridges: [
    //     {
    //       id: "bridge1",
    //       vertical: false,
    //       start: { x: 1, y: 4 },
    //       end: { x: 1, y: 5 },
    //       activated: false,
    //       random: true,
    //     },
    //     {
    //       id: "bridge2",
    //       vertical: false,
    //       start: { x: 5, y: 4 },
    //       end: { x: 5, y: 5 },
    //       activated: true,
    //       random: true,
    //     }
    //   ],
    //   onlyVariablesInAttack: true,
    //   checksCount: 4,
    // },

    // [27]: {
    //   id: 'if-guarded-gems',
    //   height: 7,
    //   width: 9,
    //   grid: [
    //     ["tree","sand","tree","lawn","watert","watert","lawn","lawn","rock"],
    //     ["lawn","sand","sand","sand","water","water","sand","sand","lawn"],
    //     ["tree","lawn","lawn","sand","water","water","lawn","lawn","lawn"],
    //     ["rock","lawn","lawn","sand","water","water","watert","watert","watert"],
    //     ["lawn","lawn","lawn","sand","water","water","tree","lawn","lawn"],
    //     ["tree","sand","sand","sand","water","water","sand","sand","rock"],
    //     ["lawn","sand","rock","lawn","water","water","lawn","lawn","lawn"],
    //   ],
    //   hero: { x: 0, y: 1 },
    //   finish: { x: 6, y: 1 },
    //   gems: [
    //     { x: 1, y: 7, guardedBy: "Hidden1" },
    //     { x: 5, y: 7, guardedBy: "Hidden2" },
    //   ],
    //   enemies: [
    //     { x: 1, y: 4, alive: true, name: "Hidden1", hidden: true, random: true },
    //     { x: 5, y: 4, alive: true, name: "Hidden2", hidden: true, random: true },
    //   ],
    //   additionalVariants: {
    //     enemies: [
    //       [
    //         { x: 1, y: 4, alive: false, name: "Hidden1", hidden: true, random: true },
    //         { x: 5, y: 4, alive: true, name: "Hidden2", hidden: true, random: true },
    //       ],
    //       [
    //         { x: 1, y: 4, alive: true, name: "Hidden1", hidden: true, random: true },
    //         { x: 5, y: 4, alive: false, name: "Hidden2", hidden: true, random: true },
    //       ],
    //       [
    //         { x: 1, y: 4, alive: false, name: "Hidden1", hidden: true, random: true },
    //         { x: 5, y: 4, alive: false, name: "Hidden2", hidden: true, random: true },
    //       ],
    //     ],
    //     randomVariantsCount: 0,
    //   },
    //   goals: [
    //     { type: 'finish', name: 'Добраться до финиша', required: true },
    //     { type: 'enemies', name: 'Победить всех врагов', required: true },
    //     { type: 'gems', name: 'Собрать все доступные алмазы', heroText: 'Если остров охраняют, значит на нем есть алмаз — давай заберем их', required: true },
    //     { type: 'no-unnecessary-islands', name: 'Не заходить на остров без алмаза', heroText: 'Но я не хочу заходить на остров, если на нем нет алмаза', required: true },
    //   ],  
    //   levers: [],
    //   bridges: [
    //     {
    //       id: "bridge1",
    //       vertical: false,
    //       start: { x: 1, y: 4 },
    //       end: { x: 1, y: 5 },
    //       activated: true,
    //     },
    //     {
    //       id: "bridge2",
    //       vertical: false,
    //       start: { x: 5, y: 4 },
    //       end: { x: 5, y: 5 },
    //       activated: true,
    //     }
    //   ],
    //   onlyVariablesInAttack: true,
    //   checksCount: 4,
    // },
  }
}