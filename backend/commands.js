const movingConstants = [['up', 'вверх'], ['down', 'вниз'], ['right', 'вправо'], ['left', 'влево']];

export const shortMovingCommands = movingConstants.map(constants => ({
    code: `hero.move_${constants[0]}()`,
    description: `перемещает героя на 1 шаг ${constants[1]}`,
    example: `hero.move_${constants[0]}()`,
}));

export const longMovingCommands = movingConstants.map(constants => ({
    code: `hero.move_${constants[0]}(steps)`,
    description: `перемещает героя на \`steps\` шагов ${constants[1]}`,
    example: `hero.move_${constants[0]}(3)`,
    autocompleteValue: `hero.move_${constants[0]}(#{1})`,
}));

export const attackCommand = {
    code: 'hero.attack(enemy)',
    description: 'атакует врага по имени `enemy`, если он находится рядом',
    example: 'hero.attack("John")',
    autocompleteValue: 'hero.attack(${1})',
};

export const switchCommand = {
    code: 'hero.switch(lever)',
    description: 'переключает рычаг с названием `lever`, если он находится рядом',
    example: 'hero.switch("Мост")',
    autocompleteValue: 'hero.switch(${1})',
}

export const findNearestEnemy = {
    code: 'hero.find_nearest_enemy()',
    description: 'возвращает ближайшего живого врага',
    example: 'enemy = hero.find_nearest_enemy()\nhero.attack(enemy)',
}

export const hasEnemyAround = {
    code: 'hero.has_enemy_around()',
    description: 'сообщает, есть ли живой враг на соседних с твоим персонажем клетках',
    example: 'if hero.has_enemy_around():\n    enemy = hero.find_nearest_enemy()\n    hero.attack(enemy)',
}

export const isDisabled = {
    code: 'hero.is_disabled(lever)',
    description: 'проверяет, выключен ли рычаг `lever`',
    example: 'if hero.is_disabled("Мост"):\n    hero.switch("Мост")',
    autocompleteValue: 'hero.is_disabled(${1})',
}