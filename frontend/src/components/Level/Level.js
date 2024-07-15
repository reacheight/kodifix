import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Wrapper,
  MainWrapper,
  MapWrapper,
  MapField,
  Lawn,
  Grass,
  Sand,
  LawnBottom,
  SandBottom,
  Tree,
  Rock,
  Water,
  Gem,
  MapBottom,
  Finish,
} from './styled';
import axios from 'axios';

import gemSound from '../../assets/sounds/gem.mp3';
import walkingSound from '../../assets/sounds/walking.mp3';
import hitSound from '../../assets/sounds/hit.mp3';
import victory from '../../assets/sounds/victory.mp3';
import { useRefState } from '../../hooks/useRefState';
import { Controls } from '../Controls/Controls';
import { Hero } from '../Hero/Hero';
import { Enemy } from '../Enemy/Enemy';
import { CodeEditor } from '../CodeEditor/CodeEditor';
import { delay } from '../../utils/delay';
import { copy } from '../../utils/copy';
import { LevelScore } from '../LevelScore/LevelScore';
import GameplayErrorTypes from '../../utils/GameplayErrorTypes';

const getInitialCode = (level) =>
  localStorage.getItem(`code-level-${level}`) ||
  `# пиши код ниже, что бы управлять своим персонажем\n# нажми запуск, когда закончишь\n\n`;

const setInitialCode = (level, code) =>
  localStorage.setItem(`code-level-${level}`, code);

const prepareCells = (grid) => {
  const cells = [];
  const cellsBottom = [];

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      cells.push({ x, y, type: grid[x][y] });

      if (x === grid.length - 1) {
        cellsBottom.push(grid[x][y]);
      }
    }
  }

  return {
    cells,
    cellsBottom,
  };
};

const walkingAudio = new Audio(walkingSound);

