import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
  Gem,
  Enemy,
  MapBottom,
  Finish,
} from './styled';
import axios from 'axios';

import { useRefState } from '../../hooks/useRefState';
import { Controls } from '../Controls/Controls';
import { Hero } from '../Hero/Hero';
import { CodeEditor } from '../CodeEditor/CodeEditor';

const initialCode =
  localStorage.getItem('lastCode') ||
  `# пиши код ниже, что бы управлять своим персонажем\n# нажми запуск, когда закончишь\n\n`;

export const Level = () => {
  const { id } = useParams();
  const [initialLevelData, setInitialLevelData] = useRefState(null);
  const [levelData, setLevelData] = useRefState(null);
  const [heroShift, setHeroShift] = useRefState({ right: 0, bottom: 0 });
  const [isRunning, setIsRunning] = useRefState(false);
  const [isPaused, setIsPaused] = useRefState(false);
  const [executionData, setExecutionData] = useRefState(null);
  const [executingCommand, setExecutingCommand] = useRefState(null);
  const [pausedCommand, setPausedCommand] = useRefState(null);
  const [instructions, setInstructions] = useState(null);
  const [heroTexts, setHeroTexts] = useState([]);
  const [code, setCode] = useState(initialCode);

  const fetchLevelData = async () => {
    const { data } = await axios.get(`http://localhost:9000/level/${id}`);

    const initialGoals = ['Я должен пройти\nпо этой дороге '];

    if (data.gems.length > 0) {
      initialGoals.push('Неплохо было бы собрать\nалмазы по пути');
    }

    if (data.linesGoal) {
      initialGoals.push(`Использовать не более\n${data.linesGoal} строк кода`);
    }

    setInitialLevelData({ ...data });
    setLevelData({ ...data });
    setHeroTexts(initialGoals);
  };

  const fetchInstructions = async () => {
    const { data } = await axios.get(
      `http://localhost:9000/level/${id}/instructions`,
    );

    setInstructions(data);
  };

  useEffect(() => {
    fetchLevelData();
    fetchInstructions();
  }, []);

  const executeCommand = async (command) => {
    const updatedLevelData = { ...levelData.current };
    const updatedHeroShift = { ...heroShift.current };
    const updatedHero = { ...levelData.current.hero };
    const updatedEnemies = [...levelData.current.enemies];

    setExecutingCommand(command);

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
        updatedHero.y += 1;
        break;
      case 'move_left':
        updatedHeroShift.right += 49;
        updatedHero.y -= 1;
        break;
      case 'attack': {
        const targetIndex = updatedEnemies.findIndex(
          (enemy) => enemy.name === command.target,
        );
        updatedEnemies[targetIndex] = {
          ...updatedEnemies[targetIndex],
          alive: false,
        };
        break;
      }
      default:
        break;
    }

    setHeroShift(updatedHeroShift);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const updatedGems = updatedLevelData.gems.filter(
      (gem) => !(gem.x === updatedHero.x && gem.y === updatedHero.y),
    );

    updatedLevelData.hero = updatedHero;
    updatedLevelData.gems = updatedGems;
    updatedLevelData.enemies = updatedEnemies;

    setLevelData(updatedLevelData);
  };

  const execCommands = async () => {
    const { commands, heroRanInWall, heroRanInEnemy, hasFinished } =
      executionData.current;

    if (commands.length === 0 && heroRanInWall) {
      setHeroTexts(['Ой, здесь я не могу пройти']);
    }

    if (commands.length === 0 && heroRanInEnemy) {
      setHeroTexts(['Я не могу туда идти, \n этот злой рыцарь меня побьёт']);
    }

    for (let i = pausedCommand.current || 0; i < commands.length; i++) {
      if (isPaused.current) {
        setPausedCommand(i);
        break;
      }

      if (!isRunning.current) {
        break;
      }

      await executeCommand(commands[i]);

      if (i === commands.length - 1) {
        setExecutingCommand(null);
      }

      if (i === commands.length - 1 && heroRanInWall) {
        setHeroTexts(['Ой, здесь я не могу пройти']);
      }

      if (i === commands.length - 1 && heroRanInEnemy) {
        setHeroTexts(['Я не могу туда идти, \n этот злой рыцарь меня побьёт']);
      }

      if (i === commands.length - 1 && hasFinished) {
        setHeroTexts(['Отлично, \n мы можем идти дальше']);
      }
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
    localStorage.setItem('lastCode', code);

    await new Promise((resolve) => setTimeout(() => resolve(), 300));

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

    // подумоть
    await execCommands();

    setIsRunning(false);
  };

  const pauseGame = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const stopGame = () => {
    setIsRunning(false);
    setIsPaused(false);
    resetData();
  };

  if ((!initialLevelData.current && !levelData.current) || !instructions) {
    return null;
  }

  const cells = [];
  const cellsBottom = [];

  for (let x = 0; x < levelData.current.grid.length; x++) {
    for (let y = 0; y < levelData.current.grid[x].length; y++) {
      cells.push({ x, y, type: levelData.current.grid[x][y] });

      if (x === levelData.current.grid.length - 1) {
        cellsBottom.push(levelData.current.grid[x][y]);
      }
    }
  }

  const trees = levelData.current.walls.filter((wall) => wall.type === 'tree');
  const rocks = levelData.current.walls.filter((wall) => wall.type === 'rock');
  const gems = levelData.current.gems;
  const enemies = levelData.current.enemies.filter((enemy) => enemy.alive);

  return (
    <Wrapper>
      <MainWrapper>
        <MapWrapper>
          <MapField
            width={levelData.current.width}
            height={levelData.current.height}
          >
            {cells.map((cell) => {
              if (cell.type === 'lawn') {
                return (
                  <Lawn
                    key={`x-${cell.x}, y-${cell.y}`}
                    x={cell.x}
                    y={cell.y}
                  />
                );
              }
              if (cell.type === 'grass') {
                return (
                  <Grass
                    key={`x-${cell.x}, y-${cell.y}`}
                    x={cell.x}
                    y={cell.y}
                  />
                );
              }
              if (cell.type === 'sand') {
                return (
                  <Sand
                    key={`x-${cell.x}, y-${cell.y}`}
                    x={cell.x}
                    y={cell.y}
                  />
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
                key={`x-${tree.x}, y-${tree.y}`}
                x={tree.x}
                y={tree.y}
                heroX={levelData.current.hero.x}
                heroY={levelData.current.hero.y}
              />
            ))}
            {rocks.map((rock) => (
              <Rock
                key={`x-${rock.x}, y-${rock.y}`}
                x={rock.x}
                y={rock.y}
                heroX={levelData.current.hero.x}
                heroY={levelData.current.hero.y}
              />
            ))}
            {gems.map((gem) => (
              <Gem
                key={`x-${gem.x}, y-${gem.y}`}
                x={gem.x}
                y={gem.y}
                heroX={levelData.current.hero.x}
                heroY={levelData.current.hero.y}
              />
            ))}
            {enemies.map((enemy) => (
              <Enemy
                key={`x-${enemy.x}, y-${enemy.y}`}
                x={enemy.x}
                y={enemy.y}
                heroX={levelData.current.hero.x}
                heroY={levelData.current.hero.y}
              >
                <span>{enemy.name}</span>
              </Enemy>
            ))}
            <Hero
              x={initialLevelData.current.hero.x}
              y={initialLevelData.current.hero.y}
              texts={heroTexts}
              shift={heroShift.current}
              animated={isRunning.current}
            />
            <Finish
              x={initialLevelData.current.finish.x}
              y={initialLevelData.current.finish.y}
            />
          </MapField>
          <MapBottom width={levelData.current.width} />
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
        executingLine={executingCommand.current?.start.line}
        instructions={instructions}
        onChange={setCode}
      />
    </Wrapper>
  );
};
