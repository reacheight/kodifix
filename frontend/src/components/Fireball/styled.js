import styled, { css, keyframes } from 'styled-components';
import { GAME_CONFIG } from '../../constants/gameConstants';

const flicker = keyframes`
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

// Анимация полета с CSS переменными
const fireballFlight = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  90% {
    transform: translate(var(--deltaY), var(--deltaX));
    opacity: 1;
  }
  100% {
    transform: translate(var(--deltaY), var(--deltaX));
    opacity: 0;
  }
`;

export const FireballProjectile = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffeb3b, #ff9800, #f44336, #b71c1c);
  box-shadow: 
    0 0 20px #ff4500,
    0 0 40px #ff6500,
    inset 0 0 10px #ffeb3b;
  z-index: 1000;
  pointer-events: none;

  /* Позиционирование на стартовой клетке */
  ${({ startX, startY }) => css`
    grid-row-start: ${startX + 1};
    grid-row-end: ${startX + 2};
    grid-column-start: ${startY + 1};
    grid-column-end: ${startY + 2};
  `}

  /* Анимация полета с движением */
  ${({ startX, startY, endX, endY, range }) => {
    const deltaX = (endX - startX) * GAME_CONFIG.CELL_SIZE;
    const deltaY = (endY - startY) * GAME_CONFIG.CELL_SIZE;
    
    return css`
      --deltaX: ${deltaX}px;
      --deltaY: ${deltaY}px;
      animation: 
        ${flicker} 0.2s infinite alternate,
        ${fireballFlight} ${GAME_CONFIG.FIREBALL_ONE_CELL_DELAY * range}ms ease-out forwards;
    `;
  }}
`;
