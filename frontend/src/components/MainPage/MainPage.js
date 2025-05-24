import React, { useState, useEffect } from 'react';
import { Layout } from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  ModuleCard,
  ModuleInfo,
  ModuleTitle,
  LevelCount,
  Description,
  Tags,
  Tag,
  GameMapCard,
  GameMapContainer,
  Map,
  Level,
  TopGradient,
  BotGradient,
} from './styled';
import module1Preview from '../../assets/module1-preview.png';
import Cookies from 'js-cookie';
import { LoginModal } from '../LoginModal/LoginModal';
import { axios } from '../../api/axios';

export const MainPage = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState('');
  const [userLevels, setUserLevels] = useState([]);
  const [game, setGame] = useState(null);

  const fetchLevels = async () => {
    try {
      const levels = await axios.get('/user/forest/levels', { withCredentials: true });
      if (levels.data) setUserLevels(levels.data);
    } catch (e) {
      if (e.response?.status === 401) {
        const currentAnonymousUserLevel = localStorage.getItem('current-level') ?? 0;
        setUserLevels(Array.from({ length: currentAnonymousUserLevel }, (_, i) => ({ levelId: i + 1 })));
      }
    }
  };

  const fetchGame = async () => {
    try {
      const game = await axios.get('/games/forest', { withCredentials: true });
      setGame(game.data);
    } catch (e) {
      // Handle error gracefully
    }
  };

  useEffect(() => {
    fetchLevels();
    fetchGame();
  }, []);

  const handleLevelClick = (level) => {
    const isLoggedIn = !!Cookies.get('yaToken');
    
    if (isLoggedIn) {
      navigate(`/forest/level/${level}`);
    } else {
      setPendingNavigation(`/forest/level/${level}`);
      setShowLoginModal(true);
    }
  };

  const isCompleted = (level) => userLevels.some((l) => l.levelId === level);
  const completedLevelsCount = userLevels?.length ?? 0;
  const currentLevel = completedLevelsCount + 1;

  const getLevelElement = (level, bottom, left) => (
    <Level
      key={level}
      bottomPercent={bottom}
      leftPercent={left}
      onClick={() => handleLevelClick(level)}
      completed={isCompleted(level)}
      current={currentLevel === level}
      available={currentLevel >= level}
    />
  );

  // Calculate map dimensions for the card
  const maxMapWidth = 900;
  const maxMapHeight = 600;
  const mapRatio = 898 / 1863;
  
  const calculateMapWidthAndHeight = () => {
    if (maxMapHeight / maxMapWidth > mapRatio) {
      return { width: `${maxMapWidth}px`, height: `${maxMapWidth * mapRatio}px` };
    } else {
      return { width: `${maxMapHeight / mapRatio}px`, height: `${maxMapHeight}px` };
    }
  };

  const { width, height } = calculateMapWidthAndHeight();

  return (
    <Layout>
      <Container>
        <ModuleCard>
          <img src={module1Preview} alt="Module 1 Preview" />
          <ModuleInfo>
            <ModuleTitle>Лесной путь</ModuleTitle>
            <LevelCount>21 уровень</LevelCount>
            <Tags>
              <Tag>знакомство с платформой</Tag>
              <Tag>основы синтаксиса</Tag>
              <Tag>методы</Tag>
              <Tag>параметры</Tag>
              <Tag>строки</Tag>
              <Tag>комментарии</Tag>
              <Tag>переменные</Tag>
              <Tag>if-выражения</Tag>
            </Tags>
          </ModuleInfo>
        </ModuleCard>

        <GameMapCard>
          <GameMapContainer>
            <Map width={width} height={height}>
              <TopGradient />
              <BotGradient />
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
              {getLevelElement(18, 20, 79)}
              {getLevelElement(19, 30, 77)}
              {getLevelElement(20, 40, 73)}
            </Map>
          </GameMapContainer>
        </GameMapCard>
      </Container>

      {showLoginModal && (
        <LoginModal 
          title="Войдите, чтобы продолжить"
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setShowLoginModal(false);
            navigate(pendingNavigation);
          }}
        />
      )}
    </Layout>
  );
}; 