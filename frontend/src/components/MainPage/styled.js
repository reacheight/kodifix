import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px;
  min-height: 100vh;
  background-color: #F5F7FA;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 120px;
`;

export const ModuleCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 600px;
  width: 100%;
  font-family: 'Inter', sans-serif;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(25, 118, 210, 0.12);
  }

  img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
  }
`;

export const ModuleInfo = styled.div`
  padding: 24px 32px;
  background: white;
`;

export const ModuleTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1A1A1A;
`;

export const LevelCount = styled.div`
  font-family: 'Inter', sans-serif;
  color: #5C7185;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
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
  background: rgba(25, 118, 210, 0.08);
  color: #1976D2;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  user-select: none;
`; 