export const levels = {
  ["first-steps"]: {
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
      height: 2,
      width: 7,
      grid: [
        ["tree","lawn","sand","lawn","rock","lawn","rock",],
        ["grass","lawn","sand","sand","sand","sand","sand",],
      ],
      hero: { x: 1, y: 0 },
      finish: { x: 1, y: 6 },
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
  },
  ["fights-on-bridges"]: {
    [1]: {
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
  
    [2]: {
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

    [3]: {
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
  
    [4]: {
      height: 3,
      width: 8,
      grid: [
        ["lawn","lawn","lawn","grass","lawn","lawn","lawn","lawn",],
        ["sand","sand","rock","rock","rock","rock","rock","rock",],
        ["grass","sand","sand","sand","lawn","lawn","grass","lawn",],
      ],
      hero: { x: 0, y: 7 },
      finish: { x: 2, y: 7 },
      gems: [
        { x: 0, y: 0 },
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
  
    [5]: {
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
  },
  ["variables"]: {
    [1]: {
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
  
    [2]: {
      height: 8,
      width: 8,
      grid: [
        ["tree","sand","tree","lawn","lawn","grass","sand","lawn",],
        ["lawn","sand","sand","sand","sand","sand","sand","lawn",],
        ["grass","lawn","lawn","sand","lawn","lawn","sand","lawn",],
        ["watert","watert","watert","watert","watert","rock","sand","rock",],
        ["water","water","water","water","water","lawn","sand","rock",],
        ["water","water","water","water","water","lawn","sand","rock",],
        ["lawn","sand","sand","sand","sand","sand","sand","grass",],
        ["lawn","sand","lawn","grass","lawn","lawn","sand","sand",],
      ],
      hero: { x: 1, y: 2 },
      finish: { x: 7, y: 1 },
      gems: [
        { x: 1, y: 6 }, { x: 6, y: 7 },
      ],
      enemies: [
        { x: 1, y: 7, alive: true, name: "Hidden1", hidden: true },
        { x: 6, y: 5, alive: true, name: "Hidden2", hidden: true },
        { x: 6, y: 0, alive: true, name: "Hidden3", hidden: true },
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
  },
  ["what-if"]: {
    [1]: {
      height: 9,
      width: 15,
      grid: [
        ["tree","lawn","lawn","watert","watert","watert","lawn","lawn", "rock","watert","watert","watert","watert","watert", "watert"],
        ["lawn","sand","sand","water","water","water","sand","sand", "lawn","water","water","water","water","water", "water"],
        ["grass","lawn","lawn","water","water","water","lawn","sand", "lawn","water","water","water","water","water", "water"],
        ["watert","watert","watert","water","water","water","watert","watert", "watert","water","water","water","water","water", "water"],
        ["water","water","water","water","water","water","water","water", "water","water","water","water","water","water", "water"],
        ["water","water","water","water","water","water","water","water", "water","water","water","water","water","water", "water"],
        ["water","water","water","water","water","water","rock","sand", "lawn","water","water","water","lawn","lawn", "rock"],
        ["water","water","water","water","water","water","sand","sand", "sand","water","water","water","lawn","lawn", "lawn"],
        ["water","water","water","water","water","water","tree","lawn", "lawn","water","water","water","lawn","lawn", "lawn"],
      ],
      hero: { x: 1, y: 7 },
      finish: { x: 7, y: 14 },
      gems: [
        { x: 1, y: 1 }, { x: 7, y: 13 }
      ],
      enemies: [
        { x: 1, y: 2, alive: true, name: "Hidden1", hidden: true, random: true },
        { x: 6, y: 7, alive: true, name: "Hidden2", hidden: true, random: true },
        { x: 7, y: 12, alive: true, name: "Hidden3", hidden: true, random: true },
      ],
      additionalVariants: {
        enemies: [
          [
            { x: 1, y: 2, alive: false, name: "Hidden1", hidden: true, random: true },
            { x: 6, y: 7, alive: true, name: "Hidden2", hidden: true, random: true },
            { x: 7, y: 12, alive: true, name: "Hidden3", hidden: true, random: true },
          ],
          [
            { x: 1, y: 2, alive: true, name: "Hidden1", hidden: true, random: true },
            { x: 6, y: 7, alive: true, name: "Hidden2", hidden: true, random: true },
            { x: 7, y: 12, alive: false, name: "Hidden3", hidden: true, random: true },
          ],
          [
            { x: 1, y: 2, alive: true, name: "Hidden1", hidden: true, random: true },
            { x: 6, y: 7, alive: false, name: "Hidden2", hidden: true, random: true },
            { x: 7, y: 12, alive: true, name: "Hidden3", hidden: true, random: true },
          ],
        ],
        randomVariantsCount: 2,
      },
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Опасность поджидает на каждому шагу,\nпомоги мне добраться до финиша', required: true },
        { type: 'enemies', name: 'Победить всех врагов', heroText: 'На островках могут скрываться враги, надо их победить', required: true },
        { type: 'gems', name: 'Собрать все алмазы', heroText: 'Не забудь про алмазы', required: false },
      ],  
      levers: [],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 1, y: 3 },
          end: { x: 1, y: 5 },
          activated: true,
        },
        {
          id: "bridge2",
          vertical: true,
          start: { x: 3, y: 7 },
          end: { x: 5, y:7 },
          activated: true,
        },
        {
          id: "bridge3",
          vertical: false,
          start: { x: 7, y: 9 },
          end: { x: 7, y: 11 },
          activated: true,
        },
      ],
      onlyVariablesInAttack: true,
      checksCount: 4,
    },
  
    [2]: {
      height: 7,
      width: 8,
      grid: [
        ["tree","sand","sand","watert","watert","sand","lawn","grass"],
        ["grass","tree","sand","water","water","sand","lawn","lawn"],
        ["lawn","lawn","sand","water","water","sand","rock","rock"],
        ["sand","sand","sand","sand","sand","sand","grass","lawn"],
        ["lawn","grass","sand","watert","watert","sand","sand","sand"],
        ["lawn","sand","watert","water","sand","sand","watert","watert"],
        ["sand","watert","water","sand","grass","lawn","water","sand"],
      ],
      hero: { x: 3, y: 0 },
      finish: { x: 6, y: 5 },
      gems: [
        { x: 0, y: 6 },
      ],
      enemies: [
        { x: 2, y: 5, alive: true, name: "Hidden1", hidden: true, random: true },
        { x: 4, y: 5, alive: true, name: "Hidden2", hidden: true, random: true },
      ],
      additionalVariants: {
        enemies: [
          [
            { x: 2, y: 5, alive: false, name: "Hidden1", hidden: true, random: true },
            { x: 4, y: 5, alive: true, name: "Hidden2", hidden: true, random: true },
          ],
          [
            { x: 2, y: 5, alive: true, name: "Hidden1", hidden: true, random: true },
            { x: 4, y: 5, alive: false, name: "Hidden2", hidden: true, random: true },
          ],
          [
            { x: 2, y: 5, alive: false, name: "Hidden1", hidden: true, random: true },
            { x: 4, y: 5, alive: false, name: "Hidden2", hidden: true, random: true },
          ],
        ],
        randomVariantsCount: 0,
      },
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Проведи меня до финиша', required: true },
        { type: 'enemies', name: 'Победить всех врагов', heroText: 'Давай победим всех встретившихся врагов', required: true },
        { type: 'gems', name: 'Собрать все алмазы', heroText: 'И захватим этот алмаз', required: false },
      ],  
      levers: [],
      bridges: [],
      onlyVariablesInAttack: true,
      checksCount: 4,
    },

    [3]: {
      id: 'if-guarded-gems',
      height: 7,
      width: 9,
      grid: [
        ["tree","sand","tree","lawn","watert","watert","lawn","lawn","rock"],
        ["lawn","sand","sand","sand","water","water","sand","sand","lawn"],
        ["tree","lawn","lawn","sand","water","water","lawn","lawn","lawn"],
        ["rock","lawn","lawn","sand","water","water","watert","watert","watert"],
        ["lawn","lawn","lawn","sand","water","water","tree","lawn","lawn"],
        ["tree","sand","sand","sand","water","water","sand","sand","rock"],
        ["lawn","sand","rock","lawn","water","water","lawn","lawn","lawn"],
      ],
      hero: { x: 0, y: 1 },
      finish: { x: 6, y: 1 },
      gems: [
        { x: 1, y: 7, guardedBy: "Hidden1" },
        { x: 5, y: 7, guardedBy: "Hidden2" },
      ],
      enemies: [
        { x: 1, y: 4, alive: true, name: "Hidden1", hidden: true, random: true },
        { x: 5, y: 4, alive: true, name: "Hidden2", hidden: true, random: true },
      ],
      additionalVariants: {
        enemies: [
          [
            { x: 1, y: 4, alive: false, name: "Hidden1", hidden: true, random: true },
            { x: 5, y: 4, alive: true, name: "Hidden2", hidden: true, random: true },
          ],
          [
            { x: 1, y: 4, alive: true, name: "Hidden1", hidden: true, random: true },
            { x: 5, y: 4, alive: false, name: "Hidden2", hidden: true, random: true },
          ],
          [
            { x: 1, y: 4, alive: false, name: "Hidden1", hidden: true, random: true },
            { x: 5, y: 4, alive: false, name: "Hidden2", hidden: true, random: true },
          ],
        ],
        randomVariantsCount: 0,
      },
      goals: [
        { type: 'finish', name: 'Добраться до финиша', required: true },
        { type: 'enemies', name: 'Победить всех врагов', required: true },
        { type: 'gems', name: 'Собрать все доступные алмазы', heroText: 'Если остров охраняют, значит на нем есть алмаз — давай заберем их', required: true },
        { type: 'no-unnecessary-islands', name: 'Не заходить на остров без алмаза', heroText: 'Но я не хочу заходить на остров, если на нем нет алмаза', required: true },
      ],  
      levers: [],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 1, y: 4 },
          end: { x: 1, y: 5 },
          activated: true,
        },
        {
          id: "bridge2",
          vertical: false,
          start: { x: 5, y: 4 },
          end: { x: 5, y: 5 },
          activated: true,
        }
      ],
      onlyVariablesInAttack: true,
      checksCount: 4,
    },
  },

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
      height: 2,
      width: 7,
      grid: [
        ["tree","lawn","sand","lawn","rock","lawn","rock",],
        ["grass","lawn","sand","sand","sand","sand","sand",],
      ],
      hero: { x: 1, y: 0 },
      finish: { x: 1, y: 6 },
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

    [8]: {
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
  
    [9]: {
      height: 3,
      width: 8,
      grid: [
        ["lawn","lawn","lawn","grass","lawn","lawn","lawn","lawn",],
        ["sand","sand","rock","rock","rock","rock","rock","rock",],
        ["grass","sand","sand","sand","lawn","lawn","grass","lawn",],
      ],
      hero: { x: 0, y: 7 },
      finish: { x: 2, y: 7 },
      gems: [
        { x: 0, y: 0 },
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
  
    [10]: {
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

    [11]: {
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
  
    [12]: {
      height: 8,
      width: 8,
      grid: [
        ["tree","sand","tree","lawn","lawn","grass","sand","lawn",],
        ["lawn","sand","sand","sand","sand","sand","sand","lawn",],
        ["grass","lawn","lawn","sand","lawn","lawn","sand","lawn",],
        ["watert","watert","watert","watert","watert","rock","sand","rock",],
        ["water","water","water","water","water","lawn","sand","rock",],
        ["water","water","water","water","water","lawn","sand","rock",],
        ["lawn","sand","sand","sand","sand","sand","sand","grass",],
        ["lawn","sand","lawn","grass","lawn","lawn","sand","sand",],
      ],
      hero: { x: 1, y: 2 },
      finish: { x: 7, y: 1 },
      gems: [
        { x: 1, y: 6 }, { x: 6, y: 7 },
      ],
      enemies: [
        { x: 1, y: 7, alive: true, name: "Hidden1", hidden: true },
        { x: 6, y: 5, alive: true, name: "Hidden2", hidden: true },
        { x: 6, y: 0, alive: true, name: "Hidden3", hidden: true },
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

    [13]: {
      height: 9,
      width: 15,
      grid: [
        ["tree","lawn","lawn","watert","watert","watert","lawn","lawn", "rock","watert","watert","watert","watert","watert", "watert"],
        ["lawn","sand","sand","water","water","water","sand","sand", "lawn","water","water","water","water","water", "water"],
        ["grass","lawn","lawn","water","water","water","lawn","sand", "lawn","water","water","water","water","water", "water"],
        ["watert","watert","watert","water","water","water","watert","watert", "watert","water","water","water","water","water", "water"],
        ["water","water","water","water","water","water","water","water", "water","water","water","water","water","water", "water"],
        ["water","water","water","water","water","water","water","water", "water","water","water","water","water","water", "water"],
        ["water","water","water","water","water","water","rock","sand", "lawn","water","water","water","lawn","lawn", "rock"],
        ["water","water","water","water","water","water","sand","sand", "sand","water","water","water","lawn","lawn", "lawn"],
        ["water","water","water","water","water","water","tree","lawn", "lawn","water","water","water","lawn","lawn", "lawn"],
      ],
      hero: { x: 1, y: 7 },
      finish: { x: 7, y: 14 },
      gems: [
        { x: 1, y: 1 }, { x: 7, y: 13 }
      ],
      enemies: [
        { x: 1, y: 2, alive: true, name: "Hidden1", hidden: true, random: true },
        { x: 6, y: 7, alive: true, name: "Hidden2", hidden: true, random: true },
        { x: 7, y: 12, alive: true, name: "Hidden3", hidden: true, random: true },
      ],
      additionalVariants: {
        enemies: [
          [
            { x: 1, y: 2, alive: false, name: "Hidden1", hidden: true, random: true },
            { x: 6, y: 7, alive: true, name: "Hidden2", hidden: true, random: true },
            { x: 7, y: 12, alive: true, name: "Hidden3", hidden: true, random: true },
          ],
          [
            { x: 1, y: 2, alive: true, name: "Hidden1", hidden: true, random: true },
            { x: 6, y: 7, alive: true, name: "Hidden2", hidden: true, random: true },
            { x: 7, y: 12, alive: false, name: "Hidden3", hidden: true, random: true },
          ],
          [
            { x: 1, y: 2, alive: true, name: "Hidden1", hidden: true, random: true },
            { x: 6, y: 7, alive: false, name: "Hidden2", hidden: true, random: true },
            { x: 7, y: 12, alive: true, name: "Hidden3", hidden: true, random: true },
          ],
        ],
        randomVariantsCount: 2,
      },
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Опасность поджидает на каждому шагу,\nпомоги мне добраться до финиша', required: true },
        { type: 'enemies', name: 'Победить всех врагов', heroText: 'На островках могут скрываться враги, надо их победить', required: true },
        { type: 'gems', name: 'Собрать все алмазы', heroText: 'Не забудь про алмазы', required: false },
      ],  
      levers: [],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 1, y: 3 },
          end: { x: 1, y: 5 },
          activated: true,
        },
        {
          id: "bridge2",
          vertical: true,
          start: { x: 3, y: 7 },
          end: { x: 5, y:7 },
          activated: true,
        },
        {
          id: "bridge3",
          vertical: false,
          start: { x: 7, y: 9 },
          end: { x: 7, y: 11 },
          activated: true,
        },
      ],
      onlyVariablesInAttack: true,
      checksCount: 4,
    },
  
    [14]: {
      height: 7,
      width: 8,
      grid: [
        ["tree","sand","sand","watert","watert","sand","lawn","grass"],
        ["grass","tree","sand","water","water","sand","lawn","lawn"],
        ["lawn","lawn","sand","water","water","sand","rock","rock"],
        ["sand","sand","sand","sand","sand","sand","grass","lawn"],
        ["lawn","grass","sand","watert","watert","sand","sand","sand"],
        ["lawn","sand","watert","water","sand","sand","watert","watert"],
        ["sand","watert","water","sand","grass","lawn","water","sand"],
      ],
      hero: { x: 3, y: 0 },
      finish: { x: 6, y: 5 },
      gems: [
        { x: 0, y: 6 },
      ],
      enemies: [
        { x: 2, y: 5, alive: true, name: "Hidden1", hidden: true, random: true },
        { x: 4, y: 5, alive: true, name: "Hidden2", hidden: true, random: true },
      ],
      additionalVariants: {
        enemies: [
          [
            { x: 2, y: 5, alive: false, name: "Hidden1", hidden: true, random: true },
            { x: 4, y: 5, alive: true, name: "Hidden2", hidden: true, random: true },
          ],
          [
            { x: 2, y: 5, alive: true, name: "Hidden1", hidden: true, random: true },
            { x: 4, y: 5, alive: false, name: "Hidden2", hidden: true, random: true },
          ],
          [
            { x: 2, y: 5, alive: false, name: "Hidden1", hidden: true, random: true },
            { x: 4, y: 5, alive: false, name: "Hidden2", hidden: true, random: true },
          ],
        ],
        randomVariantsCount: 0,
      },
      goals: [
        { type: 'finish', name: 'Добраться до финиша', heroText: 'Проведи меня до финиша', required: true },
        { type: 'enemies', name: 'Победить всех врагов', heroText: 'Давай победим всех встретившихся врагов', required: true },
        { type: 'gems', name: 'Собрать все алмазы', heroText: 'И захватим этот алмаз', required: false },
      ],  
      levers: [],
      bridges: [],
      onlyVariablesInAttack: true,
      checksCount: 4,
    },

    [15]: {
      id: 'if-guarded-gems',
      height: 7,
      width: 9,
      grid: [
        ["tree","sand","tree","lawn","watert","watert","lawn","lawn","rock"],
        ["lawn","sand","sand","sand","water","water","sand","sand","lawn"],
        ["tree","lawn","lawn","sand","water","water","lawn","lawn","lawn"],
        ["rock","lawn","lawn","sand","water","water","watert","watert","watert"],
        ["lawn","lawn","lawn","sand","water","water","tree","lawn","lawn"],
        ["tree","sand","sand","sand","water","water","sand","sand","rock"],
        ["lawn","sand","rock","lawn","water","water","lawn","lawn","lawn"],
      ],
      hero: { x: 0, y: 1 },
      finish: { x: 6, y: 1 },
      gems: [
        { x: 1, y: 7, guardedBy: "Hidden1" },
        { x: 5, y: 7, guardedBy: "Hidden2" },
      ],
      enemies: [
        { x: 1, y: 4, alive: true, name: "Hidden1", hidden: true, random: true },
        { x: 5, y: 4, alive: true, name: "Hidden2", hidden: true, random: true },
      ],
      additionalVariants: {
        enemies: [
          [
            { x: 1, y: 4, alive: false, name: "Hidden1", hidden: true, random: true },
            { x: 5, y: 4, alive: true, name: "Hidden2", hidden: true, random: true },
          ],
          [
            { x: 1, y: 4, alive: true, name: "Hidden1", hidden: true, random: true },
            { x: 5, y: 4, alive: false, name: "Hidden2", hidden: true, random: true },
          ],
          [
            { x: 1, y: 4, alive: false, name: "Hidden1", hidden: true, random: true },
            { x: 5, y: 4, alive: false, name: "Hidden2", hidden: true, random: true },
          ],
        ],
        randomVariantsCount: 0,
      },
      goals: [
        { type: 'finish', name: 'Добраться до финиша', required: true },
        { type: 'enemies', name: 'Победить всех врагов', required: true },
        { type: 'gems', name: 'Собрать все доступные алмазы', heroText: 'Если остров охраняют, значит на нем есть алмаз — давай заберем их', required: true },
        { type: 'no-unnecessary-islands', name: 'Не заходить на остров без алмаза', heroText: 'Но я не хочу заходить на остров, если на нем нет алмаза', required: true },
      ],  
      levers: [],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 1, y: 4 },
          end: { x: 1, y: 5 },
          activated: true,
        },
        {
          id: "bridge2",
          vertical: false,
          start: { x: 5, y: 4 },
          end: { x: 5, y: 5 },
          activated: true,
        }
      ],
      onlyVariablesInAttack: true,
      checksCount: 4,
    },
  }
}