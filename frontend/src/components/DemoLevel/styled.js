import styled from 'styled-components';
import { Button } from '../Button/Button';

export const DemoLevelWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  background: linear-gradient(#99C979, #5F9F6E);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

export const DemoMapContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 70px;
`;

export const DemoEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  max-width: 250px;
`;

export const DemoControlsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const DirectionButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: -160px;
  bottom: 16px;
  background-color: #2a2623;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 20px rgba(37, 34, 32, 1);
  padding: 12px;
  transform: scale(0.8);
  transform-origin: right bottom;
`;

export const ControlWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  left: -140px;
  background-color: #2a2623;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px 0 0 16px;
  box-shadow: 0 20px rgba(37, 34, 32, 1);
  z-index: 101;
  transform: scale(0.8);
  transform-origin: right bottom;
  padding: 12px;
  width: 400px;
  height: 60px;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const PlayButtonWrapper = styled.div`
  margin-right: 80px;
`;

export const ControlButtons = styled.div`
  display: flex;
  position: relative;
  bottom: 22px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;