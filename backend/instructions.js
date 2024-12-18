import { shortMovingCommands, longMovingCommands, switchCommand, attackCommand, findNearestEnemy, hasEnemyAround, isDisabled } from "./commands.js"

export const instructions = {
  ['forest']: {
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
      newCommands: [],
      prevCommands: longMovingCommands,
    },
    [6]: {
      instructions: 'Текст в кавычках, например "Мост", называют строкой. Строки так же можно передавать в методы.\n\nПередай строку с названием рычага в метод `switch`, чтобы переключить его, и посмотри, что произойдет.\n\nИмей в виду: чтобы дотянуться до рычага, герой должен находиться на соседней с ним клетке.',
      example: `hero.switch("Мост")`,
      newCommands: [ switchCommand ],
      prevCommands: longMovingCommands,
    },
    [7]: {
      instructions: 'Если вызвать `switch` с рычагом уже открытого моста, он закроется.\n\n' +
      'В этом уровне тебе надо немного исправить стартовый код — найди и исправь в нём ошибку.',
      example: `hero.switch("Мост") # открыть мост
hero.switch("Мост") # закрыть мост
hero.switch("Мост") # снова открыть мост
# и так далее..`,
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand ]),
    },
    [8]: {
      instructions: 'Отлично, ты уже далеко продвинулся!\n\nКстати, ты можешь крутить колесо мыши, чтобы увеличить или уменьшить уровень.',
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand ]),
    },
    [9]: {
      instructions: 'Программисты могут оставлять комментарии в своём коде, чтобы сделать его понятнее для других программистов.\nТы уже видел их в редакторе справа — это текст, идущий после знака #.\n\nЧтобы пройти этот уровень тебе надо прочитать комментарии к коду.',
      example: `# в питоне комментарии начинаются с #, они содержат пояснения и подсказки\n\nhero.move_right() # комментарии могут быть на одной строчке с кодом\n\n# а это комментарий\n# сразу на двух строчках подряд`,
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand ]),
    },
    [10]: {
      instructions: 'Нам преградили дорогу злые рыцари! Придется их проучить.\n\nПередай в метод `attack` строку с именем врага, чтобы его ударить. Как и с рычагом, твой герой должен находиться рядом с врагом, которого ты хочешь атаковать.',
      example: `hero.attack("John")`,
      newCommands: [ attackCommand ],
      prevCommands: longMovingCommands.concat([ switchCommand ]),
    },
    [11]: {
      instructions: 'Снова эти рыцари! Подумай, как мы можем избавиться сразу от всех врагов?',
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [12]: {
      instructions: 'Используй все выученные методы, чтобы пройти этот уровень.\n\nНе забудь, что ты всегда можешь посмотреть список методов под редактором.',
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [13]: {
      instructions: 'Враги вызвали подкрепление! Этот рыцарь слишком сильный, ты пока не можешь его победить.\n\nОн идёт к нам! Нельзя пропустить его на наш берег — сдешние обитатели будут в опасности. Как мы можем его остановить?',
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [14]: {
      instructions: 'Для хранения каких-либо данных в программах используют переменные. Переменная (variable) — это "коробка", в которой что-то лежит.\n\n'
      + 'У переменной есть имя, по которой к ней обращаются, и есть значение, которое в ней лежит.\n'
      + 'Имя переменной должно быть уникальным, то есть не может быть двух переменных с одинаковым именем.\n'
      + 'Чтобы у переменной появилось значение, его нужно присвоить. В Python это делают с помощью знака `=`.',
      example: `# создаем переменную и кладем в нее значение:\n# название = значение\nenemy = "Proggy"\n\n# теперь везде, где мы используем переменную, будет подставляться ее значение:\nhero.attack(enemy) # герой атакует врага с именем Proggy\n\n# обрати внимание, что мы используем переменную без кавычек`,
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [15]: {
      instructions: 'Некоторые враги скрывают свое имя. Но ты можешь получить его с помощью метода `hero.find_nearest_enemy()`. Обрати внимание, что метод возвращает имя ближайшего к твоему персонажу врага.\n\n'
      + 'После того, как ты победишь первого врага, которого вернул этот метод, ты можешь вызвать его повторно, чтобы получить имя следующего врага.\n\n'
      + 'В переменные можно складывать не только готовые значения, но и результат выполнения методов. Попробуй присвоить переменной результат `find_nearest_enemy`, чтобы затем использовать ее в `attack`.',
      example: `enemy1 = hero.find_nearest_enemy()\nhero.attack(enemy1)\n\nenemy2 = hero.find_nearest_enemy()\nhero.attack(enemy2)`,
      newCommands: [ findNearestEnemy ],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [16]: {
      instructions: 'Отлично! Давай применим все изученные методы для прохождения этого уровня.\n\n'
      + 'Помни, что `find_nearest_enemy()` возвращает самого близкого к тебе врага.',
      newCommands: [ findNearestEnemy ],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [17]: {
      instructions: 'На этом уровне мосты между островками случайные. Это значит, что каждый мост может быть открыт или закрыт, и ты не знаешь заранее, в каком они положении — твой код будет проверяться сразу на нескольких случаях.\n\n'
      + 'Чтобы переключать рычаг моста, только когда он закрыт, тебе понадобятся новый метод `is_disabled("Мост")` и конструкция if (в переводе «если»), с помощью которой можно писать код так, чтобы в разных случаях он работал по-разному.\n\n'
      + 'Посмотри, как это выглядит, и обрати внимание на то, что строчки кода, которые должны выполняться при условии if, должны быть сдвинуты вправо на 4 пробела:',
      example: `hero.move_right(3)            # всегда пройди вправо\nif hero.is_disabled("Мост1"): # если Мост1 закрыт, то\n    hero.switch("Мост1")          # переключи рычаг\nhero.move_down(2)             # всегда пройди вниз`,
      newCommands: [ isDisabled ],
      prevCommands: longMovingCommands.concat([ findNearestEnemy, switchCommand, attackCommand ]),
    },
    [18]: {
      instructions: 'Так держать! Давай закрепим знания. Помни, что мосты на этом уровне случайны — могут быть открыты и закрыты. Проверяй их с помощью конструкции if.',
      example: `hero.move_right(3)            # всегда пройди вправо\nif hero.is_disabled("Мост1"): # если Мост1 закрыт, то\n    hero.switch("Мост1")          # переключи рычаг\nhero.move_down(2)             # всегда пройди вниз`,
      newCommands: [],
      prevCommands: [ isDisabled ].concat(longMovingCommands.concat([ findNearestEnemy, switchCommand, attackCommand ])),
    },
    [19]: {
      instructions: 'Рыцари прячут алмазы на островах, давай заберем их. Но имей в виду: на острове есть алмаз, только если его охраняют! Если дорога открыта — на острове нечего искать.\n\n'
      + 'Тебе надо собрать все доступные алмазы, но при этом ты не должен заходить на остров, если там пусто.',
      newCommands: [],
      prevCommands: [ hasEnemyAround ].concat(longMovingCommands.concat([ findNearestEnemy, switchCommand, attackCommand ])),
    },
    [20]: {
      instructions: 'На этом уровне на каждом островке тебя может поджидать враг, но ты никогда не знаешь точно, есть ли он там — твой код будет проверятся несколько раз на разных случаях. Такие «непостоянные» враги переливаются. Тебе надо дойти до финиша, проверяя каждый островок.\n\nВ этом тебе помогут новый метод `has_enemy_around`, который скажет, есть ли на соседних с твоим героем клетках враг, и конструкция if («если»), с помощью которой можно писать код так, чтобы в разных случаях он работал по-разному.',
      example: `hero.move_right(3)              # всегда пройди вправо\nif hero.has_enemy_around():     # если рядом есть враг, то\n    enemy = hero.find_nearest_enemy() # найди врага\n    hero.attack(enemy)                # и атакуй его\nhero.move_down(2)               # всегда пройди вниз`,
      newCommands: [ hasEnemyAround ],
      prevCommands: longMovingCommands.concat([ findNearestEnemy, switchCommand, attackCommand ]),
    },
    [21]: {
      instructions: 'На этом уровне на каждом островке тебя может поджидать враг, но ты никогда не знаешь точно, есть ли он там — твой код будет проверятся несколько раз на разных случаях. Такие «непостоянные» враги переливаются. Тебе надо дойти до финиша, проверяя каждый островок.\n\nВ этом тебе помогут новый метод `has_enemy_around`, который скажет, есть ли на соседних с твоим героем клетках враг, и конструкция if («если»), с помощью которой можно писать код так, чтобы в разных случаях он работал по-разному.',
      example: `hero.move_right(3)              # всегда пройди вправо\nif hero.has_enemy_around():     # если рядом есть враг, то\n    enemy = hero.find_nearest_enemy() # найди врага\n    hero.attack(enemy)                # и атакуй его\nhero.move_down(2)               # всегда пройди вниз`,
      newCommands: [ hasEnemyAround ],
      prevCommands: longMovingCommands.concat([ findNearestEnemy, switchCommand, attackCommand ]),
    },
  }
}