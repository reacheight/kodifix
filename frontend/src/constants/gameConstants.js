// Game configuration constants
export const GAME_CONFIG = {
  // Movement and animation
  CELL_SIZE: 49,
  MOVEMENT_DELAYS: {
    NORMAL: {
      walking: 300,
      attacking: 500,
      switching: 500,
      findingEnemy: 500,
      hasEnemyAround: 1000,
      enemyWalk: 150,
      fireball: 500,
    },
    FAST: {
      walking: 150,
      attacking: 250,
      switching: 250,
      findingEnemy: 250,
      hasEnemyAround: 500,
      enemyWalk: 100,
      fireball: 250,
    }
  },
  FIREBALL_ONE_CELL_DELAY: 150,

  // Execution limits
  EXECUTION: {
    INFINITE_LOOP_LIMIT: 300,
  },

  // UI scaling
  SCALE: {
    DEFAULT: 1.5,
    STEP: 0.1,
    MIN: 0.2,
    MAX: 3.0,
  },

  // Level limits
  LEVELS: {
    MAX_LEVEL: 22,
  },

  // Grid cell types
  CELL_TYPES: {
    LAWN: 'lawn',
    SAND: 'sand',
    TREE: 'tree',
    ROCK: 'rock',
    WATER: 'water',
    WATER_TOP: 'watert',
  },

  // Wall types (impassable cells)
  WALL_TYPES: ['tree', 'rock', 'watert', 'water'],

  // Screen size breakpoints
  SCREEN: {
    MOBILE_HEIGHT: 720,
    SCALE_THRESHOLDS: {
      LARGE_LEVEL: 90,    // width * height >= 90 -> scale 0.7
      MEDIUM_LEVEL: 54,   // width * height >= 54 -> scale 0.9
      SMALL_LEVEL: 45,    // width * height >= 45 or height >= 8 -> scale 1.0
    }
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  CODE_PREFIX: 'code-',
  CURRENT_LEVEL: 'current-level',
};

// API endpoints
export const API_ENDPOINTS = {
  GAMES: '/games',
  LEVEL: (gameId, levelId) => `/${gameId}/level/${levelId}`,
  LEVEL_RUN: (gameId, levelId) => `/${gameId}/level/${levelId}/run`,
  LEVEL_COMPLETE: (gameId, levelId) => `/${gameId}/level/${levelId}/complete`,
  LEVEL_INSTRUCTIONS: (gameId, levelId) => `/${gameId}/level/${levelId}/instructions`,
  STARTING_CODE: (gameId, levelId) => `/${gameId}/level/${levelId}/startingCode`,
};

// Command names for game execution
export const COMMAND_NAMES = {
  MOVE_UP: 'move_up',
  MOVE_DOWN: 'move_down',
  MOVE_LEFT: 'move_left',
  MOVE_RIGHT: 'move_right',
  ATTACK: 'attack',
  SWITCH: 'switch',
  FIND_NEAREST_ENEMY: 'find_nearest_enemy',
  HAS_ENEMY_AROUND: 'has_enemy_around',
  ENEMY_MOVE: 'enemy_move',
  ENEMY_ATTACK: 'enemy_attack',
  FIREBALL_UP: 'fireball_up',
  FIREBALL_DOWN: 'fireball_down',
  FIREBALL_LEFT: 'fireball_left',
  FIREBALL_RIGHT: 'fireball_right',
};
