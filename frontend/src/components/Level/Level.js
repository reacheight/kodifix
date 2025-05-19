import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Wrapper,
  MainWrapper,
  MapWrapper,
  MapField,
  Lawn,
  Sand,
  Tree,
  Rock,
  Water,
  Gem,
  Finish,
  LoadingBackground,
  CellFilter,
  MenuButton,
} from './styled';
import { axios } from '../../api/axios';

import gemSound from '../../assets/sounds/gem.mp3';
import walkingSound from '../../assets/sounds/walking.mp3';
import hitSound from '../../assets/sounds/hit.mp3';
import victorySound from '../../assets/sounds/victory.mp3';
import leverSound from '../../assets/sounds/lever.mp3';
import { useRefState } from '../../hooks/useRefState';
import { Controls } from '../Controls/Controls';
import { Hero } from '../Hero/Hero';
import { Enemy } from '../Enemy/Enemy';
import { Lever } from '../Lever/Lever';
import { CodeEditor } from '../CodeEditor/CodeEditor';
import { delay } from '../../utils/delay';
import { copy } from '../../utils/copy';
import { isNullish } from '../../utils/isNullish';
import { LevelScore } from '../LevelScore/LevelScore';
import GameplayErrorTypes from '../../utils/GameplayErrorTypes';
import { LevelGuide } from '../LevelGuide/LevelGuide';
import { Goals } from '../Goals/Goals';
import { Button } from '../Button/Button';
import { Bridge } from '../Bridge/Bridge';
import { useWindowSize } from '../../hooks/useWindowSize';

const getInitialCodeFromStorage = (game, level) =>
  localStorage.getItem(`code-${game}-${level}`);

const setInitialCode = (game, level, code) =>
  localStorage.setItem(`code-${game}-${level}`, code);

const prepareCells = (grid) => {
  const cells = [];

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      cells.push({ x, y, type: grid[x][y] });
    }
  }

  return cells;
};

const normalSpeedDelays = {
  walking: 300,
  attacking: 500,
  switching: 500,
  findingEnemy: 500,
  hasEnemyAround: 1000,
  enemyWalk: 150,
}

const fastSpeedDelays = {
  walking: 150,
  attacking: 250,
  switching: 250,
  findingEnemy: 250,
  hasEnemyAround: 500,
  enemyWalk: 100,
}

const walkingAudio = new Audio(walkingSound);

