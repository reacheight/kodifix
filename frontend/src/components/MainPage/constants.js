export const MODULE_CONFIG = {
  id: 1,
  title: 'Лесной путь',
  description: 'Изучите основы программирования в увлекательном путешествии через лес',
  totalLevels: 22,
  tags: [
    'знакомство с платформой',
    'основы синтаксиса',
    'методы',
    'параметры',
    'строки',
    'комментарии',
    'переменные',
    'циклы',
    'if-выражения'
  ],
  mobileHiddenTagsCount: 6
};

export const MAP_CONFIG = {
  imageWidth: 1536,
  imageHeight: 889,
  
  maxMapWidth: 1200,
  maxMapHeight: 700,
  resizeDebounceMs: 150
};

export const LEVEL_POSITIONS = [
  { level: 1, bottom: 59, left: 36 },
  { level: 2, bottom: 55, left: 32 },
  { level: 3, bottom: 53, left: 27 },
  { level: 4, bottom: 47, left: 23 },
  { level: 5, bottom: 45, left: 29 },
  { level: 6, bottom: 43, left: 35 },
  { level: 7, bottom: 38, left: 30 },
  { level: 8, bottom: 34, left: 25 },
  { level: 9, bottom: 31, left: 31 },
  { level: 10, bottom: 28, left: 37 },
  { level: 11, bottom: 22, left: 33 },
  { level: 12, bottom: 17, left: 29 },
  { level: 13, bottom: 11, left: 27 },
  { level: 14, bottom: 8, left: 34 },
  { level: 15, bottom: 0, left: 34 },
  { level: 16, bottom: 3, left: 39 },
  { level: 17, bottom: 6, left: 45 },
  { level: 18, bottom: 11, left: 51 },
  { level: 19, bottom: 16, left: 55 },
  { level: 20, bottom: 22, left: 60 },
  { level: 21, bottom: 27, left: 64 },
  { level: 22, bottom: 34, left: 60 },
  // { level: 23, bottom: 40, left: 65 },
];

export const API_ENDPOINTS = {
  userLevels: '/user/forest/levels',
  gameData: '/games/forest'
};

export const STORAGE_KEYS = {
  currentLevel: 'current-level',
  authToken: 'yaToken'
};

export const ROUTES = {
  levelPattern: '/forest/level/:level',
  getLevelPath: (level) => `/forest/level/${level}`
};

export const UI_TEXT = {
  loginTitle: 'Войдите, чтобы продолжить',
  moduleNumber: 'Модуль 1',
  statusCompleted: 'Завершен',
  statusInProgress: 'В процессе',
  levelsText: 'уровня',
  levelsCompleted: 'уровней завершено',
  moreTagsText: '+6 ещё',
  altText: 'Лесной путь Preview'
}; 