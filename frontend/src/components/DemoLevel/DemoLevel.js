import React, { useState, useEffect } from 'react';
import {
  MapField,
  Lawn,
  Gem,
  CellFilter,
} from '../Level/styled';
import {
  DemoLevelWrapper,
  DemoMapContainer,
  DemoEditorContainer,
} from './styled';
import { axios } from '../../api/axios';
import { useRefState } from '../../hooks/useRefState';
import { DemoControls } from './DemoControls';
import { Hero } from '../Hero/Hero';
import { DemoCodeEditor } from './DemoCodeEditor';
import { delay } from '../../utils/delay';
import { copy } from '../../utils/copy';
import gemSound from '../../assets/sounds/gem.mp3';

const WALKING_DELAY = 300;
const GEM_SOUND = new Audio(gemSound);
const DEMO_LEVEL_COUNT = 5;

const CODE_HINT = '# пиши код,\n# чтобы управлять волшебником\n\n';

const DEMO_CELLS = Array(16).fill(null).map((_, index) => ({
  x: Math.floor(index / 4),
  y: index % 4,
  type: 'lawn'
}));

export const DemoLevel = () => {
  const [initialLevelData, setInitialLevelData] = useRefState(null);
  const [levelData, setLevelData] = useRefState(null);
  const [heroShift, setHeroShift] = useRefState({ right: 0, bottom: 0 });
  const [isActuallyRunning, setIsActuallyRunning] = useRefState(false);
  const [isMoving, setIsMoving] = useRefState(false);
  const [levelVariants, setLevelVariants] = useRefState(null);
  const [currentVariant, setCurrentVariant] = useRefState(null);
  const [executingCommand, setExecutingCommand] = useRefState(null);
  const [code, setCode] = useRefState(CODE_HINT);
  const [codeErrors, setCodeErrors] = useState(null);
  const [heroTexts] = useState([]);
  const [currentLevelId, setCurrentLevelId] = useRefState(0);

  const fetchCurrentLevel = async () => {
    const { data } = await axios.get(`/demo/level/${currentLevelId.current}`);
    setInitialLevelData({ ...data });
    resetData();
    setCode(CODE_HINT + data.startCode);
  };

  useEffect(() => {
    fetchCurrentLevel();
  }, []);

  const executeCommand = async (command, i) => {
    const updatedLevelData = copy(levelData.current);
    setExecutingCommand(i);

    if (['move_up', 'move_down', 'move_right', 'move_left'].includes(command.name)) {
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
      await delay(WALKING_DELAY);
      setIsMoving(false);

      updatedLevelData.hero = updatedHero;

      const collectedGemIndex = updatedLevelData.gems.findIndex(
        (gem) => gem.x === updatedHero.x && gem.y === updatedHero.y,
      );

      if (collectedGemIndex !== -1) {
        GEM_SOUND.play();
        
        setCurrentLevelId((currentLevelId.current + 1) % DEMO_LEVEL_COUNT);
        await fetchCurrentLevel();
        return;
      }
    }

    setLevelData(updatedLevelData);
  };

  const execCommands = async () => {
    const { commands } = levelVariants.current[currentVariant.current].variantResult;

    for (let i = 0; i < commands.length; i++) {
      await executeCommand(commands[i], i);
    }

    setIsActuallyRunning(false);
  };

  const execVariants = async () => {
    if (!levelVariants.current || levelVariants.current.length === 0) return;

    setIsActuallyRunning(true);

    for (let i = 0; i < levelVariants.current.length; i++) {
      setCurrentVariant(i);

      const newLevelData = copy(levelData.current);
      setLevelData(newLevelData);

      await execCommands();
    }

    setIsActuallyRunning(false);
  };

  const resetData = () => {
    setHeroShift({ right: 0, bottom: 0 });
    setLevelData({ ...initialLevelData.current });
    setCurrentVariant(null);
    setCodeErrors(null);
  };

  const startGame = async () => {
    resetData();

    try {
      const { data } = await axios.post(`/demo/level/${currentLevelId.current}/run`, {
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

  const changeCode = (value) => {
    setCode(value);
    setCodeErrors(null);
  };

  const insertMovement = (direction) => {
    if (isActuallyRunning.current) return;
    const newCommand = `hero.move_${direction}()`;
    const currentCode = code.current;
    
    changeCode(currentCode + '\n' + newCommand);
  };

  if (!initialLevelData.current || !levelData.current) {
    return null;
  }

  const { hero } = levelData.current;
  const { hero: initialHero, gems } = initialLevelData.current;
  const executingLine = levelVariants.current?.[currentVariant.current]?.variantResult.commands[executingCommand.current]?.start.line;

  return (
    <DemoLevelWrapper>
      <DemoMapContainer>
        <MapField width={4} height={4}>
          {DEMO_CELLS.map((cell) => (
            <Lawn key={`${cell.x}${cell.y}`} x={cell.x} y={cell.y}>
              <CellFilter x={cell.x} y={cell.y} />
            </Lawn>
          ))}
          {gems?.map((gem) => (
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
          <Hero
            x={initialHero.x}
            y={initialHero.y}
            alive={true}
            zIndex={hero.x}
            texts={heroTexts}
            shift={heroShift.current}
            animated={isMoving.current}
          />
        </MapField>
      </DemoMapContainer>
      <DemoEditorContainer>
        <DemoCodeEditor
          code={code.current}
          codeErrors={codeErrors}
          isRunning={isActuallyRunning.current}
          executingLine={executingLine}
          onCodeChange={changeCode}
          onErrorsClear={() => setCodeErrors(null)}
        />
        <DemoControls
          isRunning={isActuallyRunning.current}
          onStart={startGame}
          onMoveUp={() => insertMovement('up')}
          onMoveDown={() => insertMovement('down')}
          onMoveLeft={() => insertMovement('left')}
          onMoveRight={() => insertMovement('right')}
        />
      </DemoEditorContainer>
    </DemoLevelWrapper>
  );
}; 