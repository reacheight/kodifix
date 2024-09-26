import React, { useEffect, useState } from 'react';
import { Game, GameDescription, DescriptionHeader, Title, Wizard, Gem1, Gem2, Gem3, LevelCount, Description, Tag, Tags, Map, Level } from './styled';
import { Layout } from '../Layout/Layout';
import { axios } from '../../api/axios';

export const MainMenu = () => {
  const [userLevels, setUserLevels] = useState([]);
  const [game, setGame] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const levels = await axios.get('/user/forest/levels', { withCredentials: true });
        if (levels.data)
          setUserLevels(levels.data);
      } finally {
        const game = await axios.get('/games/forest', { withCredentials: true });
        setGame(game.data);
      }
    })();
  }, [])

  if (!game)
    return null;

  const completedLevelsCount = userLevels?.length ?? 0;
  const currentLevel = completedLevelsCount + 1;

  return (
    <Layout>
      <Game>
        <GameDescription>
          <DescriptionHeader>
            <Title>Шервудский лес</Title>
            <LevelCount>{completedLevelsCount} / 15</LevelCount>
            <Wizard />
            <Gem1 />
            <Gem2 />
            <Gem3 />
          </DescriptionHeader>
          <Description>
            Исследуйте древние руины и запретные библиотеки, обучаясь искусству программирования, чтобы создавать мощные заклинания и решать головоломки.
          </Description>
          <Tags>
            <Tag>основы синтаксиса</Tag>
            <Tag>методы</Tag>
            <Tag>параметры</Tag>
            <Tag>строки</Tag>
            <Tag>переменные</Tag>
            <Tag>if-else-выражения</Tag>
          </Tags>
        </GameDescription>
        <Map>
          <Level top={700} left={140} href={'/forest/level/1'} completed={userLevels.some(l => l.levelId === 1)} current={currentLevel === 1} available={currentLevel >= 1} />
          <Level top={545} left={145} href={'/forest/level/2'} completed={userLevels.some(l => l.levelId === 2)} current={currentLevel === 2} available={currentLevel >= 2} />
          <Level top={380} left={280} href={'/forest/level/3'} completed={userLevels.some(l => l.levelId === 3)} current={currentLevel === 3} available={currentLevel >= 3} />
          <Level top={260} left={200} href={'/forest/level/4'} completed={userLevels.some(l => l.levelId === 4)} current={currentLevel === 4} available={currentLevel >= 4} />
          <Level top={140} left={130} href={'/forest/level/5'} completed={userLevels.some(l => l.levelId === 5)} current={currentLevel === 5} available={currentLevel >= 5} />
          <Level top={-10} left={220} href={'/forest/level/6'} completed={userLevels.some(l => l.levelId === 6)} current={currentLevel === 6} available={currentLevel >= 6} />
          <Level top={-135} left={290} href={'/forest/level/7'} completed={userLevels.some(l => l.levelId === 7)} current={currentLevel === 7} available={currentLevel >= 7} />
          <Level top={-260} left={360} href={'/forest/level/8'} completed={userLevels.some(l => l.levelId === 8)} current={currentLevel === 8} available={currentLevel >= 8} />
          <Level top={-370} left={420} href={'/forest/level/9'} completed={userLevels.some(l => l.levelId === 9)} current={currentLevel === 9} available={currentLevel >= 9} />
          <Level top={-420} left={480} href={'/forest/level/9'} completed={userLevels.some(l => l.levelId === 10)} current={currentLevel === 10} available={currentLevel >= 10} />
          <Level top={-450} left={590} href={'/forest/level/10'} completed={userLevels.some(l => l.levelId === 11)} current={currentLevel === 11} available={currentLevel >= 11} />
          <Level top={-500} left={650} href={'/forest/level/11'} completed={userLevels.some(l => l.levelId === 12)} current={currentLevel === 12} available={currentLevel >= 12} />
        </Map>
      </Game>
    </Layout>
  )
}