export const Level = () => {
  const { gameId, id } = useParams();
  const navigate = useNavigate();
  const { height: innerHeight } = useWindowSize();

  const [game, setGame] = useState(null);
  const [initialLevelData, setInitialLevelData] = useRefState(null);
  const [levelData, setLevelData] = useRefState(null);
  const [heroShift, setHeroShift] = useRefState({ right: 0, bottom: 0 });
  const [enemyShifts, setEnemyShifts] = useRefState({});
  const [isActuallyRunning, setIsActuallyRunning] = useRefState(false);
  const [isPaused, setIsPaused] = useRefState(false);
  const [isStopped, setIsStopped] = useRefState(false);
  const [isMoving, setIsMoving] = useRefState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  const [levelVariants, setLevelVariants] = useRefState(null);
  const [currentVariant, setCurrentVariant] = useRefState(null);
  const [executingCommand, setExecutingCommand] = useRefState(null);
  const [pausedCommand, setPausedCommand] = useRefState(null);
  const [pausedVariant, setPausedVariant] = useRefState(null);
  const [instructions, setInstructions] = useState(null);
  const [heroTexts, setHeroTexts] = useState([]);
  const [code, setCode] = useRefState(getInitialCodeFromStorage(id));
  const [codeErrors, setCodeErrors] = useState(null);
  const [scale, setScale] = useState(1.5);
  const [forceShowGoals, setForceShowGoals] = useState(false);

  const isSpedUp = () => currentVariant.current && currentVariant.current > 0;
  const getDelays = () => isSpedUp() ? fastSpeedDelays : normalSpeedDelays;

  const hasGuid = (data) =>
    data.instructions || data.example || data.newCommands?.length;

  const showHeroGoals = () => {
    const goals = initialLevelData.current.goals.filter((goal) => !!goal.heroText).map((goal) => ({
      value: goal.heroText,
    }));
    setHeroTexts(goals);
  };

  const fetchGames = async () => {
    const { data } = await axios.get(`/games/${gameId}`);

    setGame(data);
  };

  const fetchLevelData = async () => {
    const { data } = await axios.get(`/${gameId}/level/${id}`);

    setInitialLevelData({ ...data });
    setLevelData({ ...data });
  };

  const fetchInstructions = async () => {
    const { data } = await axios.get(`/${gameId}/level/${id}/instructions`);

    setInstructions(data);

    if (hasGuid(data)) {
      setIsGuideOpen(true);
    } else {
      showHeroGoals();
    }
  };

  const fetchInitialCode = async () => {
    const { data } = await axios.get(`/${gameId}/level/${id}/startingCode`);
    if (isNullish(code.current)) {
      setCode(data);
    }
  };

  const resetAllData = () => {
    setInitialLevelData(null);
    setLevelData(null);
    setHeroShift({ right: 0, bottom: 0 });
    setEnemyShifts({});
    setIsActuallyRunning(false);
    setIsStopped(false);
    setIsPaused(false);
    setIsMoving(false);
    setIsScoreOpen(false);
    setLevelVariants(null);
    setCurrentVariant(null);
    setExecutingCommand(null);
    setPausedCommand(null);
    setPausedVariant(null);
    setInstructions(null);
    setHeroTexts([]);
    setCode(getInitialCodeFromStorage(gameId, id));
    setForceShowGoals(false);
    setIsLevelFinished(false);
  };

  useEffect(() => {
    (async () => {
      resetAllData();
      await Promise.all([fetchGames(), fetchLevelData(), fetchInstructions(), fetchInitialCode()]);
      
      if (innerHeight <= 720) {
        const { width, height } = initialLevelData.current;
        if (width * height >= 90)
          setScale(0.7)
        else if (width * height >= 54)
          setScale(0.9);
        else if (width * height >= 45 || height >= 8) {
          setScale(1);
        }
      }
    })();
  }, [id]);

  const executeCommand = async (command, i) => {
    const updatedLevelData = copy(levelData.current);

    setExecutingCommand(i);

    if (command.name === 'enemy_attack') {
      const updatedHeroShift = copy(heroShift.current);
      updatedHeroShift.direction = command.isEnemyToTheLeft ? 'left' : 'right';
      setHeroShift(updatedHeroShift);
      new Audio(hitSound).play();
      updatedLevelData.hero.alive = false;
    } else if (
      ['move_up', 'move_down', 'move_right', 'move_left'].includes(command.name)
    ) {
      const updatedHeroShift = copy(heroShift.current);
      const updatedHero = copy(levelData.current.hero);
      const updatedGems = copy(levelData.current.gems);

      switch (command.name) {
        case 'move_up':
          updatedHeroShift.bottom += 49;
          updatedHero.x -= 1;
          break;
        case 'move_down':
          updatedHeroShift.bottom -= 49;
          updatedHero.x += 1;
          break;
        case 'move_right':
          updatedHeroShift.right -= 49;
          updatedHeroShift.direction = 'right';
          updatedHero.y += 1;
          break;
        case 'move_left':
          updatedHeroShift.right += 49;
          updatedHeroShift.direction = 'left';
          updatedHero.y -= 1;
          break;
      }

      setIsMoving(true);
      setHeroShift(updatedHeroShift);
      walkingAudio.play();

      await delay(getDelays().walking);

      setIsMoving(false);
      walkingAudio.pause();

      const collectedGemIndex = updatedLevelData.gems.findIndex(
        (gem) => gem.x === updatedHero.x && gem.y === updatedHero.y,
      );

      if (collectedGemIndex !== -1) {
        updatedGems[collectedGemIndex].collected = true;
        new Audio(gemSound).play();
      }

      updatedLevelData.hero = updatedHero;
      updatedLevelData.gems = updatedGems;
    } else if (command.name === 'attack') {
      const updatedEnemies = copy(levelData.current.enemies);

      const targetIndex = updatedEnemies.findIndex(
        (enemy) => enemy.name === command.target,
      );

      updatedEnemies[targetIndex].alive = false;
      await delay(getDelays().attacking);

      updatedLevelData.enemies = updatedEnemies;
    } else if (command.name === 'switch') {
      const updatedLevers = copy(levelData.current.levers);
      const updatedBridges = copy(levelData.current.bridges);
      const updatedEnemies = copy(levelData.current.enemies);

      const leverIndex = updatedLevers.findIndex(
        (lever) => lever.activatesId === command.activatableId,
      );
      const bridgeIndex = updatedBridges.findIndex(
        (bridge) => bridge.id === command.activatableId,
      );

      updatedLevers[leverIndex].enabled = !updatedLevers[leverIndex].enabled;
      updatedBridges[bridgeIndex].activated =
        !updatedBridges[bridgeIndex].activated;

      const enemiesIndexes = command.enemiesOnBridge.map(enemyName => updatedEnemies.findIndex(e => e.name === enemyName));
      if (!updatedBridges[bridgeIndex].activated) {
        enemiesIndexes.forEach(index => {
          updatedEnemies[index].alive = false;
        })
      }

      if (enemiesIndexes.length !== 0)
        await delay(getDelays().switching);

      new Audio(leverSound).play();

      updatedLevelData.levers = updatedLevers;
      updatedLevelData.bridges = updatedBridges;
      updatedLevelData.enemies = updatedEnemies;
    } else if (command.name === 'find_nearest_enemy') {
      if (command.hasEnemy) {
        setHeroTexts([
          {
            value: 'find_nearest_enemy: Я тебя вижу!',
            delay: 1000,
          },
        ]);
      } else {
        setHeroTexts([
          {
            value: 'find_nearest_enemy: На этом уровне нет врагов!',
            delay: 1000,
          },
        ]);
      }
      await delay(getDelays().findingEnemy);
    } else if (command.name === 'has_enemy_around') {
      if (command.hasEnemy) {
        setHeroTexts([
          {
            value: 'has_enemy_around: Рядом враг!',
            delay: 1000,
          },
        ]);
      } else {
        setHeroTexts([
          {
            value: 'has_enemy_around: Рядом нет врагов!',
            delay: 1000,
          },
        ]);
      }
      await delay(getDelays().hasEnemyAround);
    } else if (command.name === 'enemy_move') {
      const updatedEnemies = copy(updatedLevelData.enemies);
      const updatedEnemyShifts = { ...enemyShifts.current };

      const targetIndex = updatedEnemies.findIndex(
        (enemy) => enemy.name === command.enemy,
      );

      const targetEnemy = updatedEnemies[targetIndex];
      
      if (!updatedEnemyShifts[targetEnemy.name]) {
        updatedEnemyShifts[targetEnemy.name] = { bottom: 0, right: 0 };
      }
      
      const currentShift = updatedEnemyShifts[targetEnemy.name];

      switch (command.direction) {
        case 'up':
          currentShift.bottom += 49;
          updatedEnemies[targetIndex].x -= 1;
          break;
        case 'down':
          currentShift.bottom -= 49;
          updatedEnemies[targetIndex].x += 1;
          break;
        case 'right':
          currentShift.right -= 49;
          updatedEnemies[targetIndex].y += 1;
          break;
        case 'left':
          currentShift.right += 49;
          updatedEnemies[targetIndex].y -= 1;
          break;
      }

      setEnemyShifts(updatedEnemyShifts);
      
      await delay(getDelays().enemyWalk);

      updatedEnemyShifts[targetEnemy.name] = { bottom: 0, right: 0 };
      setEnemyShifts(updatedEnemyShifts);

      updatedLevelData.enemies = updatedEnemies;
    }

    if (isStopped.current) {
      return;
    }

    setLevelData(updatedLevelData);

    if (command.name === 'switch')
      await delay(getDelays().switching);
    else if (command.name === 'attack') {
      new Audio(hitSound).play();
      await delay(getDelays().attacking);
    }
  };

  const execCommands = async () => {
    const { commands, gameplayError, goals } = levelVariants.current[currentVariant.current].variantResult;
    const allRequiredGoalsCompleted = goals.filter(g => g.required).every(g => g.completed);

    if (commands.length === 0) {
      setHeroTextsForGameplayError(gameplayError);
      stopGameWithoutResetting();
    }

    for (let i = pausedCommand.current || 0; i < commands.length; i++) {
      if (isPaused.current) {
        setPausedCommand(i);
        setPausedVariant({ enemies: levelData.current.enemies, levers: levelData.current.levers });
        setIsActuallyRunning(false);
        break;
      }

      if (isStopped.current) {
        setIsActuallyRunning(false);
        break;
      }

      await executeCommand(commands[i], i);

      // когда успешно прошли первый уровень, говорим, что теперь проверим на других вариантах
      if (i === commands.length - 1 && currentVariant.current === 0 && allRequiredGoalsCompleted && levelVariants.current.length > 1) {
        setHeroTexts([{ value: 'Отлично, теперь проверим твой код\nна других вариантах уровня!', delay: 3000 }]);
        await delay(3000);
      }

      if (i === commands.length - 1) {
        if (!allRequiredGoalsCompleted) { // если текущий вариант не пройден, остальные не смотрим
          setForceShowGoals(true);
          setHeroTextsForGameplayError(gameplayError);

          setIsActuallyRunning(false);
          setIsStopped(true);
          setIsPaused(false);

          stopGameWithoutResetting();
        } else if (currentVariant.current === levelVariants.current.length - 1) { // уровень завершается, только если все варианты прошли
          setIsActuallyRunning(false);
          setIsStopped(false);
          setIsPaused(false);
          setIsLevelFinished(true);
          
          setForceShowGoals(true);
          setHeroTexts([{ value: 'Отлично, мы можем идти дальше', delay: 1500 }]);
          await delay(1500);
          new Audio(victorySound).play();
          setIsGuideOpen(false);
          setIsScoreOpen(true);

          axios.post(`/${gameId}/level/${id}/complete`, { score: levelVariants.current[currentVariant.current].score }, { withCredentials: true })
            .catch(_ => localStorage.setItem('current-level', Math.max(localStorage.getItem('current-level'), id)));
        } else { // если это не последний вариант, то при корректном прохождении варианта просто прогоняем следующий вариант
          resetData();
        }
      }
    }
  };

  const execVariants = async () => {
    if (!levelVariants.current || levelVariants.current.length === 0)
      return;

    setIsActuallyRunning(true);

    for (let i = currentVariant.current || 0; i < levelVariants.current.length; i++) {
      if (isPaused.current || isStopped.current) {
        setIsActuallyRunning(false);
        break;
      }

      const variant = levelVariants.current[i];
      setCurrentVariant(i);
      variant.variant.enemies = variant.variant.enemies ?? initialLevelData.current.enemies;
      variant.variant.levers = variant.variant.levers ?? initialLevelData.current.levers;

      const newLevelData = copy(levelData.current);
      newLevelData.enemies = pausedVariant.current?.enemies || variant.variant.enemies; // если после паузы, то сеттим запомнивших врагов; если нет, то просто врагов из текущего варианта
      newLevelData.levers = pausedVariant.current?.levers || variant.variant.levers;
      newLevelData.bridges = newLevelData.bridges.map(bridge => {
        const lever = newLevelData.levers.find(l => l.activatesId === bridge.id);
        if (lever)
          bridge.activated = lever.enabled;
        return bridge;
      });

      newLevelData.gems = newLevelData.gems.filter(gem => !gem.guardedBy || variant.variant.enemies.find(e => e.name === gem.guardedBy).alive);
      setLevelData(newLevelData);

      if (i > 0)
        await delay(500);

      await execCommands();
    }

    setIsActuallyRunning(false);
  }

  const setHeroTextsForGameplayError = (gameplayError) => {
    if (gameplayError?.type === GameplayErrorTypes.HERO_RAN_IN_WALL) {
      setHeroTexts([{ value: 'Ой, здесь я не могу пройти' }]);
    }

    if (gameplayError?.type === GameplayErrorTypes.HERO_KILLED_BY_ENEMY) {
      setHeroTexts([
        { value: 'С этим рыцарем надо быть аккуратнее..' },
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.HERO_RAN_IN_ENEMY) {
      setHeroTexts([
        { value: 'Я не могу туда идти,\nэтот злой рыцарь меня побьет' },
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.NO_ENEMIES_TO_ATTACK) {
      setHeroTexts([
        { value: 'На этом уровне нет врагов,\nмне некого атаковать' },
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.NO_ENEMY_WITH_GIVEN_NAME) {
      setHeroTexts([
        {
          value: `На этом уровне\nнет врага по имени «${gameplayError.name}»,\nмне некого атаковать`,
        },
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.ENEMY_TOO_FAR) {
      setHeroTexts([
        {
          value: `Я не могу атаковать «${gameplayError.name}»,\nпотому что он слишком далеко`,
        },
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.NO_LEVERS) {
      setHeroTexts([
        {
          value: `На этом уровне нет рычагов,\nмне нечего переключать`,
        },
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.NO_LEVER_WITH_GIVEN_NAME) {
      setHeroTexts([
        {
          value: `На этом уровне нет рычага с названием «${gameplayError.name}»`,
        },
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.LEVER_TOO_FAR) {
      setHeroTexts([
        {
          value: `Рычаг с названием «${gameplayError.name}» слишком далеко,\nя не могу переключить его отсюда`,
          delay: 3000,
        },
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.CANT_BE_HERE) {
      setHeroTexts([
        {
          value: 'Зачем мне сюда? Здесь нет алмаза',
          delay: 3000,
        }
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.ENEMY_SHOULD_NOT_BE_HERE) {
      setHeroTexts([
        {
          value: 'Огромный рыцарь перешёл на наш берег, нам конец!',
          delay: 3000,
        }
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.INFINITE_LOOP) {
      setHeroTexts([
        {
          value: 'Ой, кажется, я застрял в бесконечном цикле!',
          delay: 3000,
        }
      ]);
    }
  };

  const resetData = () => {
    setHeroTexts([]);
    setHeroShift({ right: 0, bottom: 0 });
    setEnemyShifts({});
    setLevelData({ ...initialLevelData.current });
    setCurrentVariant(null);
    setPausedCommand(null);
    setPausedVariant(null);
    setCodeErrors(null);
    setForceShowGoals(false);
    setIsLevelFinished(false);
  };

  const startGame = async () => {
    resetData();
    setIsStopped(false);
    setInitialCode(gameId, id, code.current);

    try {
      const { data } = await axios.post(`/${gameId}/level/${id}/run`, {
        code: code.current,
      });

      setLevelVariants(data);
      await execVariants();
    } catch (error) {
      console.log(error);
      setCodeErrors(error.response.data.errors);
    } finally {
      setIsActuallyRunning(false);
    }
  };

  const continueGame = async () => {
    if (isActuallyRunning.current) {
      return;
    }

    setIsPaused(false);
    setIsStopped(false);
    setForceShowGoals(false);

    await execVariants();
  };

  const pauseGame = () => {
    if (!isActuallyRunning.current) {
      return;
    }

    // последняя команда последнего варианта
    const isLastCommandExecuting =
      currentVariant.current && executingCommand.current === levelVariants.current[currentVariant.current].variantResult.commands.length - 1;

    if (!isLastCommandExecuting) {
      setIsPaused(true);
    }
  };

  const stopGameWithoutResetting = () => {
    if (!isActuallyRunning.current) {
      return;
    }

    setIsStopped(true);

    if (isPaused.current) {
      setIsPaused(false);
    }
  }

  const stopGame = () => {
    stopGameWithoutResetting();
    resetData();
  };

  const changeCode = (value) => {
    setCode(value);
    setCodeErrors(null);
  };

  const openNextLevel = () => {
    navigate(`/${gameId}/level/${Number(id) + 1}`);
  };

  const openMenu = () => {
    navigate(`/${gameId}`);
  };

  const openGuide = () => {
    setIsGuideOpen(true);
    setHeroTexts([]);
  };

  const closeGuide = () => {
    setIsGuideOpen(false);
    showHeroGoals();
  };

  const closeScore = () => {
    setIsLevelFinished(false);
    setIsScoreOpen(false);
    resetData();
  }

  const SCALE_STEP = 0.1;
  const MAX_SCALE = 3.0;
  const MIN_SCALE = 0.8;

  const increaseScale = (coefficient = 1) => {
    setScale((prevState) => {
      if (prevState < MAX_SCALE) {
        return Math.min(
          Number((prevState + SCALE_STEP * coefficient).toFixed(2)),
          MAX_SCALE,
        );
      }

      return prevState;
    });
  };

  const decreaseScale = (coefficient = 1) => {
    setScale((prevState) => {
      if (prevState > MIN_SCALE) {
        return Math.max(
          Number((prevState - SCALE_STEP * coefficient).toFixed(2)),
          MIN_SCALE,
        );
      }

      return prevState;
    });
  };

  const handleWheel = (e) => {
    const { deltaY } = e;

    if (deltaY < 0) {
      increaseScale();
    } else if (deltaY > 0) {
      decreaseScale();
    }
  };

  if (
    (!initialLevelData.current && !levelData.current) ||
    !instructions ||
    isNullish(code.current) ||
    !game
  ) {
    return <LoadingBackground />;
  }

  const { hero, gems, enemies, levers, bridges } = levelData.current;
  const {
    width,
    height,
    hero: initialHero,
    grid,
    finish,
  } = initialLevelData.current;
  const cells = prepareCells(grid);
  const walls = cells.filter(cell => ['tree', 'rock', 'water', 'watert'].includes(cell.type));
  const trees = walls.filter((wall) => wall.type === 'tree');
  const rocks = walls.filter((wall) => wall.type === 'rock');
  const water = walls.filter((wall) => wall.type === 'water' || wall.type === 'watert');
  const executingLine =
    levelVariants.current?.[currentVariant.current]?.variantResult.commands[executingCommand.current]?.start.line;
  const isLastLevel = Number(id) === game.levels;

  return (
    <Wrapper>
      <MenuButton>
        <Button frontColor="#BD3A0F" shadowColor="#8C2B0B" onClick={openMenu} height="50" width="100">
          <span>Меню</span>
        </Button> 
      </MenuButton>
      <Goals
        forceOpen={forceShowGoals}
        goals={initialLevelData.current.goals}
        goalsResult={isNullish(currentVariant.current) ? [] : levelVariants.current[currentVariant.current].variantResult.goals}
      />
      <MainWrapper>
        <MapWrapper scale={scale} onWheel={handleWheel}>
          <MapField width={width} height={height}>
            {cells.map((cell) => {
              if (cell.type === 'sand') {
                return (
                  <Sand key={`${cell.x}${cell.y}`} x={cell.x} y={cell.y}>
                    <CellFilter x={cell.x} y={cell.y} />
                  </Sand>
                );
              }
              else {
                return (
                  <Lawn key={`${cell.x}${cell.y}`} x={cell.x} y={cell.y}>
                    <CellFilter x={cell.x} y={cell.y} />
                  </Lawn>
                )
              }
            })}
            <Finish x={finish.x} y={finish.y} zIndex={finish.x} />
            {water.map((water) => (
              <Water
                isTop={water.type === 'watert'}
                key={`${water.x}${water.y}`}
                x={water.x}
                y={water.y}
                heroX={hero.x}
                heroY={hero.y}
              >
                <CellFilter x={water.x} y={water.y} />
              </Water>
            ))}
            {rocks.map((rock) => (
              <Rock
                key={`${rock.x}${rock.y}`}
                x={rock.x}
                y={rock.y}
                heroX={hero.x}
                heroY={hero.y}
                zIndex={rock.x}
              />
            ))}
            {trees.map((tree) => (
              <Tree
                key={`${tree.x}${tree.y}`}
                x={tree.x}
                y={tree.y}
                heroX={hero.x}
                heroY={hero.y}
                zIndex={tree.x}
              />
            ))}
            {bridges.map((bridge) => (
              <Bridge
                key={`${bridge.id}`}
                xStart={bridge.start.x}
                xEnd={bridge.end.x}
                yStart={bridge.start.y}
                yEnd={bridge.end.y}
                vertical={bridge.vertical}
                activated={bridge.activated}
                random={bridge.random}
              />
            ))}
            {enemies.map((enemy) => (
              <Enemy
                key={`${enemy.x}${enemy.y}`}
                x={enemy.x}
                y={enemy.y}
                heroX={hero.x}
                heroY={hero.y}
                zIndex={enemy.x}
                name={enemy.name}
                alive={enemy.alive}
                nameHidden={enemy.hidden}
                spedUp={isSpedUp()}
                isRandom={enemy.random}
                isBig={enemy.big}
                shift={enemyShifts.current[enemy.name] ?? { bottom: 0, right: 0 }}
              />
            ))}
            <Hero
              x={initialHero.x}
              y={initialHero.y}
              alive={hero.alive === false ? false : true}
              zIndex={hero.x}
              texts={heroTexts}
              shift={heroShift.current}
              animated={isMoving.current}
              spedUp={isSpedUp()}
            />
            {levers.map((lever) => (
              <Lever
                key={`${lever.x}${lever.y}`}
                x={lever.x}
                y={lever.y}
                name={lever.name}
                zIndex={lever.x}
                enabled={lever.enabled}
                hidden={lever.hidden}
              />
            ))}
            {gems.map((gem) => (
              <Gem
                key={`${gem.x}${gem.y}`}
                x={gem.x}
                y={gem.y}
                heroX={hero.x}
                heroY={hero.y}
                zIndex={gem.x}
                collected={gem.collected}
              />
            ))}
          </MapField>
        </MapWrapper>
      </MainWrapper>
      <Controls
          isRunning={isActuallyRunning.current}
          isPaused={isPaused.current}
          isLevelFinished={isLevelFinished}
          hasGuide={hasGuid(instructions)}
          onStart={startGame}
          onPause={pauseGame}
          onContinue={continueGame}
          onStop={stopGame}
          onGuideOpen={openGuide}
        />
      <CodeEditor
        code={code.current}
        codeErrors={codeErrors}
        isRunning={isActuallyRunning.current}
        isPaused={isPaused.current}
        executingLine={executingLine}
        instructions={instructions}
        onCodeChange={changeCode}
        onErrorsClear={() => setCodeErrors(null)}
      />
      {isGuideOpen && (
        <LevelGuide level={id} data={instructions} onClose={closeGuide} />
      )}
      {isScoreOpen && (
        <LevelScore
          isLastLevel={isLastLevel}
          score={levelVariants.current[currentVariant.current].score}
          onContinue={openNextLevel}
          onClose={closeScore}
        />
      )}
    </Wrapper>
  );
};
