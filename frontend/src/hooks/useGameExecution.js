import { useState, useCallback } from 'react';
import { useRefState } from './useRefState';
import { audioManager, SOUND_NAMES } from '../utils/audioManager';
import { getHeroTextForError } from '../utils/gameplayErrorMessages';
import { GAME_CONFIG, COMMAND_NAMES } from '../constants/gameConstants';
import { delay } from '../utils/delay';
import { copy } from '../utils/copy';

/**
 * Custom hook for managing game execution state and logic
 * Extracts complex execution logic from the Level component
 */
export const useGameExecution = () => {
  // Execution state
  const [isActuallyRunning, setIsActuallyRunning] = useRefState(false);
  const [isPaused, setIsPaused] = useRefState(false);
  const [isStopped, setIsStopped] = useRefState(false);
  const [isMoving, setIsMoving] = useRefState(false);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  
  // Command execution state
  const [levelResult, setLevelResult] = useRefState(null);
  const [executingCommand, setExecutingCommand] = useRefState(null);
  const [pausedCommand, setPausedCommand] = useRefState(null);
  
  // Hero and enemy positions
  const [heroShift, setHeroShift] = useRefState({ right: 0, bottom: 0 });
  const [enemyShifts, setEnemyShifts] = useRefState({});
  
  // UI state
  const [heroTexts, setHeroTexts] = useState([]);
  const [forceShowGoals, setForceShowGoals] = useState(false);

  /**
   * Execute a single game command with appropriate animations and effects
   */
  const executeCommand = useCallback(async (command, commandIndex, levelData, setLevelData) => {
    const updatedLevelData = copy(levelData.current);
    setExecutingCommand(commandIndex);

    switch (command.name) {
      case COMMAND_NAMES.ENEMY_ATTACK:
        await handleEnemyAttack(command, updatedLevelData);
        break;
        
      case COMMAND_NAMES.MOVE_UP:
      case COMMAND_NAMES.MOVE_DOWN:
      case COMMAND_NAMES.MOVE_LEFT:
      case COMMAND_NAMES.MOVE_RIGHT:
        await handleHeroMovement(command, updatedLevelData);
        break;
        
      case COMMAND_NAMES.ATTACK:
        await handleHeroAttack(command, updatedLevelData);
        break;
        
      case COMMAND_NAMES.SWITCH:
        await handleLeverSwitch(command, updatedLevelData);
        break;
        
      case COMMAND_NAMES.FIND_NEAREST_ENEMY:
        await handleFindNearestEnemy(command);
        break;
        
      case COMMAND_NAMES.HAS_ENEMY_AROUND:
        await handleHasEnemyAround(command);
        break;
        
      case COMMAND_NAMES.ENEMY_MOVE:
        await handleEnemyMovement(command, updatedLevelData);
        break;
        
      case COMMAND_NAMES.FIREBALL_UP:
      case COMMAND_NAMES.FIREBALL_DOWN:
      case COMMAND_NAMES.FIREBALL_LEFT:
      case COMMAND_NAMES.FIREBALL_RIGHT:
        await handleFireball(command, updatedLevelData);
        break;
    }

    if (!isStopped.current) {
      setLevelData(updatedLevelData);
    }

    // Handle post-command delays
    if (command.name === COMMAND_NAMES.SWITCH) {
      await delay(GAME_CONFIG.MOVEMENT_DELAYS.NORMAL.switching);
    } else if (command.name === COMMAND_NAMES.ATTACK) {
      audioManager.play(SOUND_NAMES.HIT);
      await delay(GAME_CONFIG.MOVEMENT_DELAYS.NORMAL.attacking);
    }
  }, [isStopped]);

  /**
   * Handle enemy attack on hero
   */
  const handleEnemyAttack = async (command, updatedLevelData) => {
    const updatedHeroShift = copy(heroShift.current);
    updatedHeroShift.direction = command.isEnemyToTheLeft ? 'left' : 'right';
    setHeroShift(updatedHeroShift);
    audioManager.play(SOUND_NAMES.HIT);
    updatedLevelData.hero.alive = false;
  };

  /**
   * Handle hero movement with animation
   */
  const handleHeroMovement = async (command, updatedLevelData) => {
    const updatedHeroShift = copy(heroShift.current);
    const updatedHero = copy(updatedLevelData.hero);
    const updatedGems = copy(updatedLevelData.gems);

    // Calculate movement based on command
    switch (command.name) {
      case COMMAND_NAMES.MOVE_UP:
        updatedHeroShift.bottom += GAME_CONFIG.CELL_SIZE;
        updatedHero.x -= 1;
        break;
      case COMMAND_NAMES.MOVE_DOWN:
        updatedHeroShift.bottom -= GAME_CONFIG.CELL_SIZE;
        updatedHero.x += 1;
        break;
      case COMMAND_NAMES.MOVE_RIGHT:
        updatedHeroShift.right -= GAME_CONFIG.CELL_SIZE;
        updatedHeroShift.direction = 'right';
        updatedHero.y += 1;
        break;
      case COMMAND_NAMES.MOVE_LEFT:
        updatedHeroShift.right += GAME_CONFIG.CELL_SIZE;
        updatedHeroShift.direction = 'left';
        updatedHero.y -= 1;
        break;
    }

    setIsMoving(true);
    setHeroShift(updatedHeroShift);
    audioManager.play(SOUND_NAMES.WALKING);

    await delay(GAME_CONFIG.MOVEMENT_DELAYS.NORMAL.walking);

    setIsMoving(false);
    audioManager.stop(SOUND_NAMES.WALKING);

    // Check for gem collection
    const collectedGemIndex = updatedGems.findIndex(
      (gem) => gem.x === updatedHero.x && gem.y === updatedHero.y,
    );

    if (collectedGemIndex !== -1) {
      updatedGems[collectedGemIndex].collected = true;
      audioManager.play(SOUND_NAMES.GEM);
    }

    updatedLevelData.hero = updatedHero;
    updatedLevelData.gems = updatedGems;
  };

  /**
   * Handle hero attacking an enemy
   */
  const handleHeroAttack = async (command, updatedLevelData) => {
    const updatedEnemies = copy(updatedLevelData.enemies);
    const targetIndex = updatedEnemies.findIndex(
      (enemy) => enemy.name === command.target,
    );

    if (targetIndex !== -1) {
      updatedEnemies[targetIndex].alive = false;
    }

    await delay(GAME_CONFIG.MOVEMENT_DELAYS.NORMAL.attacking);
    updatedLevelData.enemies = updatedEnemies;
  };

  /**
   * Handle lever switching
   */
  const handleLeverSwitch = async (command, updatedLevelData) => {
    const updatedLevers = copy(updatedLevelData.levers);
    const updatedBridges = copy(updatedLevelData.bridges);
    const updatedEnemies = copy(updatedLevelData.enemies);

    const leverIndex = updatedLevers.findIndex(
      (lever) => lever.activatesId === command.activatableId,
    );
    const bridgeIndex = updatedBridges.findIndex(
      (bridge) => bridge.id === command.activatableId,
    );

    if (leverIndex !== -1) {
      updatedLevers[leverIndex].enabled = !updatedLevers[leverIndex].enabled;
    }
    
    if (bridgeIndex !== -1) {
      updatedBridges[bridgeIndex].activated = !updatedBridges[bridgeIndex].activated;
    }

    // Handle enemies on bridge
    const enemiesIndexes = command.enemiesOnBridge.map(enemyName => 
      updatedEnemies.findIndex(e => e.name === enemyName)
    );
    
    if (bridgeIndex !== -1 && !updatedBridges[bridgeIndex].activated) {
      enemiesIndexes.forEach(index => {
        if (index !== -1) {
          updatedEnemies[index].alive = false;
        }
      });
    }

    if (enemiesIndexes.length !== 0) {
      await delay(GAME_CONFIG.MOVEMENT_DELAYS.NORMAL.switching);
    }

    audioManager.play(SOUND_NAMES.LEVER);

    updatedLevelData.levers = updatedLevers;
    updatedLevelData.bridges = updatedBridges;
    updatedLevelData.enemies = updatedEnemies;
  };

  /**
   * Handle find nearest enemy command
   */
  const handleFindNearestEnemy = async (command) => {
    const message = command.hasEnemy 
      ? 'find_nearest_enemy: Я тебя вижу!'
      : 'find_nearest_enemy: На этом уровне нет врагов!';
    
    setHeroTexts([{ value: message, delay: 1000 }]);
    await delay(GAME_CONFIG.MOVEMENT_DELAYS.NORMAL.findingEnemy);
  };

  /**
   * Handle has enemy around command
   */
  const handleHasEnemyAround = async (command) => {
    const message = command.hasEnemy 
      ? 'has_enemy_around: Рядом враг!'
      : 'has_enemy_around: Рядом нет врагов!';
    
    setHeroTexts([{ value: message, delay: 1000 }]);
    await delay(GAME_CONFIG.MOVEMENT_DELAYS.NORMAL.hasEnemyAround);
  };

  /**
   * Handle enemy movement
   */
  const handleEnemyMovement = async (command, updatedLevelData) => {
    const updatedEnemies = copy(updatedLevelData.enemies);
    const updatedEnemyShifts = { ...enemyShifts.current };

    const targetIndex = updatedEnemies.findIndex(
      (enemy) => enemy.name === command.enemy,
    );

    if (targetIndex === -1) return;

    const targetEnemy = updatedEnemies[targetIndex];
    
    if (!updatedEnemyShifts[targetEnemy.name]) {
      updatedEnemyShifts[targetEnemy.name] = { bottom: 0, right: 0 };
    }
    
    const currentShift = updatedEnemyShifts[targetEnemy.name];

    // Calculate enemy movement
    switch (command.direction) {
      case 'up':
        currentShift.bottom += GAME_CONFIG.CELL_SIZE;
        updatedEnemies[targetIndex].x -= 1;
        break;
      case 'down':
        currentShift.bottom -= GAME_CONFIG.CELL_SIZE;
        updatedEnemies[targetIndex].x += 1;
        break;
      case 'right':
        currentShift.right -= GAME_CONFIG.CELL_SIZE;
        updatedEnemies[targetIndex].y += 1;
        break;
      case 'left':
        currentShift.right += GAME_CONFIG.CELL_SIZE;
        updatedEnemies[targetIndex].y -= 1;
        break;
    }

    setEnemyShifts(updatedEnemyShifts);
    
    await delay(GAME_CONFIG.MOVEMENT_DELAYS.NORMAL.enemyWalk);

    // Reset enemy shift
    updatedEnemyShifts[targetEnemy.name] = { bottom: 0, right: 0 };
    setEnemyShifts(updatedEnemyShifts);

    updatedLevelData.enemies = updatedEnemies;
  };

  /**
   * Handle fireball animation and effects
   */
  const handleFireball = async (command, updatedLevelData) => {
    // TODO: Здесь будет анимация фаерболла
    
    if (command.hitTarget && command.hitTarget.type === 'enemy') {
      const updatedEnemies = copy(updatedLevelData.enemies);
      const targetIndex = updatedEnemies.findIndex(
        (enemy) => enemy.name === command.hitTarget.name,
      );

      if (targetIndex !== -1) {
        updatedEnemies[targetIndex].alive = false;
      }
      
      updatedLevelData.enemies = updatedEnemies;
    }

    // TODO: Добавить звуковые эффекты
    await delay(1000); // Пока что простая задержка
  };

  /**
   * Set hero text messages for gameplay errors using the centralized mapping
   */
  const setHeroTextsForGameplayError = useCallback((gameplayError) => {
    const heroTexts = getHeroTextForError(gameplayError);
    setHeroTexts(heroTexts);
  }, []);

  /**
   * Reset execution state
   */
  const resetExecutionState = useCallback(() => {
    setHeroTexts([]);
    setHeroShift({ right: 0, bottom: 0 });
    setEnemyShifts({});
    setPausedCommand(null);
    setForceShowGoals(false);
    setIsLevelFinished(false);
  }, []);

  return {
    // State
    isActuallyRunning,
    isPaused,
    isStopped,
    isMoving,
    isLevelFinished,
    levelResult,
    executingCommand,
    pausedCommand,
    heroShift,
    enemyShifts,
    heroTexts,
    forceShowGoals,

    // Actions
    setIsActuallyRunning,
    setIsPaused,
    setIsStopped,
    setIsLevelFinished,
    setLevelResult,
    setPausedCommand,
    setHeroTexts,
    setForceShowGoals,
    executeCommand,
    setHeroTextsForGameplayError,
    resetExecutionState,
  };
};
