import React from 'react';
import { Layout } from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  ModuleCard,
  ModuleTitle,
  ModuleInfo,
  LevelCount,
  Description,
  Tags,
  Tag,
} from './styled';
import module1Preview from '../../assets/module1-preview.png';

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container>
        <ModuleCard onClick={() => navigate('/forest')}>
          <img src={module1Preview} alt="Module 1 Preview" />
          <ModuleInfo>
            <ModuleTitle>Модуль 1</ModuleTitle>
            <LevelCount>18 уровней</LevelCount>
            <Tags>
              <Tag>знакомство с платформой</Tag>
              <Tag>основы синтаксиса</Tag>
              <Tag>методы</Tag>
              <Tag>параметры</Tag>
              <Tag>строки</Tag>
              <Tag>комментарии</Tag>
              <Tag>переменные</Tag>
              <Tag>if-выражения</Tag>
            </Tags>
          </ModuleInfo>
        </ModuleCard>
      </Container>
    </Layout>
  );
}; 