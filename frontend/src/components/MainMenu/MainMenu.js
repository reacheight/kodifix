import React, { useEffect, useState } from 'react';
import {
  Game,
  GameDescription,
  DescriptionHeader,
  Title,
  Wizard,
  Gem1,
  Gem2,
  Gem3,
  LevelCount,
  Description,
  Tag,
  Tags,
  Map,
  Level,
} from './styled';
import { Layout } from '../Layout/Layout';
import { axios } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export const MainMenu = () => {
  const navigate = useNavigate();

  const [userLevels, setUserLevels] = useState([]);
  const [game, setGame] = useState(null);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newHeight = window.innerHeight;
      setWindowHeight(newHeight);

      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions) 
  }, []);

  const fetchLevels = async () => {
    try {
      const levels = await axios.get('/user/forest/levels', { withCredentials: true });
      if (levels.data)
        setUserLevels(levels.data);
    } catch (e) {
      if (e.response?.status === 401) {
        const currentAnonymousUserLevel = localStorage.getItem('current-level') ?? 0;
        setUserLevels(Array.from({ length: currentAnonymousUserLevel }, (_, i) => ({ levelId: i + 1 })));
      } else {
        throw e;
      }
    }
  }

  const fetchGame = async () => {
    const game = await axios.get('/games/forest', {
      withCredentials: true,
    });
    setGame(game.data);
  }

  useEffect(() => {
    (async () => {
      await Promise.all([fetchLevels(), fetchGame()]);
    })();
  }, []);

  if (!game) return null;

  const completedLevelsCount = userLevels?.length ?? 0;
  const currentLevel = completedLevelsCount + 1;

  const openLevel = (level) => {
    navigate(`/forest/level/${level}`, { replace: true });
  };

  const isCompleted = (level) => userLevels.some((l) => l.levelId === level);

  const getLevelElement = (level, bottom, left) => (
    <Level
      bottomPercent={bottom}
      leftPercent={left}
      onClick={() => openLevel(level)}
      completed={isCompleted(level)}
      current={currentLevel === level}
      available={currentLevel >= level}
    />
  );

  const mapRatio = 898 / 1863;
  const calculateMapWidthAndHeight = () => {
    if (windowHeight / windowWidth > mapRatio) {
      return { width: `${windowWidth}px`, height: `${windowWidth * mapRatio}px` };
    } else {
      return { width: `${windowHeight / mapRatio}px`, height: `${windowHeight}px` };
    }
  }

  const { width, height } = calculateMapWidthAndHeight();

  return (
    <Layout>
      <Game>
        <GameDescription>
          <DescriptionHeader>
            <Title>Алмазный лес</Title>
            <LevelCount>{completedLevelsCount} / 15</LevelCount>
            <Wizard />
            <Gem1 />
            <Gem2 />
            <Gem3 />
          </DescriptionHeader>
          <Description>
            Помогите волшебнику добраться до замка, чтобы вернуть украденную
            книгу заклинаний. Управляйте персонажем с помощью кода,
            побеждайте врагов, проходите опасные преграды и собирайте алмазы.
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
        <Map width={width} height={height}>
          {getLevelElement(1, 68, 25)}
          {getLevelElement(2, 61, 24)}
          {getLevelElement(3, 55, 28)}
          {getLevelElement(4, 41, 26)}
          {getLevelElement(5, 38, 30)}
          {getLevelElement(6, 34, 33)}
          {getLevelElement(7, 37, 38)}
          {getLevelElement(8, 38, 43)}
          {getLevelElement(9, 30, 46)}
          {getLevelElement(10, 23, 51)}
          {getLevelElement(11, 17, 57)}
          {getLevelElement(12, 11, 62)}
          {getLevelElement(13, 3, 61.5)}
          {getLevelElement(14, 0, 69)}
          {getLevelElement(15, 0, 77)}
          {getLevelElement(16, 0, 82)}
          {getLevelElement(17, 10, 81)}
        </Map>
      </Game>
    </Layout>
  );
};
