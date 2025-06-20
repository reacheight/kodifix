import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { LoginModal } from '../LoginModal/LoginModal';
import { Layout } from '../Layout/Layout';
import { DemoLevel } from '../DemoLevel/DemoLevel';
import {
  LandingContainer,
  HeroContainer,
  HeroSection,
  LeftColumn,
  RightColumn,
  Title,
  BulletList,
  BulletItem,
  Button
} from './styled';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const handleContinuePlaying = () => {
    if (isAuthenticated) {
      navigate('/game');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    navigate('/game');
  };

  return (
    <Layout>
      <LandingContainer>
        <HeroContainer>
          <HeroSection>
            <LeftColumn>
              <Title>Старт в освоении самого востребованного навыка 21 века</Title>
              <BulletList>
                <BulletItem>Для детей от 10 лет</BulletItem>
                <BulletItem>Подходит полным новичкам</BulletItem>
                <BulletItem>Python — один из самых популярных языков программирования</BulletItem>
                <BulletItem>Самостоятельно и в любое время</BulletItem>
              </BulletList>
              <Button onClick={handleContinuePlaying}>
                {isAuthenticated ? 'Продолжить игру' : 'Начать приключение'}
              </Button>
            </LeftColumn>
            <RightColumn>
              <DemoLevel />
            </RightColumn>
          </HeroSection>
        </HeroContainer>
        {showLoginModal && (
          <LoginModal 
            onClose={() => setShowLoginModal(false)}
            onSuccess={handleLoginSuccess}
            title="Начать приключение"
          />
        )}
      </LandingContainer>
    </Layout>
  );
}; 