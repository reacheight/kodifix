import styled from 'styled-components';

export const LandingContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
`;

export const HeroContainer = styled.div`
  min-width: 100%;
  background: linear-gradient(to right,rgba(25, 118, 210, 0.5),rgba(33, 149, 243, 0.6));
  min-height: calc(100vh);
  padding-top: 200px;
  padding-inline: 20px;
`;

export const HeroSection = styled.div`
  display: flex;
  align-items: center;
  width: 1300px;
  margin: 0 auto;
  justify-content: space-between;
`;

export const LeftColumn = styled.div`
  flex: 1;
`;

export const RightColumn = styled.div`
  flex: 0.7;
  min-width: 0;
  height: 350px;
`;

export const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  color: #fff;
  margin-bottom: 32px;
  text-shadow: 0 2px 8px rgba(30, 58, 138, 0.3);
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 42px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

export const Subtitle = styled.p`
  font-size: 20px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  margin-bottom: 32px;
  max-width: 600px;
`;

export const VideoContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  background: rgba(59, 130, 246, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #3b82f6, #1d4ed8, #60a5fa, #2563eb);
    border-radius: 22px;
    z-index: -1;
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Video = styled.video`
  width: 100%;
  max-width: 700px;
  border-radius: 18px;
  display: block;
  position: relative;
  z-index: 1;
`;

export const Button = styled.button`
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 18px 36px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`; 