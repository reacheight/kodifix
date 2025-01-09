import React, { useState } from 'react';
import { Layout } from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  ModuleCard,
  ModuleTitle,
  ModuleInfo,
  LevelCount,
  Description,
  Tags,
  Tag,
} from './styled';
import module1Preview from '../../assets/module1-preview.png';
import Cookies from 'js-cookie';
import { LoginModal } from '../LoginModal/LoginModal';

export const MainPage = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState('');

  const handleModuleClick = (path) => {
    const isLoggedIn = !!Cookies.get('yaToken');
    
    if (isLoggedIn) {
      navigate(path);
    } else {
      setPendingNavigation(path);
      setShowLoginModal(true);
    }
  };

  return (
    <Layout>
      <Container>
        <ModuleCard onClick={() => handleModuleClick('/forest')}>
          <img src={module1Preview} alt="Module 1 Preview" />
          <ModuleInfo>
            <ModuleTitle>Модуль 1</ModuleTitle>
            <LevelCount>20 уровней</LevelCount>
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