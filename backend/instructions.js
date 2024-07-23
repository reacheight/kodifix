import { shortMovingCommands, longMovingCommands, switchCommand, attackCommand } from "./commands.js"

export const instructions = {
  [0]: {
    instructions: `Управляй персонажем с помощью кода.\nПиши код в редакторе справа и нажми на кнопку "Запуск", когда закончишь.\n\nКоманды для управления персонажем (hero) называются методами.\nИспользуй методы передвижения, чтобы собрать все алмазы.`,
    example: `hero.move_down()\nhero.move_right()`,
    newCommands: shortMovingCommands,
    prevCommands: [],
  },

  [1]: {
    instructions: `Управляй персонажем с помощью кода.\nПиши код в редакторе справа и нажми на кнопку "Запуск", когда закончишь.\n\nКоманды для управления персонажем (hero) называются методами.\nИспользуй методы передвижения, чтобы собрать все алмазы.`,
    example: `hero.move_down()\nhero.move_right()`,
    newCommands: shortMovingCommands,
    prevCommands: [],
  },

  [2]: {
    instructions: `Отлично! Продолжай в том же духе.\n\nКстати, ты всегда можешь найти список доступных методов под редактором.`,
  example: `hero.move_down()\nhero.move_right()`,
    newCommands: [],
    prevCommands: shortMovingCommands,
  },

  [3]: {
    instructions: `Методы могут принимать параметры внутри скобок.\n\nНапример, в методы перемещения можно передать количество шагов, которое должен пройти герой.\n\nИспользуй метод передвижения с параметром, чтобы пройти этот уровень одной строчкой кода.`,
    example: `hero.move_down(3)\nhero.move_right(2)`,
    newCommands: longMovingCommands,
    prevCommands: [],
  },
  [4]: {
    newCommands: [],
    prevCommands: longMovingCommands,
  },
  [5]: {
    instructions: 'Текст в кавычках, например "Мост", называют строкой. Строки так же можно передавать в методы.\n\nПередай строку с названием рычага в метод `switch`, чтобы переключить его, и посмотри, что произойдет.\n\nИмей в виду: чтобы дотянуться до рычага, герой должен находиться на соседней с ним клетке.',
    example: `hero.switch("Мост")`,
    newCommands: [ switchCommand ],
    prevCommands: longMovingCommands,
  },
  [6]: {
    instructions: 'Отлично, ты уже далеко продвинулся!\n\nКстати, ты можешь крутить колесо мыши, чтобы увеличить или уменьшить уровень.',
    newCommands: [],
    prevCommands: longMovingCommands.concat([ switchCommand ]),
  },
  [7]: {
    instructions: 'Нам преградили дорогу злые рыцари! Придётся их проучить.\n\nПередай в метод `attack` строку с именем врага, чтобы его ударить. Как и с рычагом, твой герой должен находиться рядом с врагом, которого ты хочешь атаковать.',
    example: `hero.attack("John")`,
    newCommands: [ attackCommand ],
    prevCommands: longMovingCommands.concat([ switchCommand ]),
  }
}
