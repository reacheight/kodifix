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
  Bridge,
  LoadingBackground,
  CellFilter,
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

const getInitialCodeFromStorage = (level) =>
  localStorage.getItem(`code-level-${level}`);

const setInitialCode = (level, code) =>
  localStorage.setItem(`code-level-${level}`, code);

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
  switching: 300,
  findingEnemy: 500,
}

const fastSpeedDelays = {
  walking: 150,
  attacking: 250,
  switching: 150,
  findingEnemy: 250,
}

const walkingAudio = new Audio(walkingSound);

export const Level = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [initialLevelData, setInitialLevelData] = useRefState(null);
  const [levelData, setLevelData] = useRefState(null);
  const [heroShift, setHeroShift] = useRefState({ right: 0, bottom: 0 });
  const [isRunning, setIsRunning] = useRefState(false);
  const [isPaused, setIsPaused] = useRefState(false);
  const [isMoving, setIsMoving] = useRefState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [levelVariants, setLevelVariants] = useRefState(null);
  const [currentVariant, setCurrentVariant] = useRefState(null);
  const [executingCommand, setExecutingCommand] = useRefState(null);
  const [pausedCommand, setPausedCommand] = useRefState(null);
  const [pausedEnemiesVariant, setPausedEnemiesVariant] = useRefState(null);
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
    const goals = initialLevelData.current.goals.map((goal) => ({
      value: goal.heroText,
    }));
    setHeroTexts(goals);
  };

  const fetchGames = async () => {
    const { data } = await axios.get(`/games/wizard-part-1`);

    setGame(data);
  };

  const fetchLevelData = async () => {
    const { data } = await axios.get(`/level/${id}`);

    setInitialLevelData({ ...data });
    setLevelData({ ...data });
  };

  const fetchInstructions = async () => {
    const { data } = await axios.get(`/level/${id}/instructions`);

    setInstructions(data);

    if (hasGuid(data)) {
      setIsGuideOpen(true);
    } else {
      showHeroGoals();
    }
  };

  const fetchInitialCode = async () => {
    const { data } = await axios.get(`/level/${id}/startingCode`);
    if (isNullish(code.current)) {
      setCode(data);
    }
  };

  const resetAllData = () => {
    setInitialLevelData(null);
    setLevelData(null);
    setHeroShift({ right: 0, bottom: 0 });
    setIsRunning(false);
    setIsPaused(false);
    setIsMoving(false);
    setIsScoreOpen(false);
    setLevelVariants(null);
    setCurrentVariant(null);
    setExecutingCommand(null);
    setPausedCommand(null);
    setPausedEnemiesVariant(null);
    setInstructions(null);
    setHeroTexts([]);
    setCode(getInitialCodeFromStorage(id));
    setForceShowGoals(false);
  };

  useEffect(() => {
    (async () => {
      resetAllData();
      await fetchGames();
      await fetchLevelData();
      await fetchInstructions();
      await fetchInitialCode();
    })();
  }, [id]);

  const executeCommand = async (command, i) => {
    const updatedLevelData = copy(levelData.current);

    setExecutingCommand(i);

    if (
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
      new Audio(hitSound).play();
      await delay(getDelays().attacking);

      updatedLevelData.enemies = updatedEnemies;
    } else if (command.name === 'switch') {
      await delay(getDelays().switching);
      const updatedLevers = copy(levelData.current.levers);
      const updatedBridges = copy(levelData.current.bridges);

      const leverIndex = updatedLevers.findIndex(
        (lever) => lever.activatesId === command.activatableId,
      );
      const bridgeIndex = updatedBridges.findIndex(
        (bridge) => bridge.id === command.activatableId,
      );

      updatedLevers[leverIndex].enabled = !updatedLevers[leverIndex].enabled;
      updatedBridges[bridgeIndex].activated =
        !updatedBridges[bridgeIndex].activated;

      new Audio(leverSound).play();

      updatedLevelData.levers = updatedLevers;
      updatedLevelData.bridges = updatedBridges;
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
    }

    // кейс, когда игрок нажал "стоп"
    if (!isRunning.current && !isPaused.current) {
      return;
    }

    setLevelData(updatedLevelData);
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
        setPausedEnemiesVariant(levelData.current.enemies); // запоминаю убитых врагов, чтобы они не воскресли после продолжения после паузы
        break;
      }

      // кейс, когда игрок нажал "стоп"
      if (!isRunning.current) {
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
          stopGameWithoutResetting();
        } else if (currentVariant.current === levelVariants.current.length - 1) { // уровень завершается, только если все варианты прошли
          setForceShowGoals(true);
          setHeroTexts([{ value: 'Отлично, мы можем идти дальше', delay: 1500 }]);
          await delay(1500);
          new Audio(victorySound).play();
          setIsScoreOpen(true);
        } else { // если это не последний вариант, то при корректном прохождении варианта просто прогоняем следующий вариант
          resetData();
        }
      }
    }
  };

  const execVariants = async () => {
    if (!levelVariants.current || levelVariants.current.length === 0)
      return;

    for (let i = currentVariant.current || 0; i < levelVariants.current.length; i++) {
      if (isPaused.current || !isRunning.current) {
        break;
      }


      const variant = levelVariants.current[i];
      setCurrentVariant(i);

      const newLevelData = copy(levelData.current);
      newLevelData.enemies = pausedEnemiesVariant.current || variant.enemiesVariant; // если после паузы, то сеттим запомнивших врагов; если нет, то просто врагов из текущего варианта
      setLevelData(newLevelData);

      await execCommands();
    }
  }

  const setHeroTextsForGameplayError = (gameplayError) => {
    if (gameplayError?.type === GameplayErrorTypes.HERO_RAN_IN_WALL) {
      setHeroTexts([{ value: 'Ой, здесь я не могу пройти' }]);
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
  };

  const resetData = () => {
    setHeroTexts([]);
    setHeroShift({ right: 0, bottom: 0 });
    setLevelData({ ...initialLevelData.current });
    setCurrentVariant(null);
    setPausedCommand(null);
    setPausedEnemiesVariant(null);
    setCodeErrors(null);
    setForceShowGoals(false);
  };

  const startGame = async () => {
    resetData();
    setIsRunning(true);
    setInitialCode(id, code.current);

    try {
      const { data } = await axios.post(`/level/${id}/run`, {
        code: code.current,
      });

      setLevelVariants(data);
      await execVariants();
    } catch (error) {
      setCodeErrors(error.response.data.errors);
    } finally {
      setIsRunning(false);
    }
  };

  const continueGame = async () => {
    setIsPaused(false);
    setIsRunning(true);
    setForceShowGoals(false);

    await execVariants();

    setIsRunning(false);
  };

  const pauseGame = () => {
    // последняя команда последнего варианта
    const isLastCommandExecuting =
      currentVariant.current && executingCommand.current === levelVariants.current[currentVariant.current].variantResult.commands.length - 1;

    if (!isLastCommandExecuting) {
      setIsRunning(false);
      setIsPaused(true);
    }
  };

  const stopGameWithoutResetting = () => {
    if (isRunning.current) {
      setIsRunning(false);
    }

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
    navigate(`/level/${Number(id) + 1}`, { replace: true });
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
    isNullish(code.current)
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
  const activeBridges = bridges?.filter((bridge) => bridge.activated) || [];
  const executingLine =
    levelVariants.current?.[currentVariant.current]?.variantResult.commands[executingCommand.current]?.start.line;
  const isLastLevel = Number(id) === game.levels;

  return (
    <Wrapper>
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
            {activeBridges.map((bridge) => (
              <Bridge
                key={`${bridge.id}`}
                xStart={bridge.start.x}
                xEnd={bridge.end.x}
                yStart={bridge.start.y}
                yEnd={bridge.end.y}
                vertical={bridge.vertical}
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
              />
            ))}
            <Hero
              x={initialHero.x}
              y={initialHero.y}
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
        <Controls
          isRunning={isRunning.current}
          isPaused={isPaused.current}
          hasGuide={hasGuid(instructions)}
          onStart={startGame}
          onPause={pauseGame}
          onContinue={continueGame}
          onStop={stopGame}
          onGuideOpen={openGuide}
        />
      </MainWrapper>
      <CodeEditor
        code={code.current}
        codeErrors={codeErrors}
        isRunning={isRunning.current}
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
          goals={levelVariants.current[currentVariant.current].variantResult.goals}
          onContinue={openNextLevel}
          onClose={closeScore}
        />
      )}
    </Wrapper>
  );
};
