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
  Subtitle,
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
              <Title>Захватывающая игра для изучения программирования</Title>
              <Subtitle>Откройте ребёнку мир компьютерных наук и помогите освоить самый востребованный навык 21 века.</Subtitle>
              <Button onClick={handleContinuePlaying}>
                {isAuthenticated ? 'Продолжить обучение' : 'Начать программировать'}
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