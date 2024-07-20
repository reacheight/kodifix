import { shortMovingCommands, longMovingCommands, attackCommand } from "./commands.js"

export const instructions = {
  [0]: {
    instructions: `Управляй персонажем с помощью кода. Пиши код в редакторе справа и нажми на кнопку "Запуск", когда закончишь.

Команды для управления персонажем (hero) называются методами. Используй методы передвижения, чтобы собрать все алмазы.`,
    example: `hero.move_down()
hero.move_right()`,
    newCommands: shortMovingCommands,
    prevCommands: [],
  },

  [1]: {
    instructions: `Управляй персонажем с помощью кода. Пиши код в редакторе справа и нажми на кнопку "Запуск", когда закончишь.

Команды для управления персонажем (hero) называются методами. Используй методы передвижения, чтобы собрать все алмазы.`,
    example: `hero.move_down()
hero.move_right()`,
    newCommands: shortMovingCommands,
    prevCommands: [],
  },

  [2]: {
    instructions: `Отлично! Продолжай в том же духе.

Кстати, ты всегда можешь найти список доступных методов под редактором.`,
  example: `hero.move_down()
hero.move_right()`,
    newCommands: [],
    prevCommands: shortMovingCommands,
  },

  [3]: {
    instructions: `Методы могут принимать параметры внутри скобок. Например, в методы перемещения можно передать количество шагов, которое должен пройти герой.
Используй метод передвижения с парамтером, чтобы пройти этот уровень одной строчкой кода.`,
    example: `hero.move_down(3)
hero.move_right(2)`,
    newCommands: longMovingCommands,
    prevCommands: [],
  },
  [4]: {
    newCommands: [],
    prevCommands: longMovingCommands,
  },
  [5]: {
    instructions: 'Текст в кавычках называют строкой. Передай строку с именем врага в метод `attack`, чтобы ударить его своим посохом. Но имей в виду, что враг должен находиться на соседней с твоим персонажем клетке.',
    example: `hero.attack("John")`,
    newCommands: [ attackCommand ],
    prevCommands: longMovingCommands,
  }
}
