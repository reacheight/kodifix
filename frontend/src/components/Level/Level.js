import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Wrapper,
  MainWrapper,
  MapWrapper,
  MapField,
  Tree,
  Rock,
  Gem,
  Wizard,
  MapBottom,
  ButtonTop,
  ButtonFront,
  CodeMirrorWrapper,
  Button,
  LeftButtons,
  Controls,
} from './styled';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import playIcon from '../../assets/play.svg'
import pauseIcon from '../../assets/pause.svg'
import speedUpIcon from '../../assets/speed-up.svg'
import questionIcon from '../../assets/question.svg'
import arrowIcon from '../../assets/arrow.svg'
import axios from 'axios';

import { useRefState } from '../../hooks/useRefState';
import { AvailableCommands } from '../AvailableCommands/AvailableCommands';

const height = window.innerHeight;

export const Level = () => {
  const { id } = useParams();
  const [levelData, setLevelData] = useRefState(null);
  const [isRunning, setIsRunning] = useRefState(false);
  const [isPaused, setIsPaused] = useRefState(false);
  const [restCommands, setRestCommands] = useRefState(null);
  const [goals, setGoals] = useState(null);
  const [code, setCode] = useState(`# пиши код ниже, что бы управлять своим персонажем\n# Нажми запуск, когда закончишь\n`);

  useEffect(() => {
    axios.get(`http://localhost:9000/level/${id}`)
      .then(response => {

        const initialGoals = [{ name: 'finish', value: 'Достигнуть финиша', satisfied: false }];

        if (response.data.gems.length > 0) {
          initialGoals.push({ name: 'gems', value: 'Собрать все алмазы', satisfied: false });
        }

        if (response.data.linesGoal) {
          initialGoals.push({ name: 'lines', value: `Использовать не более ${response.data.linesGoal} строк кода`, satisfied: false })
        }

        const data = {
          ...response.data,
          initialHero: response.data.hero,
          heroShift: {
            right: 0,
            bottom: 0,
          },
        };

        setLevelData(data);
        setGoals(initialGoals);
      })
      .catch(error => {
        console.error('Error fetching level data:', error);
      });

    axios.get('http://localhost:9000/level/${id}/instructions').then(response => {

    })
  }, []);

  const moveHero = async (command) => {
    const updatedLevelData = { ...levelData.current };
    const updatedHeroShift = { ...levelData.current.heroShift };
    const updatedHero = { ...levelData.current.hero };

    switch (command) {
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
      default:
        break;
    }

    updatedLevelData.heroShift = updatedHeroShift;

    setLevelData(updatedLevelData);

    await new Promise(resolve => setTimeout(resolve, 300));

    const updatedGems = updatedLevelData.gems.filter(gem => !(gem.x === updatedHero.x && gem.y === updatedHero.y));

    updatedLevelData.hero = updatedHero;
    updatedLevelData.gems = updatedGems;

    setLevelData(updatedLevelData);
  };

  const startGame = async () => {
    setIsRunning(true);

    setLevelData({ ...levelData.current, heroShift: { right: 0, bottom: 0 }})

    await new Promise((resolve) => setTimeout(() => resolve(), 300));

    try {
      const { data: { commands, heroRanInWall } } = await axios.post(`http://localhost:9000/level/${id}/run`, { code });
      // мега костыль
      const updatedCommands = heroRanInWall ? commands.slice(0, -1) : commands;

      for (let i = 0; i < updatedCommands.length; i++) {
        if (isPaused.current) {
          setRestCommands(updatedCommands.slice(i, -1))
          break;
        }

        await moveHero(updatedCommands[i].name)
      }
    } catch (error) {
      console.error('Error running code:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const continueGame = async () => {
    setIsPaused(false)
    setIsRunning(true);

    for (let i = 0; i < restCommands.current.length; i++) {
      if (isPaused.current) {
        setRestCommands(restCommands.current.slice(i, -1))
        break;
      }

      await moveHero(restCommands.current[i].name)
    }

    setIsRunning(false)
  }

  const pauseGame = () => {
    setIsRunning(false);
    setIsPaused(true)
  }

  if (!levelData.current) {
    return null;
  }

  const trees = levelData.current.walls.filter((wall) => wall.type === 'tree');
  const rocks = levelData.current.walls.filter((wall) => wall.type === 'rock');
  const gems = levelData.current.gems;

  return (
    <Wrapper>
      <MainWrapper>
        <MapWrapper>
          <MapField>
            {trees.map((tree) => (
              <Tree key={`x-${tree.x}, y-${tree.y}`} x={tree.x} y={tree.y} />
            ))}
            {rocks.map((rock) => (
              <Rock key={`x-${rock.x}, y-${rock.y}`} x={rock.x} y={rock.y} />
            ))}
            {gems.map((gem) => (
              <Gem key={`x-${gem.x}, y-${gem.y}`} x={gem.x} y={gem.y} />
            ))}
            <Wizard x={levelData.current.initialHero.x} y={levelData.current.initialHero.y} shift={levelData.current.heroShift} />
          </MapField>
          <MapBottom />
        </MapWrapper>


        <Controls>
         <LeftButtons>
           {!isRunning.current && !isPaused.current && (
             <Button onClick={startGame}>
               <ButtonTop color="#1E9029" />
               <ButtonFront color="#3CB949">
                 <img alt="play" src={playIcon} />
               </ButtonFront>
             </Button>
           )}

           {isRunning.current && (
             <Button onClick={pauseGame}>
               <ButtonTop color="#7C2828" />
               <ButtonFront color="#B93C3C">
                 <img alt="play" src={pauseIcon} />
               </ButtonFront>
             </Button>
           )}

           {isPaused.current && (
             <Button onClick={continueGame}>
               <ButtonTop color="#D69C00" />
               <ButtonFront color="#FFBA00">
                 <img alt="play" src={playIcon} />
               </ButtonFront>
             </Button>
           )}

           <Button>
             <ButtonTop color="#626763" />
             <ButtonFront color="#868A86">
               <img alt="play" src={speedUpIcon} />
             </ButtonFront>
           </Button>
         </LeftButtons>
          <Button>
            <ButtonTop color="#626763" />
            <ButtonFront color="#868A86">
              <img alt="play" src={questionIcon} />
            </ButtonFront>
          </Button>
        </Controls>
      </MainWrapper>

      <CodeMirrorWrapper>
        <CodeMirror
          value={code}
          disabled={false}
          width="529px"
          height={`${height - 20}px`}
          theme="dark"
          extensions={[python()]}
          onChange={setCode}
        />
        <AvailableCommands />
      </CodeMirrorWrapper>
    </Wrapper>
  )
}