import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { LoginModal } from '../LoginModal/LoginModal';
import { Layout } from '../Layout/Layout';
import { DemoLevel } from '../DemoLevel/DemoLevel';
import { ActionButton } from '../ActionButton/ActionButton';
import howItWorksImage from '../../assets/how-it-works.png';
import theoryImage from '../../assets/theory.png';
import {
  LandingContainer,
  HeroContainer,
  HeroSection,
  LeftColumn,
  RightColumn,
  Title,
  Subtitle,
  FeaturesContainer,
  FeatureSection,
  FeatureContent,
  FeatureImage,
  FeatureTitle,
  FeatureDescription,
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
    <Layout isHeaderTransparent>
      <LandingContainer>
        <HeroContainer>
          <HeroSection>
            <LeftColumn>
              <Title>Захватывающая игра для изучения программирования</Title>
              <Subtitle>Откройте ребёнку мир компьютерных наук и помогите освоить самый востребованный навык 21 века.</Subtitle>
              <ActionButton onClick={handleContinuePlaying} size="large">
                {isAuthenticated ? 'Продолжить обучение' : 'Начать программировать'}
              </ActionButton>
            </LeftColumn>
            <RightColumn>
              <DemoLevel />
            </RightColumn>
          </HeroSection>
        </HeroContainer>

        <FeaturesContainer>
          <FeatureSection>
            <FeatureContent>
              <FeatureTitle>Обучение — в игровом формате</FeatureTitle>
              <FeatureDescription>
                Пишите код, чтобы управлять персонажем и решать увлекательные задачи. Игровые механики превращают обучение в захватывающее приключение.
              </FeatureDescription>
            </FeatureContent>
            <FeatureImage>
              <img src={howItWorksImage} alt="как работает codemagics" />
            </FeatureImage>
          </FeatureSection>

          <FeatureSection>
            <FeatureContent>
              <FeatureTitle>Подходит полным новичкам</FeatureTitle>
              <FeatureDescription>
              Каждый уровень начинается с необходимой теории — мы объясняем новые концепции простым языком и на наглядных примерах.
              </FeatureDescription>
            </FeatureContent>
            <FeatureImage>
              <img src={theoryImage} alt="теоретические материалы" />
            </FeatureImage>
          </FeatureSection>
        </FeaturesContainer>

        {showLoginModal && (
          <LoginModal 
            onClose={() => setShowLoginModal(false)}
            onSuccess={handleLoginSuccess}
          />
        )}
      </LandingContainer>
    </Layout>
  );
}; 