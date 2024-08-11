import { shortMovingCommands, longMovingCommands, switchCommand, attackCommand, findNearestEnemy, hasEnemyAround } from "./commands.js"

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
    instructions: 'Нам преградили дорогу злые рыцари! Придется их проучить.\n\nПередай в метод `attack` строку с именем врага, чтобы его ударить. Как и с рычагом, твой герой должен находиться рядом с врагом, которого ты хочешь атаковать.',
    example: `hero.attack("John")`,
    newCommands: [ attackCommand ],
    prevCommands: longMovingCommands.concat([ switchCommand ]),
  },
  [8]: {
    instructions: 'Используй все выученные методы, чтобы пройти этот уровень.\n\nНе забудь, что ты всегда можешь посмотреть список методов под редактором.',
    newCommands: [],
    prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
  },
  [9]: {
    instructions: 'Для хранения каких-либо данных в программах используют переменные. Переменная (variable) — это "коробка", в которой что-то лежит.\n\n'
    + 'У переменной есть имя, по которой к ней обращаются, и есть значение, которое в ней лежит.\n'
    + 'Имя переменной должно быть уникальным, то есть не может быть двух переменных с одинаковым именем.\n'
    + 'Чтобы у переменной появилось значение, его нужно присвоить. В Python это делают с помощью знака `=`.',
    example: `# создаем переменную и кладем в нее значение:\n# название = значение\nenemy = "Proggy"\n\n# теперь везде, где мы используем переменную, будет подставляться ее значение:\nhero.attack(enemy) # герой атакует врага с именем Proggy\n\n# обрати внимание, что мы используем переменную без кавычек`,
    newCommands: [],
    prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
  },
  [10]: {
    instructions: 'Некоторые враги скрывают свое имя. Но ты можешь получить его с помощью метода `hero.find_nearest_enemy()`. Обрати внимание, что метод возвращает имя ближайшего к твоему персонажу врага.\n\n'
    + 'После того, как ты победишь первого врага, которого вернул этот метод, ты можешь вызвать его повторно, чтобы получить имя следующего врага.\n\n'
    + 'В переменные можно складывать не только готовые значения, но и результат выполнения методов. Попробуй присвоить переменной результат `find_nearest_enemy`, чтобы затем использовать ее в `attack`.',
    example: `enemy1 = hero.find_nearest_enemy()\nhero.attack(enemy1)\n\nenemy2 = hero.find_nearest_enemy()\nhero.attack(enemy2)`,
    newCommands: [ findNearestEnemy ],
    prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
  },
  [11]: {
    instructions: 'На этом уровне на каждом островке тебя может поджидать враг, но ты никогда не можешь быть уверенным, есть он там, или же путь свободен — твой код будет проверятся несколько раз на разных случаях. Тебе надо аккуратно дойти до финиша, проверяя каждый островок.\n\n'
    + 'В этом тебе помогут новый метод `has_enemy_around`, который скажет, есть ли на соседних с твоим героем клетках враг, и конструкция if («если»), с помощью которой можно писать код так, чтобы в разных случаях он работал по-разному.\n\n'
    + 'Посмотри, как это выглядит, и обрати внимание, что строчки кода, которые должны выполняться при условии if, должны быть сдвинуты вправо на 4 пробела:',
    example: `hero.move_right(3)              # всегда пройди вправо\nif hero.has_enemy_around():     # если рядом есть враг, то\n    enemy = hero.find_nearest_enemy() # найди врага\n    hero.attack(enemy)                # и атакуй его\nhero.move_down(2)               # всегда пройди вниз`,
    newCommands: [ hasEnemyAround ],
    prevCommands: longMovingCommands.concat([ findNearestEnemy, switchCommand, attackCommand ]),
  }
}
