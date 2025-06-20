import React, { useMemo } from 'react';
import { Layout } from '../Layout/Layout';
import { LoginModal } from '../LoginModal/LoginModal';
import { Container } from './styled';

import { useGameData } from '../../hooks/useGameData';
import { useMapLayout } from './hooks/useMapLayout';
import { useNavigation } from './hooks/useNavigation';
import { useUser } from '../../contexts/UserContext';

import { ModuleCard } from './components/ModuleCard';
import { GameMap } from './components/GameMap';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

import { MODULE_CONFIG, UI_TEXT } from './constants';

export const MainPage = () => {
  const {
    completedLevelsCount,
    isLoading: isGameDataLoading,
    error,
    isLevelCompleted,
    isLevelAvailable,
    isLevelCurrent,
    refetchData
  } = useGameData();

  const { isLoading: isUserLoading, isAuthenticated } = useUser();

  const {
    mapRef,
    theoreticalDimensions,
    convertCoordinates,
    isLayoutReady
  } = useMapLayout();

  const {
    showLoginModal,
    handleLevelClick,
    handleModalClose,
    handleLoginSuccess
  } = useNavigation(isAuthenticated);

  const progressPercentage = useMemo(() => {
    return Math.round((completedLevelsCount / MODULE_CONFIG.totalLevels) * 100);
  }, [completedLevelsCount]);

  if (isUserLoading || isGameDataLoading) {
    return (
      <Layout>
        <Container>
          <LoadingState message="Загрузка игровых данных..." />
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container>
          <ErrorState 
            message={error}
            onRetry={refetchData}
          />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <ModuleCard
          completedLevelsCount={completedLevelsCount}
          progressPercentage={progressPercentage}
        />

        <GameMap
          mapRef={mapRef}
          theoreticalDimensions={theoreticalDimensions}
          convertCoordinates={convertCoordinates}
          isLayoutReady={isLayoutReady}
          onLevelClick={handleLevelClick}
          isLevelCompleted={isLevelCompleted}
          isLevelCurrent={isLevelCurrent}
          isLevelAvailable={isLevelAvailable}
        />
      </Container>

      {showLoginModal && (
        <LoginModal 
          title={UI_TEXT.loginTitle}
          onClose={handleModalClose}
          onSuccess={handleLoginSuccess}
        />
      )}
    </Layout>
  );
};

MainPage.displayName = 'MainPage'; 