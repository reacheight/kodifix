export const instructions = {
  [1]: {
    instructions: `Управляй персонажем с помощью кода. Пиши код в редакторе справа и нажми на кнопку "Запуск", когда закончишь.

Команды для управления персонажем (hero) называются методами. Используй методы передвижения, чтобы собрать все алмазы.`,
    example: `hero.move_down()
hero.move_right()`,
    newCommands: [
      { code: 'hero.move_up()', description: 'перемещает героя на 1 шаг вверх' },
      { code: 'hero.move_down()', description: 'перемещает героя на 1 шаг вниз' },
      { code: 'hero.move_right()', description: 'перемещает героя на 1 шаг вправо' },
      { code: 'hero.move_left()', description: 'перемещает героя на 1 шаг влево' },
    ],
    prevCommands: [],
  },
  [2]: {
    instructions: 'Методы могут принимать аргументы внутри скобок. Например, в методы перемещения можно передать количество шагов, которое должен пройти герой.',
    example: `hero.move_down(3)
hero.move_right(2)`,
    newCommands: [
      { code: 'hero.move_up(steps)', description: 'перемещает героя на `steps` шагов вверх', example: 'hero.move_up(3)' },
      { code: 'hero.move_down(steps)', description: 'перемещает героя на `steps` шагов вниз', example: 'hero.move_down(3)' },
      { code: 'hero.move_right(steps)', description: 'перемещает героя на `steps` шагов вправо', example: 'hero.move_right(3)' },
      { code: 'hero.move_left(steps)', description: 'перемещает героя на `steps` шагов влево', example: 'hero.move_left(3)' },
    ],
    prevCommands: [],
  },
  [3]: {
    newCommands: [],
    prevCommands: [
      { code: 'hero.move_up(steps)', description: 'перемещает героя на `steps` шагов вверх', example: 'hero.move_up(3)' },
      { code: 'hero.move_down(steps)', description: 'перемещает героя на `steps` шагов вниз', example: 'hero.move_down(3)' },
      { code: 'hero.move_right(steps)', description: 'перемещает героя на `steps` шагов вправо', example: 'hero.move_right(3)' },
      { code: 'hero.move_left(steps)', description: 'перемещает героя на `steps` шагов влево', example: 'hero.move_left(3)' },
    ],
  },
  [4]: {
    instructions: 'Текст в кавычках называют строкой. Передай строку с именем врага в метод `attack`, чтобы ударить его своим посохом. Но имей в виду, что враг должен находиться на соседней с твоим персонажем клетке.',
    example: `hero.attack("John")`,
    newCommands: [
      { code: 'hero.attack(enemy)', description: 'атакует врага по имени `enemy`, если он находится рядом', example: 'hero.attack("John")'}
    ],
    prevCommands: [
      { code: 'hero.move_up(steps)', description: 'перемещает героя на `steps` шагов вверх', example: 'hero.move_up(3)' },
      { code: 'hero.move_down(steps)', description: 'перемещает героя на `steps` шагов вниз', example: 'hero.move_down(3)' },
      { code: 'hero.move_right(steps)', description: 'перемещает героя на `steps` шагов вправо', example: 'hero.move_right(3)' },
      { code: 'hero.move_left(steps)', description: 'перемещает героя на `steps` шагов влево', example: 'hero.move_left(3)' },
    ],
  }
}