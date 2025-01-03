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

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container>
        <ModuleCard onClick={() => navigate('/forest')}>
          <ModuleInfo>
            <ModuleTitle>Модуль 1</ModuleTitle>
            <LevelCount>18 уровней</LevelCount>
            <Description>
              Изучите основы программирования на Python через увлекательную игру.
              Управляйте персонажем с помощью кода, решайте головоломки и собирайте
              алмазы.
            </Description>
            <Tags>
              <Tag>основы синтаксиса</Tag>
              <Tag>методы</Tag>
              <Tag>параметры</Tag>
              <Tag>строки</Tag>
              <Tag>переменные</Tag>
              <Tag>if-выражения</Tag>
            </Tags>
          </ModuleInfo>
        </ModuleCard>
      </Container>
    </Layout>
  );
}; 