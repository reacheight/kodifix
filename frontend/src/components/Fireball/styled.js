import styled, { css, keyframes } from 'styled-components';
import { GAME_CONFIG } from '../../constants/gameConstants';

// Мерцание внутреннего ядра
const coreFlicker = keyframes`
  0%, 100% { 
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  25% { 
    opacity: 0.9;
    transform: scale(1.15) rotate(90deg);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.3) rotate(180deg);
  }
  75% { 
    opacity: 0.9;
    transform: scale(1.1) rotate(270deg);
  }
`;

// Пульсация внешнего свечения
const glowPulse = keyframes`
  0%, 100% { 
    box-shadow: 
      0 0 20px #ff4500,
      0 0 40px #ff6500,
      0 0 60px #ff8500,
      inset 0 0 15px #ffeb3b;
  }
  50% { 
    box-shadow: 
      0 0 30px #ff4500,
      0 0 60px #ff6500,
      0 0 90px #ff8500,
      inset 0 0 20px #ffeb3b;
  }
`;

// Анимация полета с CSS переменными и вращением
const fireballFlight = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  90% {
    transform: translate(var(--deltaY), var(--deltaX)) rotate(720deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--deltaY), var(--deltaX)) rotate(720deg);
    opacity: 0;
  }
`;

export const FireballProjectile = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  z-index: 1000;
  pointer-events: none;

  /* Многослойный огненный эффект */
  background: 
    radial-gradient(circle at 30% 30%, 
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(255, 235, 59, 0.8) 15%, 
      rgba(255, 193, 7, 0.7) 30%, 
      rgba(255, 152, 0, 0.6) 50%, 
      rgba(255, 87, 34, 0.5) 70%, 
      rgba(183, 28, 28, 0.3) 100%
    ),
    radial-gradient(circle at 60% 70%, 
      transparent 0%, 
      rgba(255, 152, 0, 0.4) 30%, 
      rgba(244, 67, 54, 0.6) 60%, 
      rgba(183, 28, 28, 0.8) 100%
    );

  /* Позиционирование на стартовой клетке */
  ${({ startX, startY }) => css`
    grid-row-start: ${startX + 1};
    grid-row-end: ${startX + 2};
    grid-column-start: ${startY + 1};
    grid-column-end: ${startY + 2};
  `}

  /* Базовое свечение */
  box-shadow: 
    0 0 20px rgba(255, 69, 0, 0.8),
    0 0 40px rgba(255, 101, 0, 0.6),
    0 0 60px rgba(255, 133, 0, 0.4);

  /* Анимация полета с движением */
  ${({ startX, startY, endX, endY, range }) => {
    const deltaX = (endX - startX) * GAME_CONFIG.CELL_SIZE;
    const deltaY = (endY - startY) * GAME_CONFIG.CELL_SIZE;
    const duration = GAME_CONFIG.FIREBALL_ONE_CELL_DELAY * (range ?? 0);
    
    return css`
      --deltaX: ${deltaX}px;
      --deltaY: ${deltaY}px;
      animation: 
        ${coreFlicker} 0.15s infinite,
        ${glowPulse} 0.3s infinite,
        ${fireballFlight} ${duration}ms linear forwards;
    `;
  }}

  /* Внешнее ядро - горячий центр */
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background: radial-gradient(circle, 
      rgba(255, 255, 255, 1) 0%, 
      rgba(255, 235, 59, 0.9) 30%, 
      rgba(255, 193, 7, 0.6) 70%, 
      transparent 100%
    );
    animation: ${coreFlicker} 0.1s infinite reverse;
  }

  /* Внутреннее ядро - сверхгорячий центр */
  &::after {
    content: '';
    position: absolute;
    top: 35%;
    left: 35%;
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background: radial-gradient(circle, 
      rgba(255, 255, 255, 1) 0%, 
      rgba(255, 255, 255, 0.8) 50%, 
      transparent 100%
    );
    animation: ${coreFlicker} 0.08s infinite;
  }
`;
