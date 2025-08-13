import GameplayErrorTypes from './GameplayErrorTypes';

// Centralized mapping of error types to hero messages
export const GAMEPLAY_ERROR_MESSAGES = {
  [GameplayErrorTypes.HERO_RAN_IN_WALL]: {
    value: 'Ой, здесь я не могу пройти'
  },
  
  [GameplayErrorTypes.HERO_KILLED_BY_ENEMY]: {
    value: 'С этим рыцарем надо быть аккуратнее..'
  },
  
  [GameplayErrorTypes.HERO_RAN_IN_ENEMY]: {
    value: 'Я не могу туда идти,\nэтот злой рыцарь меня побьет'
  },
  
  [GameplayErrorTypes.NO_ENEMIES_TO_ATTACK]: {
    value: 'На этом уровне нет врагов,\nмне некого атаковать'
  },
  
  [GameplayErrorTypes.NO_ENEMY_WITH_GIVEN_NAME]: {
    getValue: (error) => `На этом уровне\nнет врага по имени «${error.name}»,\nмне некого атаковать`
  },
  
  [GameplayErrorTypes.ENEMY_TOO_FAR]: {
    getValue: (error) => `Я не могу атаковать «${error.name}»,\nпотому что он слишком далеко`
  },
  
  [GameplayErrorTypes.ENEMY_IS_BIG]: {
    getValue: (error) => `Я не могу атаковать «${error.name}» — он слишком сильный`
  },
  
  [GameplayErrorTypes.NO_LEVERS]: {
    value: 'На этом уровне нет рычагов,\nмне нечего переключать'
  },
  
  [GameplayErrorTypes.NO_LEVER_WITH_GIVEN_NAME]: {
    getValue: (error) => `На этом уровне нет рычага с названием «${error.name}»`
  },
  
  [GameplayErrorTypes.LEVER_TOO_FAR]: {
    getValue: (error) => `Рычаг с названием «${error.name}» слишком далеко,\nя не могу переключить его отсюда`,
    delay: 3000
  },
  
  [GameplayErrorTypes.CANT_BE_HERE]: {
    value: 'Зачем мне сюда? Здесь нет алмаза',
    delay: 3000
  },
  
  [GameplayErrorTypes.ENEMY_SHOULD_NOT_BE_HERE]: {
    value: 'Огромный рыцарь перешёл на наш берег, нам конец!',
    delay: 3000
  },
  
  [GameplayErrorTypes.INFINITE_LOOP]: {
    value: 'Ой, кажется, я застрял в бесконечном цикле!',
    delay: 3000
  }
};

/**
 * Gets the appropriate hero text message for a gameplay error
 * @param {Object} gameplayError - The error object with type and optional data
 * @returns {Array} Array containing hero text object with value and optional delay
 */
export const getHeroTextForError = (gameplayError) => {
  if (!gameplayError?.type) {
    return [];
  }

  const errorConfig = GAMEPLAY_ERROR_MESSAGES[gameplayError.type];
  if (!errorConfig) {
    return [];
  }

  const value = errorConfig.getValue 
    ? errorConfig.getValue(gameplayError)
    : errorConfig.value;

  const textObject = { value };
  if (errorConfig.delay) {
    textObject.delay = errorConfig.delay;
  }

  return [textObject];
};
