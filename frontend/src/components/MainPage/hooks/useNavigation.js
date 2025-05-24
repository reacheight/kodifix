import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

export const useNavigation = (isAuthenticated) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState('');

  const handleLevelClick = useCallback((level) => {
    const levelPath = ROUTES.getLevelPath(level);
    
    if (isAuthenticated) {
      navigate(levelPath);
    } else {
      setPendingNavigation(levelPath);
      setShowLoginModal(true);
    }
  }, [isAuthenticated, navigate]);

  const handleModalClose = useCallback(() => {
    setShowLoginModal(false);
    setPendingNavigation('');
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setShowLoginModal(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation('');
    }
  }, [navigate, pendingNavigation]);

  return {
    showLoginModal,
    handleLevelClick,
    handleModalClose,
    handleLoginSuccess
  };
}; 