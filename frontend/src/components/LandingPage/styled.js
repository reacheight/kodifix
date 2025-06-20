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
`;

export const FeatureContent = styled.div`
  flex: 1;
`;

export const FeatureImage = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
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
`;

export const FeatureDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  line-height: 30px;
  color: #3c4d65;
  margin: 0;
  max-width: 500px;
`;