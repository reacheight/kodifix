import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { LoginModal } from '../LoginModal/LoginModal';
import { Layout } from '../Layout/Layout';
import { ActionButton } from '../ActionButton/ActionButton';
import howItWorksImage from '../../assets/how-it-works.webp';
import theoryImage from '../../assets/theory.webp';
import pythonImage from '../../assets/python.webp';
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
  CurriculumContainer,
  CurriculumSection,
  ModulesList,
  ModuleCard,
  ModuleTitle,
  ModuleSubtitle,
  CurriculumContent,
  CurriculumHeader,
  CurriculumBody,
  CurriculumLeftSection,
  CurriculumRightSection,
  CurriculumTitle,
  LevelsCount,
  TopicsGrid,
  TopicTag,
  DemoLevelSkeletonWrapper,
  SkeletonMapContainer,
  SkeletonGameField,
  SkeletonCell,
  SkeletonEditorContainer,
} from './styled';
import { Button } from '../Button/Button';

const DemoLevel = lazy(() =>
  import('../DemoLevel/DemoLevel').then((module) => ({ default: module.DemoLevel }))
);

const LandingPageDemoSkeleton = () => (
  <DemoLevelSkeletonWrapper>
    <SkeletonMapContainer>
      <SkeletonGameField>
        {Array(16).fill(null).map((_, index) => (
          <SkeletonCell key={index} />
        ))}
      </SkeletonGameField>
    </SkeletonMapContainer>
    <SkeletonEditorContainer>
    </SkeletonEditorContainer>
  </DemoLevelSkeletonWrapper>
);

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [selectedModule, setSelectedModule] = React.useState(1);

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

  const modules = [
    {
      id: 1,
      title: 'Модуль 1',
      subtitle: 'Первые шаги',
      levelsCountSpan: '22 уровня',
      topics: [
        'Знакомство с платформой',
        'Основы синтаксиса Python',
        'Методы',
        'Аргументы',
        'Строки',
        'Комментарии',
        'Переменные',
        'Циклы while',
        'if-выражения'
      ],
      isReady: true,
    },
    {
      id: 2,
      title: 'Модуль 2',
      subtitle: 'Изучаем основы',
      levelsCountSpan: '25 уровней',
      topics: [
        'Циклы for',
        'if-else-выражения',
        'Типы данных',
        'Математические операции',
        'Операторы сравнения',
        'Логические операторы',
      ],
      isReady: false,
    },
    {
      id: 3,
      title: 'Модуль 3',
      subtitle: 'Расширяем знания',
      levelsCountSpan: '30 уровней',
      topics: [
        'Функции',
        'Списки',
        'Кортежи',
        'Словари',
        'Рекурсия',
      ],
      isReady: false,
    }
  ];

  const selectedModuleData = modules.find(module => module.id === selectedModule);

  return (
    <Layout isHeaderTransparent showAutoLogin={false}>
      <LandingContainer>
        <HeroContainer>
          <HeroSection>
            <LeftColumn>
              <Title>Увлекательная игра для обучения детей программированию</Title>
              <Subtitle>Раскройте потенциал вашего ребёнка и заложите фундамент для успешного будущего с нашей образовательной платформой.</Subtitle>
              <Button
                disabled={false}
                shadowColor="#1B4B82"
                frontColor="#2D7CD4"
                alt={isAuthenticated ? 'Продолжить обучение' : 'Начать программировать'}
                onClick={handleContinuePlaying}
                width={300}
                height={50}
                shadowHeight={15}
                fontFamily="Montserrat"
              />
            </LeftColumn>
            <RightColumn>
              <React.Suspense fallback={<LandingPageDemoSkeleton />}>
                <DemoLevel />
              </React.Suspense>
            </RightColumn>
          </HeroSection>
        </HeroContainer>

        <FeaturesContainer>
          <FeatureSection>
            <FeatureContent>
              <FeatureTitle>Обучение — в&nbsp;игровом формате</FeatureTitle>
              <FeatureDescription>
                Ребёнок пишет код, чтобы управлять персонажем, решать головоломки и собирать награды —
                учебный процесс превращается в захватывающую игру.
              </FeatureDescription>
            </FeatureContent>
            <FeatureImage>
              <img src={howItWorksImage} alt="интерфейс игры для изучения программирования для детей" />
            </FeatureImage>
          </FeatureSection>

          <FeatureSection>
            <FeatureContent>
              <FeatureTitle>Идеально для первых шагов в программировании</FeatureTitle>
              <FeatureDescription>
              Каждый уровень начинается с необходимой теории — мы объясняем новые концепции простым языком и на наглядных примерах.
              </FeatureDescription>
            </FeatureContent>
            <FeatureImage>
              <img src={theoryImage} alt="пример теории темы для программирования для детей" />
            </FeatureImage>
          </FeatureSection>

          <FeatureSection>
            <FeatureContent>
              <FeatureTitle>Python — язык №1</FeatureTitle>
              <FeatureDescription>
              Мы обучаем самому популярному языку программирования в мире. Питон используют в Яндексе и Google, на нём пишут сайты, игры и искусственный интеллект.
              </FeatureDescription>
            </FeatureContent>
            <FeatureImage>
              <img src={pythonImage} alt="Python — язык программирования" />
            </FeatureImage>
          </FeatureSection>

          <CurriculumContainer>
            <FeatureTitle>
              Программа обучения
            </FeatureTitle>
            <CurriculumSection>
              <ModulesList>
                {modules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    isActive={selectedModule === module.id}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <ModuleTitle isActive={selectedModule === module.id}>
                      {module.title}
                    </ModuleTitle>
                    <ModuleSubtitle isActive={selectedModule === module.id}>
                      {module.subtitle}
                    </ModuleSubtitle>
                  </ModuleCard>
                ))}
              </ModulesList>

              <CurriculumContent>
                <CurriculumHeader>
                  <CurriculumTitle>{selectedModuleData?.title}</CurriculumTitle>
                </CurriculumHeader>

                <CurriculumBody>
                  <CurriculumLeftSection>
                    <TopicsGrid>
                      {selectedModuleData?.topics.map((topic, index) => (
                        <TopicTag key={index}>{topic}</TopicTag>
                      ))}
                    </TopicsGrid>
                  </CurriculumLeftSection>

                  <CurriculumRightSection>
                    {selectedModuleData?.isReady ? (
                      <>
                        <LevelsCount>{selectedModuleData?.levelsCountSpan}</LevelsCount>
                        <ActionButton onClick={handleContinuePlaying} size="large">
                          {isAuthenticated ? 'Продолжить обучение' : 'Начать программировать'}
                        </ActionButton>
                      </>
                    ) : (
                      <>
                        <LevelsCount>В разработке</LevelsCount>
                        <ActionButton onClick={() => window.open('https://t.me/codemagics', '_blank')} size="large">
                          Следить в Telegram
                        </ActionButton>
                      </>
                    )}
                  </CurriculumRightSection>
                </CurriculumBody>
              </CurriculumContent>
            </CurriculumSection>
          </CurriculumContainer>
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