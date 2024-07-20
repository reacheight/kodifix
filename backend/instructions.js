export const instructions = {
  [0]: {
    instructions: `Управляй персонажем с помощью кода. Пиши код в редакторе справа и нажми на кнопку "Запуск", когда закончишь.

Команды для управления персонажем (hero) называются методами. Используй методы передвижения, чтобы собрать все алмазы.`,
    example: `hero.move_down()
hero.move_right()`,
    newCommands: [
      { code: 'hero.move_up()', description: 'перемещает героя на 1 шаг вверх', example: 'hero.move_up()' },
      { code: 'hero.move_down()', description: 'перемещает героя на 1 шаг вниз', example: 'hero.move_down()' },
      { code: 'hero.move_right()', description: 'перемещает героя на 1 шаг вправо', example: 'hero.move_right()' },
      { code: 'hero.move_left()', description: 'перемещает героя на 1 шаг влево', example: 'hero.move_left()'},
    ],
    prevCommands: [],
  },

  [1]: {
    instructions: `Управляй персонажем с помощью кода. Пиши код в редакторе справа и нажми на кнопку "Запуск", когда закончишь.

Команды для управления персонажем (hero) называются методами. Используй методы передвижения, чтобы собрать все алмазы.`,
    example: `hero.move_down()
hero.move_right()`,
    newCommands: [
      { code: 'hero.move_up()', description: 'перемещает героя на 1 шаг вверх', example: 'hero.move_up()' },
      { code: 'hero.move_down()', description: 'перемещает героя на 1 шаг вниз', example: 'hero.move_down()' },
      { code: 'hero.move_right()', description: 'перемещает героя на 1 шаг вправо', example: 'hero.move_right()' },
      { code: 'hero.move_left()', description: 'перемещает героя на 1 шаг влево', example: 'hero.move_left()'},
    ],
    prevCommands: [],
  },

  [2]: {
    instructions: `Отлично! Продолжай в том же духе.

Кстати, ты всегда можешь найти список доступных методов под редактором.`,
  example: `hero.move_down()
hero.move_right()`,
    newCommands: [],
    prevCommands: [
      { code: 'hero.move_up()', description: 'перемещает героя на 1 шаг вверх', example: 'hero.move_up()' },
      { code: 'hero.move_down()', description: 'перемещает героя на 1 шаг вниз', example: 'hero.move_down()' },
      { code: 'hero.move_right()', description: 'перемещает героя на 1 шаг вправо', example: 'hero.move_right()' },
      { code: 'hero.move_left()', description: 'перемещает героя на 1 шаг влево', example: 'hero.move_left()'},
    ],
  },

  [3]: {
    instructions: `Методы могут принимать параметры внутри скобок. Например, в методы перемещения можно передать количество шагов, которое должен пройти герой.
Используй метод передвижения с парамтером, чтобы пройти этот уровень одной строчкой кода.`,
    example: `hero.move_down(3)
hero.move_right(2)`,
    newCommands: [
      { code: 'hero.move_up(steps)', description: 'перемещает героя на `steps` шагов вверх', example: 'hero.move_up(3)', autocompleteValue: 'hero.move_up(#{1})' },
      { code: 'hero.move_down(steps)', description: 'перемещает героя на `steps` шагов вниз', example: 'hero.move_down(3)', autocompleteValue: 'hero.move_down(#{1})' },
      { code: 'hero.move_right(steps)', description: 'перемещает героя на `steps` шагов вправо', example: 'hero.move_right(3)', autocompleteValue: 'hero.move_right(#{1})' },
      { code: 'hero.move_left(steps)', description: 'перемещает героя на `steps` шагов влево', example: 'hero.move_left(3)', autocompleteValue: 'hero.move_left(#{1})' },
    ],
    prevCommands: [],
  },
  [4]: {
    newCommands: [],
    prevCommands: [
      { code: 'hero.move_up(steps)', description: 'перемещает героя на `steps` шагов вверх', example: 'hero.move_up(3)', autocompleteValue: 'hero.move_up(#{1})' },
      { code: 'hero.move_down(steps)', description: 'перемещает героя на `steps` шагов вниз', example: 'hero.move_down(3)', autocompleteValue: 'hero.move_down(#{1})' },
      { code: 'hero.move_right(steps)', description: 'перемещает героя на `steps` шагов вправо', example: 'hero.move_right(3)', autocompleteValue: 'hero.move_right(#{1})' },
      { code: 'hero.move_left(steps)', description: 'перемещает героя на `steps` шагов влево', example: 'hero.move_left(3)', autocompleteValue: 'hero.move_left(#{1})' },
    ],
  },
  [5]: {
    instructions: 'Текст в кавычках называют строкой. Передай строку с именем врага в метод `attack`, чтобы ударить его своим посохом. Но имей в виду, что враг должен находиться на соседней с твоим персонажем клетке.',
    example: `hero.attack("John")`,
    newCommands: [
      { code: 'hero.attack(enemy)', description: 'атакует врага по имени `enemy`, если он находится рядом', example: 'hero.attack("John")', autocompleteValue: 'hero.attack(${1})'}
    ],
    prevCommands: [
      { code: 'hero.move_up(steps)', description: 'перемещает героя на `steps` шагов вверх', example: 'hero.move_up(3)', autocompleteValue: 'hero.move_up(#{1})' },
      { code: 'hero.move_down(steps)', description: 'перемещает героя на `steps` шагов вниз', example: 'hero.move_down(3)', autocompleteValue: 'hero.move_down(#{1})' },
      { code: 'hero.move_right(steps)', description: 'перемещает героя на `steps` шагов вправо', example: 'hero.move_right(3)', autocompleteValue: 'hero.move_right(#{1})' },
      { code: 'hero.move_left(steps)', description: 'перемещает героя на `steps` шагов влево', example: 'hero.move_left(3)', autocompleteValue: 'hero.move_left(#{1})' },
    ],
  }
}
