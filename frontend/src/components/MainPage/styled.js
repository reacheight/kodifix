import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px;
  min-height: 100vh;
  background-color: #F5F5F5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 64px;
`;

export const ModuleCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  width: 100%;
  max-width: 700px;
`;

export const ModuleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModuleTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 28px;
  font-weight: 500;
  color: #000;
  margin: 0;
`;

export const LevelCount = styled.span`
  font-family: 'Inter', sans-serif;
  color: #666;
  font-size: 14px;
  margin-top: 4px;
`;

export const Description = styled.p`
  font-family: 'Inter', sans-serif;
  color: #444;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span`
  font-family: 'Inter', sans-serif;
  background: #F5F5F5;
  color: #666;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 14px;
`; 