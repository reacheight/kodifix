const defaultStartingComment = `# пиши код ниже, чтобы управлять персонажем\n# нажми запуск, когда закончишь\n\n`;

export const startingCode = {
  ['forest']: {
    [1]: defaultStartingComment + "# продолжи код, чтобы добраться до финиша\nhero.move_right()\n",
    [2]: defaultStartingComment + "# напиши код, чтобы добраться до финиша\n# постарайся собрать все алмазы\n",
    [3]: "# используй метод с параметром,\n# чтобы пройти уровень одной строчкой\n",
    [4]: defaultStartingComment,
    [5]: defaultStartingComment,
    [6]: `# используй метод switch, чтобы переключить мост\n\nhero.move_right(2)\nhero.switch("Напиши название рычага")\n\n# продолжи код, чтобы  добраться до финиша\n`,
    [7]: defaultStartingComment,
    [8]: `# комментарии содержат пояснения и подсказки\n\n# этот рычаг перед героем называется "Секретный"\n\n`,
    [9]: `# используй метод attack, чтобы атаковать врага\n\n# дойти до врага John\nhero.move_left(5)\n\n# поменяй параметр метода,\n# чтобы атаковать врага John\nhero.attack("Имя врага")\n\n# продолжи код, чтобы добраться до финиша\n`,
    [10]: `# чтобы пройти этот уровень,\n# тебе надо использовать все методы\n\n`,
    [11]: `hero.move_down(2)\n\n# это переменная enemy1 со значением "Brad"\nenemy1 = "Brad"\nhero.attack(enemy1)\n\nhero.move_down(2)\n\n# поправь значение переменной на правильное имя\nenemy2 = "Второй враг"\nhero.attack(enemy2)\n\nhero.move_down(2)\n\n# создай переменную с именем третьего врага\n# и передай ее в метод attack\n`,
    [12]: `hero.move_right(4)\n\nenemy1 = hero.find_nearest_enemy()\nhero.attack(enemy1)\n\n# дойди до остальных врагов, получи их имена\n# с помощью hero.find_nearest_enemy()\n# и атакуй их\n`,
    [13]: `# дойди до берега
hero.move_right()

# если мост закрыт
if hero.is_disabled("Мост1"):
    # открой его
    hero.switch("Мост1")

# иди на следующий остров
hero.move_right(4)

# дойди до берега
hero.move_down(1)
# если мост закрыт
if hero.is_disabled("Мост2"):
    # открой его - допиши код здесь

    # pass ничего не делает, удали это,
    # когда напишешь свой код
    pass
    
# иди на следующий остров

# напиши код проверки того, закрыт ли Мост3
# и открой его, если надо

# дойди до финиша
`,
    [14]: `# напиши весь кода сам!`,

    [15]: `# дойди до верхнего моста
hero.move_down()
hero.move_right(2)

if hero.has_enemy_around():
    # если остров охраняют
    # значит на нем есть алмаз
    # забери его и возвращайся назад
    pass

# дойди до нижнего моста и проверь,
# охраняет ли кто-то переход на остров
# если охраняет — заберай алмаз


# дойди до финиша
`,
    [16]: `# дойди до конца левого моста
hero.move_left(4)
# если рядом есть враг, то

if hero.has_enemy_around():

    # найди его и атакуй

    enemy = hero.find_nearest_enemy()

    hero.attack(enemy)


# возьми алмаз и иди обратно
hero.move_left(2)

hero.move_right(6)

# дойди до конца среднего моста
hero.move_down(4)
# если рядом есть враг, то

if hero.has_enemy_around():

    # найди его и атакуй - допиши код здесь


    # pass ничего не делает, удали это,

    # когда напишешь свой код
    pass
    
# дойди до конца правого моста


# напиши код проверки того, есть ли рядом враг
# и атакуй его, если есть

# дойди до финиша

`,
    [16]: `# дойди до конца левого моста
hero.move_left(4)
# если рядом есть враг, то

if hero.has_enemy_around():

    # найди его и атакуй

    enemy = hero.find_nearest_enemy()

    hero.attack(enemy)


# возьми алмаз и иди обратно
hero.move_left(2)

hero.move_right(6)

# дойди до конца среднего моста
hero.move_down(4)
# если рядом есть враг, то

if hero.has_enemy_around():

    # найди его и атакуй - допиши код здесь


    # pass ничего не делает, удали это,

    # когда напишешь свой код
    pass
    
# дойди до конца правого моста


# напиши код проверки того, есть ли рядом враг
# и атакуй его, если есть

# дойди до финиша

`,
  }
}