export const Level = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialLevelData, setInitialLevelData] = useRefState(null);
  const [levelData, setLevelData] = useRefState(null);
  const [heroShift, setHeroShift] = useRefState({ right: 0, bottom: 0 });
  const [isRunning, setIsRunning] = useRefState(false);
  const [isPaused, setIsPaused] = useRefState(false);
  const [isMoving, setIsMoving] = useRefState(false);
  const [isScoreVisible, setIsScoreVisible] = useState(false);
  const [executionData, setExecutionData] = useRefState(null);
  const [executingCommand, setExecutingCommand] = useRefState(null);
  const [pausedCommand, setPausedCommand] = useRefState(null);
  const [instructions, setInstructions] = useState(null);
  const [heroTexts, setHeroTexts] = useState([]);
  const [code, setCode] = useState(getInitialCode(id));

  const fetchLevelData = async () => {
    const { data } = await axios.get(`http://localhost:9000/level/${id}`);

    const goals = data.goals.map((goal) => ({ value: goal.heroText }));

    setInitialLevelData({ ...data });
    setLevelData({ ...data });
    setHeroTexts(goals);
  };

  const fetchInstructions = async () => {
    const { data } = await axios.get(
      `http://localhost:9000/level/${id}/instructions`,
    );

    setInstructions(data);
  };

  const resetAllData = () => {
    setInitialLevelData(null);
    setLevelData(null);
    setHeroShift({ right: 0, bottom: 0 });
    setIsRunning(false);
    setIsPaused(false);
    setIsMoving(false);
    setIsScoreVisible(false);
    setExecutionData(null);
    setExecutingCommand(null);
    setPausedCommand(null);
    setInstructions(null);
    setHeroTexts([]);
    setCode(getInitialCode(id));
  };

  useEffect(() => {
    resetAllData();
    fetchLevelData();
    fetchInstructions();
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

      await delay(300);

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
      await delay(500);

      updatedLevelData.enemies = updatedEnemies;
    }

    // кейс, когда игрок нажал "стоп"
    if (!isRunning.current && !isPaused.current) {
      return;
    }

    setLevelData(updatedLevelData);
  };

  const execCommands = async () => {
    const { commands, gameplayError, hasFinished } = executionData.current;

    if (commands.length === 0) {
      setHeroTextsForGameplayError(gameplayError);
    }

    for (let i = pausedCommand.current || 0; i < commands.length; i++) {
      if (isPaused.current) {
        setPausedCommand(i);
        break;
      }

      // кейс, когда игрок нажал "стоп"
      if (!isRunning.current) {
        break;
      }

      await executeCommand(commands[i], i);

      if (i === commands.length - 1) {
        setExecutingCommand(null);
        walkingAudio.currentTime = 0;

        setHeroTextsForGameplayError(gameplayError);
      }

      if (i === commands.length - 1 && hasFinished) {
        setHeroTexts([
          { value: 'Отлично,\nмы можем идти дальше', delay: 1500 },
        ]);
        await delay(1500);
        new Audio(victory).play();
        setIsScoreVisible(true);
      }
    }
  };

  const setHeroTextsForGameplayError = (gameplayError) => {
    if (gameplayError?.type === GameplayErrorTypes.HERO_RAN_IN_WALL) {
      setHeroTexts([{ value: 'Ой, здесь я не могу пройти' }]);
    }

    if (gameplayError?.type === GameplayErrorTypes.HERO_RAN_IN_ENEMY) {
      setHeroTexts([
        { value: 'Я не могу туда идти,\nэтот злой рыцарь меня побьёт' },
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
          value: `На этом уровне\nнет врага по имени ${gameplayError.name},\nмне некого атаковать`,
        },
      ]);
    }

    if (gameplayError?.type === GameplayErrorTypes.ENEMY_TOO_FAR) {
      setHeroTexts([
        {
          value: `Я не могу атаковать ${gameplayError.name},\nпотому что он слишком далеко`,
        },
      ]);
    }
  };

  const resetData = () => {
    setHeroTexts([]);
    setHeroShift({ right: 0, bottom: 0 });
    setLevelData({ ...initialLevelData.current });
    setExecutionData(null);
    setPausedCommand(null);
  };

  const startGame = async () => {
    resetData();
    setIsRunning(true);
    setInitialCode(id, code);

    try {
      const { data } = await axios.post(
        `http://localhost:9000/level/${id}/run`,
        { code },
      );

      setExecutionData(data);

      await execCommands();
    } catch (error) {
      console.error('Error running code:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const continueGame = async () => {
    setIsPaused(false);
    setIsRunning(true);

    await execCommands();

    setIsRunning(false);
  };

  const pauseGame = () => {
    const isLastCommandExecuting =
      executingCommand.current === executionData.current.commands.length - 1;

    if (!isLastCommandExecuting) {
      setIsRunning(false);
      setIsPaused(true);
    }
  };

  const stopGame = async () => {
    if (isRunning.current) {
      setIsRunning(false);
    }

    if (isPaused.current) {
      setIsPaused(false);
    }

    resetData();
  };

  const openNextLevel = () => {
    navigate(`/level/${Number(id) + 1}`, { replace: true });
  };

  // без данных выводить фон и редактор
  if ((!initialLevelData.current && !levelData.current) || !instructions) {
    return null;
  }

  const { hero, gems, enemies } = levelData.current;
  const {
    width,
    height,
    hero: initialHero,
    walls,
    grid,
    finish,
  } = initialLevelData.current;
  const trees = walls.filter((wall) => wall.type === 'tree');
  const rocks = walls.filter((wall) => wall.type === 'rock');
  const water = walls.filter((wall) => wall.type === 'water');
  const executingLine =
    executionData.current?.commands[executingCommand.current]?.start.line;
  const { cells, cellsBottom } = prepareCells(grid);

  return (
    <Wrapper>
      <MainWrapper>
        <MapWrapper>
          <MapField width={width} height={height}>
            {cells.map((cell) => {
              if (cell.type === 'lawn') {
                return (
                  <Lawn key={`${cell.x}${cell.y}`} x={cell.x} y={cell.y} />
                );
              }
              if (cell.type === 'grass') {
                return (
                  <Grass key={`${cell.x}${cell.y}`} x={cell.x} y={cell.y} />
                );
              }
              if (cell.type === 'sand') {
                return (
                  <Sand key={`${cell.x}${cell.y}`} x={cell.x} y={cell.y} />
                );
              }
            })}
            {cellsBottom.map((cellBottom, i) => {
              if (cellBottom === 'lawn' || cellBottom === 'grass') {
                return <LawnBottom key={i} />;
              }

              if (cellBottom === 'sand') {
                return <SandBottom key={i} />;
              }
            })}
            {trees.map((tree) => (
              <Tree
                key={`${tree.x}${tree.y}`}
                x={tree.x}
                y={tree.y}
                heroX={hero.x}
                heroY={hero.y}
              />
            ))}
            {rocks.map((rock) => (
              <Rock
                key={`${rock.x}${rock.y}`}
                x={rock.x}
                y={rock.y}
                heroX={hero.x}
                heroY={hero.y}
              />
            ))}
            {water.map((water) => (
              <Water
                key={`${water.x}${water.y}`}
                x={water.x}
                y={water.y}
                heroX={hero.x}
                heroY={hero.y}
              />
            ))}
            {gems.map((gem) => (
              <Gem
                key={`${gem.x}${gem.y}`}
                x={gem.x}
                y={gem.y}
                heroX={hero.x}
                heroY={hero.y}
                collected={gem.collected}
              />
            ))}
            {enemies.map((enemy) => (
              <Enemy
                key={`${enemy.x}${enemy.y}`}
                x={enemy.x}
                y={enemy.y}
                heroX={hero.x}
                heroY={hero.y}
                name={enemy.name}
                alive={enemy.alive}
              />
            ))}
            <Hero
              x={initialHero.x}
              y={initialHero.y}
              texts={heroTexts}
              shift={heroShift.current}
              animated={isMoving.current}
            />
            <Finish x={finish.x} y={finish.y} />
          </MapField>
          <MapBottom width={width} />
        </MapWrapper>
        <Controls
          isRunning={isRunning.current}
          isPaused={isPaused.current}
          onStart={startGame}
          onPause={pauseGame}
          onContinue={continueGame}
          onStop={stopGame}
        />
      </MainWrapper>
      <CodeEditor
        code={code}
        isRunning={isRunning.current}
        isPaused={isPaused.current}
        executingLine={executingLine}
        instructions={instructions}
        onChange={setCode}
      />
      {isScoreVisible && <LevelScore onContinue={openNextLevel} />}
    </Wrapper>
  );
};
