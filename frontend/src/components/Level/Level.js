import React, { useState, useRef, useEffect } from 'react';
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
  Controls
} from './styled';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import playIcon from '../../assets/play.svg'
import pauseIcon from '../../assets/pause.svg'
import speedUpIcon from '../../assets/speed-up.svg'
import questionIcon from '../../assets/question.svg'
import { computeStart } from './utils';
import axios from 'axios';
import level from '../../Level';

import { useRefState } from '../../hooks/useRefState';

const height = window.innerHeight;

export const Level = () => {
  const { id } = useParams();
  const [levelData , setLevelData] = useState(null);
  const levelDataRef = useRef(null)
  const [goals, setGoals] = useState(null);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

        levelDataRef.current = data;
        setLevelData(data);
        setGoals(initialGoals);
      })
      .catch(error => {
        console.error('Error fetching level data:', error);
      });
  }, []);

  const isWall = ({ x, y }) => {
    console.log(x, y)

    return levelData.walls.some(wall => wall.x === x && wall.y === y)
  };

  const moveHero = async (command) => {
    const updatedLevelData = { ...levelDataRef.current };
    const updatedHeroShift = { ...levelDataRef.current.heroShift };
    const updatedHero = { ...levelDataRef.current.hero };

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

    levelDataRef.current = updatedLevelData;
    setLevelData(updatedLevelData);

    await new Promise(resolve => setTimeout(resolve, 300));

    const updatedGems = updatedLevelData.gems.filter(gem => !(gem.x === updatedHero.x && gem.y === updatedHero.y));

    updatedLevelData.hero = updatedHero;
    updatedLevelData.gems = updatedGems;

    levelDataRef.current = updatedLevelData;
    setLevelData(updatedLevelData);
  };

  const start = async () => {
    setIsRunning(true);
    levelDataRef.current.isPaused = false;
    const updatedHeroShift = {
      right: 0,
      bottom: 0
    };
    levelDataRef.current.heroShift = updatedHeroShift
    setLevelData({  ...levelDataRef.current, updatedHeroShift: updatedHeroShift });

    await new Promise((resolve) => setTimeout(() => resolve(), 300));

    try {
      const { data: { commands, heroRanInWall } } = await axios.post(`http://localhost:9000/level/${id}/run`, { code });
      // мега костыль
      const updatedCommands = heroRanInWall ? commands.slice(0, -1) : commands;

      for (const command of updatedCommands) {
        if (levelDataRef.current.isPaused) break;

        await moveHero(command.name)
      }
    } catch (error) {
      console.error('Error running code:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const pause = () => {
    levelDataRef.current.isPaused = true;
    setIsPaused(true);
  }


  if (!levelData) {
    return null;
  }

  const trees = levelData.walls.filter((wall) => wall.type === 'tree');
  const rocks = levelData.walls.filter((wall) => wall.type === 'rock');
  const gems = levelData.gems;


  console.log(levelData.heroShift);
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
            <Wizard x={levelData.initialHero.x} y={levelData.initialHero.y} shift={levelData.heroShift} />
          </MapField>
          <MapBottom />
        </MapWrapper>


        <Controls>
         <LeftButtons>
           {isRunning ? (
             <Button onClick={pause}>
               <ButtonTop color="#7C2828" />
               <ButtonFront color="#B93C3C">
                 <img alt="play" src={pauseIcon} />
               </ButtonFront>
             </Button>
           ) : (
             <Button onClick={start}>
               <ButtonTop color="#1E9029" />
               <ButtonFront color="#3CB949">
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
          value=""
          disabled={false}
          width="529px"
          height={`${height - 20}px`}
          theme="dark"
          extensions={[python()]}
          basicSetup={{
            autocompletion: false
          }}
          onChange={setCode}
        />
      </CodeMirrorWrapper>
    </Wrapper>
  )
}