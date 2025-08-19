import React, { useState, useEffect, useRef } from 'react';
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
  DragWrapper,
} from './styled';
import { axios } from '../../api/axios';

import { audioManager, SOUND_NAMES } from '../../utils/audioManager';
import { GAME_CONFIG, STORAGE_KEYS, API_ENDPOINTS, COMMAND_NAMES } from '../../constants/gameConstants';
import { useGameExecution } from '../../hooks/useGameExecution';
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
import { useGameData } from '../../hooks/useGameData';
import { LoginModal } from '../LoginModal/LoginModal';
import { UnavailableLevelModal } from '../UnavailableLevelModal/UnavailableLevelModal';
import { useUser } from '../../contexts/UserContext';

const getInitialCodeFromStorage = (gameId, level) =>
  localStorage.getItem(`${STORAGE_KEYS.CODE_PREFIX}${gameId}-${level}`);

const setInitialCode = (gameId, level, code) =>
  localStorage.setItem(`${STORAGE_KEYS.CODE_PREFIX}${gameId}-${level}`, code);

const prepareCells = (grid) => {
  const cells = [];

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      cells.push({ x, y, type: grid[x][y] });
    }
  }

  return cells;
};



export const Level = () => {
  const { gameId, id } = useParams();
  const navigate = useNavigate();
  const { height: innerHeight } = useWindowSize();

  if (id > GAME_CONFIG.LEVELS.MAX_LEVEL)
    return <>Уровень не найден</>;

  // Game execution state and logic
  const gameExecution = useGameExecution();

  // Level and UI state
  const [game, setGame] = useState(null);
  const [initialLevelData, setInitialLevelData] = useRefState(null);
  const [levelData, setLevelData] = useRefState(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [instructions, setInstructions] = useState(null);
  const [code, setCode] = useRefState(getInitialCodeFromStorage(gameId, id));
  const [codeErrors, setCodeErrors] = useState(null);
  const [scale, setScale] = useState(GAME_CONFIG.SCALE.DEFAULT);
  const [dragPosition, setDragPosition] = useRefState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useRefState(false);
  const [dragStart, setDragStart] = useRefState({ x: 0, y: 0 });
  const dragAnimationFrame = useRefState(null);

  const {
    completedLevelsCount,
    isLoading: isGameDataLoading,
    refetchData: refreshGameData,
  } = useGameData();

  const { user, isLoading: isUserLoading, isAuthenticated } = useUser();

  const showLoginModal = !isUserLoading && !isAuthenticated;
  const showAccessModal = id > 6 && !!user && !user.hasAccess;
  const showPreviousLevelsModal = !showAccessModal && !isUserLoading && !isGameDataLoading && isAuthenticated && completedLevelsCount + 1 < id;

  const hasGuid = (data) =>
    data.instructions || data.example || data.newCommands?.length;

  const showHeroGoals = () => {
    const goals = initialLevelData.current.goals.filter((goal) => !!goal.heroText).map((goal) => ({
      value: goal.heroText,
    }));
    gameExecution.setHeroTexts(goals);
  };

  const fetchGames = async () => {
    const { data } = await axios.get(`${API_ENDPOINTS.GAMES}/${gameId}`);
    setGame(data);
  };

  const fetchLevelData = async () => {
    const { data } = await axios.get(API_ENDPOINTS.LEVEL(gameId, id));
    setInitialLevelData({ ...data });
    setLevelData({ ...data });
  };

  const fetchInstructions = async () => {
    const { data } = await axios.get(API_ENDPOINTS.LEVEL_INSTRUCTIONS(gameId, id));
    setInstructions(data);

    if (hasGuid(data)) {
      setIsGuideOpen(true);
    } else {
      showHeroGoals();
    }
  };

  const fetchInitialCode = async () => {
    const { data } = await axios.get(API_ENDPOINTS.STARTING_CODE(gameId, id));
    if (isNullish(code.current)) {
      setCode(data);
    }
  };

  const resetAllData = () => {
    setInitialLevelData(null);
    setLevelData(null);
    setIsScoreOpen(false);
    setInstructions(null);
    setCode(getInitialCodeFromStorage(gameId, id));
    
    // Reset game execution state
    gameExecution.setIsActuallyRunning(false);
    gameExecution.setIsStopped(false);
    gameExecution.setIsPaused(false);
    gameExecution.setLevelResult(null);
    gameExecution.resetExecutionState();
    
    refreshGameData();
  };

  useEffect(() => {
    (async () => {
      resetAllData();
      await Promise.all([fetchGames(), fetchLevelData(), fetchInstructions(), fetchInitialCode()]);
      
      if (innerHeight <= GAME_CONFIG.SCREEN.MOBILE_HEIGHT) {
        const { width, height } = initialLevelData.current;
        const levelSize = width * height;
        
        if (levelSize >= GAME_CONFIG.SCREEN.SCALE_THRESHOLDS.LARGE_LEVEL)
          setScale(0.7);
        else if (levelSize >= GAME_CONFIG.SCREEN.SCALE_THRESHOLDS.MEDIUM_LEVEL)
          setScale(0.9);
        else if (levelSize >= GAME_CONFIG.SCREEN.SCALE_THRESHOLDS.SMALL_LEVEL || height >= 8) {
          setScale(1);
        }
      }
    })();
  }, [id]);

  useEffect(() => {
    return () => {
      if (dragAnimationFrame.current) {
        cancelAnimationFrame(dragAnimationFrame.current);
        dragAnimationFrame.current = null;
      }
    };
  }, []);



  const execCommands = async () => {
    const { commands, gameplayError, goals } = gameExecution.levelResult.current;
    const allRequiredGoalsCompleted = goals.filter(g => g.required).every(g => g.completed);

    if (commands.length === 0) {
      gameExecution.setHeroTextsForGameplayError(gameplayError);
      stopGameWithoutResetting();
      return;
    }

    for (let i = gameExecution.pausedCommand.current || 0; i < commands.length; i++) {
      if (gameExecution.isPaused.current) {
        gameExecution.setPausedCommand(i);
        gameExecution.setIsActuallyRunning(false);
        break;
      }

      if (gameExecution.isStopped.current) {
        gameExecution.setIsActuallyRunning(false);
        break;
      }

      await gameExecution.executeCommand(commands[i], i, levelData, setLevelData);

      if (i === commands.length - 1) {
        gameExecution.setIsActuallyRunning(false);
        gameExecution.setIsStopped(false);
        gameExecution.setIsPaused(false);
        
        if (!allRequiredGoalsCompleted) {
          gameExecution.setForceShowGoals(true);
          gameExecution.setHeroTextsForGameplayError(gameplayError);
          stopGameWithoutResetting();
        } else {
          gameExecution.setIsLevelFinished(true);
          gameExecution.setForceShowGoals(true);
          gameExecution.setHeroTexts([{ value: 'Отлично, мы можем идти дальше', delay: 1500 }]);
          await delay(1500);
          audioManager.play(SOUND_NAMES.VICTORY);
          setIsGuideOpen(false);
          setIsScoreOpen(true);

          axios.post(API_ENDPOINTS.LEVEL_COMPLETE(gameId, id), { score: gameExecution.levelResult.current.score }, { withCredentials: true })
            .catch(_ => localStorage.setItem(STORAGE_KEYS.CURRENT_LEVEL, Math.max(localStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL), id)));
        }
      }
    }
  };





  const resetData = () => {
    setLevelData({ ...initialLevelData.current });
    setCodeErrors(null);
    
    // Reset game execution state
    gameExecution.resetExecutionState();
    
    if (dragAnimationFrame.current) {
      cancelAnimationFrame(dragAnimationFrame.current);
      dragAnimationFrame.current = null;
    }
  };

  const startGame = async () => {
    resetData();
    gameExecution.setIsStopped(false);
    setInitialCode(gameId, id, code.current);

    try {
      const { data } = await axios.post(API_ENDPOINTS.LEVEL_RUN(gameId, id), {
        code: code.current,
      });

      gameExecution.setLevelResult(data);
      gameExecution.setIsActuallyRunning(true);
      await execCommands();
    } catch (error) {
      console.log(error);
      setCodeErrors(error.response.data.errors);
    } finally {
      gameExecution.setIsActuallyRunning(false);
    }
  };

  const continueGame = async () => {
    if (gameExecution.isActuallyRunning.current) {
      return;
    }

    gameExecution.setIsPaused(false);
    gameExecution.setIsStopped(false);
    gameExecution.setForceShowGoals(false);
    gameExecution.setIsActuallyRunning(true);

    await execCommands();
  };

  const pauseGame = () => {
    if (!gameExecution.isActuallyRunning.current) {
      return;
    }

    // Don't pause on the last command
    const isLastCommandExecuting =
      gameExecution.levelResult.current && gameExecution.executingCommand.current === gameExecution.levelResult.current.commands.length - 1;

    if (!isLastCommandExecuting) {
      gameExecution.setIsPaused(true);
    }
  };

  const stopGameWithoutResetting = () => {
    if (!gameExecution.isActuallyRunning.current) {
      return;
    }

    gameExecution.setIsStopped(true);

    if (gameExecution.isPaused.current) {
      gameExecution.setIsPaused(false);
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
    setDragPosition({ x: 0, y: 0 });
    navigate(`/${gameId}/level/${Number(id) + 1}`);
  };

  const openMenu = () => {
    navigate(`/game`);
  };

  const openGuide = () => {
    setIsGuideOpen(true);
    gameExecution.setHeroTexts([]);
  };

  const closeGuide = () => {
    setIsGuideOpen(false);
    showHeroGoals();
  };

  const closeScore = () => {
    gameExecution.setIsLevelFinished(false);
    setIsScoreOpen(false);
    resetData();
  }

  const increaseScale = (coefficient = 1) => {
    setScale((prevState) => {
      if (prevState < GAME_CONFIG.SCALE.MAX) {
        return Math.min(
          Number((prevState + GAME_CONFIG.SCALE.STEP * coefficient).toFixed(2)),
          GAME_CONFIG.SCALE.MAX,
        );
      }

      return prevState;
    });
  };

  const decreaseScale = (coefficient = 1) => {
    setScale((prevState) => {
      if (prevState > GAME_CONFIG.SCALE.MIN) {
        return Math.max(
          Number((prevState - GAME_CONFIG.SCALE.STEP * coefficient).toFixed(2)),
          GAME_CONFIG.SCALE.MIN,
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

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - dragPosition.current.x, y: e.clientY - dragPosition.current.y });
      e.preventDefault();
    }
  };

  const updateDragPosition = (clientX, clientY) => {
    if (dragAnimationFrame.current) {
      cancelAnimationFrame(dragAnimationFrame.current);
    }
    
    dragAnimationFrame.current = requestAnimationFrame(() => {
      if (isDragging.current) {
        const newX = clientX - dragStart.current.x;
        const newY = clientY - dragStart.current.y;
        setDragPosition({ x: newX, y: newY });
      }
      dragAnimationFrame.current = null;
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      updateDragPosition(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = (e) => {
    if (e.button === 0) {
      setIsDragging(false);
      if (dragAnimationFrame.current) {
        cancelAnimationFrame(dragAnimationFrame.current);
        dragAnimationFrame.current = null;
      }
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (dragAnimationFrame.current) {
      cancelAnimationFrame(dragAnimationFrame.current);
      dragAnimationFrame.current = null;
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
  const walls = cells.filter(cell => GAME_CONFIG.WALL_TYPES.includes(cell.type));
  const trees = walls.filter((wall) => wall.type === GAME_CONFIG.CELL_TYPES.TREE);
  const rocks = walls.filter((wall) => wall.type === GAME_CONFIG.CELL_TYPES.ROCK);
  const water = walls.filter((wall) => wall.type === GAME_CONFIG.CELL_TYPES.WATER || wall.type === GAME_CONFIG.CELL_TYPES.WATER_TOP);
  const executingLine =
    gameExecution.levelResult.current?.commands[gameExecution.executingCommand.current]?.start.line;
  const isLastLevel = Number(id) === game.levels;

  return (
    <Wrapper>
      <MenuButton>
        <Button frontColor="#BD3A0F" shadowColor="#8C2B0B" onClick={openMenu} height="50" width="100">
          <span>Меню</span>
        </Button> 
      </MenuButton>
      <Goals
        forceOpen={gameExecution.forceShowGoals}
        goals={initialLevelData.current.goals}
        goalsResult={gameExecution.levelResult.current?.goals || []}
      />
      <MainWrapper>
        <DragWrapper
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          dragPosition={dragPosition.current}
          isDragging={isDragging.current}
        >
          <MapWrapper 
            scale={scale}
          >
            <MapField width={width} height={height}>
              {cells.map((cell) => {
                if (cell.type === GAME_CONFIG.CELL_TYPES.SAND) {
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
                  isTop={water.type === GAME_CONFIG.CELL_TYPES.WATER_TOP}
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
                  spedUp={false}

                  isBig={enemy.big}
                  shift={gameExecution.enemyShifts.current[enemy.name] ?? { bottom: 0, right: 0 }}
                />
              ))}
              <Hero
                x={initialHero.x}
                y={initialHero.y}
                alive={hero.alive === false ? false : true}
                zIndex={hero.x}
                texts={gameExecution.heroTexts}
                shift={gameExecution.heroShift.current}
                animated={gameExecution.isMoving.current}
                spedUp={false}
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
        </DragWrapper>
      </MainWrapper>
      <Controls
          isRunning={gameExecution.isActuallyRunning.current}
          isPaused={gameExecution.isPaused.current}
          isLevelFinished={gameExecution.isLevelFinished}
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
        isRunning={gameExecution.isActuallyRunning.current}
        isPaused={gameExecution.isPaused.current}
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
          score={gameExecution.levelResult.current?.score || 0}
          onContinue={openNextLevel}
          onClose={closeScore}
        />
      )}
      {showLoginModal && <LoginModal title='Войдите, чтобы начать' canClose={false} />}
      {showPreviousLevelsModal && <UnavailableLevelModal />}
      {showAccessModal && <UnavailableLevelModal dontHaveAccess />}
    </Wrapper>
  );
};
