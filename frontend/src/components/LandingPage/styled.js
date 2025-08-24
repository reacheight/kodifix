import styled from 'styled-components';

export const LandingContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
`;

export const HeroContainer = styled.div`
  min-width: 100%;
  background: linear-gradient(to right,rgba(25, 118, 210, 0.5),rgba(33, 149, 243, 0.6));
  padding-block: 200px;
  padding-inline: 20px;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding-top: 150px;
    padding-bottom: 10px;
  }
`;

export const HeroSection = styled.div`
  display: flex;
  align-items: center;
  width: 1300px;
  margin: 0 auto;
  justify-content: space-between;
  padding-top: 80px;
  padding-bottom: 100px;

  @media (max-width: 1340px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 0px;
    padding-bottom: 0px;
    gap: 0;
  }
`;

export const LeftColumn = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const RightColumn = styled.div`
  flex: 0.7;
  min-width: 0;
  height: 350px;
  padding-top: 50px;


  @media (max-width: 768px) {
    transform: scale(0.75);
    margin-right: 10%;
    padding-top: 0px;
  }
`;

export const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  color: #fff;
  margin-bottom: 40px;
  text-shadow: 0 2px 8px rgba(30, 58, 138, 0.3);
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 24px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.p`
  font-size: 20px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  margin-bottom: 40px;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 16px;
  }
`;

export const FeaturesContainer = styled.div`
  min-width: 100%;
  background: #eaf4ff;
`;

export const FeatureSection = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 80px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 1340px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column !important;
    gap: 30px;
    padding: 60px 20px;
    text-align: center;
  }
`;

export const FeatureContent = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const FeatureImage = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 500px;
    height: auto;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    img {
      border-radius: 10px;
    }
  }
`;

export const FeatureTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: rgb(106, 193, 255);
  margin-bottom: 24px;
  line-height: 1.2;
  text-shadow: 0 6px 30px rgb(255, 255, 255), 6px 0px 30px rgb(255, 255, 255), -6px 0 30px rgb(255, 255, 255), 0 -6px 30px rgb(255, 255, 255);

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

export const FeatureDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  line-height: 30px;
  color: #3c4d65;
  margin: 0;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 16px;
    line-height: 22px;
  }
`;

export const CurriculumContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 1340px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;



export const CurriculumSection = styled.div`
  display: flex;
  gap: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

export const ModulesList = styled.div`
  flex: 0 0 250px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    flex: none;
  }
`;

export const ModuleCard = styled.div`
  background: ${props => props.isActive ? 'linear-gradient(135deg, #4F8EF7 0%, #6AC1FF 100%)' : '#f8f9fa'};
  border-radius: 16px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.isActive ? 'transparent' : '#e9ecef'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.isActive ? 'transparent' : '#6AC1FF'};
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ModuleTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.isActive ? '#fff' : '#1a202c'};
  margin: 0 0 8px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const ModuleSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: ${props => props.isActive ? 'rgba(255, 255, 255, 0.8)' : '#64748b'};
  margin: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CurriculumContent = styled.div`
  flex: 1;
  background: linear-gradient(to right,rgba(25, 118, 210, 0.5),rgba(33, 149, 243, 0.6));
  border-radius: 20px;
  padding: 30px;
  border: 1px solid #e2e8f0;
  height: fit-content;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const CurriculumHeader = styled.div`
  margin-bottom: 32px;
`;

export const CurriculumBody = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const CurriculumLeftSection = styled.div`
  flex: 1;
`;

export const CurriculumRightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
  }
`;

export const CurriculumTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(30, 58, 138, 0.3);
  color: #fff;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const LevelsCount = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const TopicsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 32px;
  }
`;

export const TopicTag = styled.span`
  background: #e2e8f0;
  color: #475569;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

// Lightweight DemoLevel Skeleton Components (independent of DemoLevel imports)
export const DemoLevelSkeletonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  background: linear-gradient(#99C979, #5F9F6E);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  opacity: 0.7;
`;

export const SkeletonMapContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8%;

  @media (max-width: 768px) {
    margin-left: 5%;
  }
`;

export const SkeletonGameField = styled.div`
  display: grid;
  width: 200px;
  height: 200px;
  grid-template-columns: repeat(4, 50px);
  grid-template-rows: repeat(4, 50px);
  gap: 0;
`;

export const SkeletonCell = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  animation: pulse 1.5s ease-in-out infinite alternate;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 0.3;
    }
  }
`;

export const SkeletonEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  max-width: 250px;
  min-width: 250px;
  padding: 20px;
  justify-content: center;
`;

/* Контейнер для облаков */
export const CloudsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

/* Отдельное облако */
export const CloudImage = styled.img`
  position: absolute;
  width: ${props => props.size || 80}px;
  height: auto;
  top: ${props => props.top || '20%'};
  left: ${props => props.left || '10%'};
  opacity: ${props => props.opacity || 0.7};
  animation: ${props => `float-${props.direction || 'horizontal'} ${props.duration || 15}s ease-in-out infinite`};
  animation-delay: ${props => props.delay || '0s'};
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.05)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.13));

  @keyframes float-horizontal {
    0%, 100% {
      transform: translateX(0px) translateY(0px);
    }
    50% {
      transform: translateX(30px) translateY(-10px);
    }
  }

  @keyframes float-vertical {
    0%, 100% {
      transform: translateX(0px) translateY(0px);
    }
    50% {
      transform: translateX(10px) translateY(-20px);
    }
  }

  @keyframes float-diagonal {
    0%, 100% {
      transform: translateX(0px) translateY(0px);
    }
    50% {
      transform: translateX(25px) translateY(-15px);
    }
  }

  @media (max-width: 768px) {
    width: ${props => (props.size || 80) * 0.6}px;
  }
`;



