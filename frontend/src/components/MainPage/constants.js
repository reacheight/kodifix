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
  { level: 4, bottom: 47, left: 29 },
  { level: 5, bottom: 43, left: 33 },
  { level: 6, bottom: 38, left: 28 },
  { level: 7, bottom: 31, left: 29 },
  { level: 8, bottom: 26, left: 35 },
  { level: 9, bottom: 19, left: 32 },
  { level: 10, bottom: 13, left: 27 },
  { level: 11, bottom: 8, left: 33 },
  { level: 12, bottom: 0, left: 32 },
  { level: 13, bottom: 3, left: 39 },
  { level: 14, bottom: 6, left: 45 },
  { level: 15, bottom: 11, left: 51 },
  { level: 16, bottom: 18, left: 57 },
  { level: 17, bottom: 21, left: 63 },
  { level: 18, bottom: 26, left: 69 },
  { level: 19, bottom: 31, left: 75 },
  { level: 20, bottom: 20, left: 79 },
  { level: 21, bottom: 30, left: 77 },
  { level: 22, bottom: 40, left: 73 }
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