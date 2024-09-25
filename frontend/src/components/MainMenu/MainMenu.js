import React from 'react';
import { Game, GameDescription, DescriptionHeader, Title, Wizard, Gem1, Gem2, Gem3, LevelCount, Description, Tag, Tags, Map, Level } from './styled';
import { Layout } from '../Layout/Layout';

export const MainMenu = () => {
  return (
    <Layout>
      <Game>
        <GameDescription>
          <DescriptionHeader>
            <Title>Шервудский лес</Title>
            <LevelCount>0 / 15</LevelCount>
            <Wizard />
            <Gem1 />
            <Gem2 />
            <Gem3 />
          </DescriptionHeader>
          <Description>
            Исследуйте древние руины и запретные библиотеки, обучаясь искусству программирования, чтобы создавать мощные заклинания и решать головоломки.
          </Description>
          <Tags>
            <Tag>основы синтаксиса</Tag>
            <Tag>методы</Tag>
            <Tag>параметры</Tag>
            <Tag>строки</Tag>
            <Tag>переменные</Tag>
            <Tag>if-else-выражения</Tag>
          </Tags>
        </GameDescription>
        <Map>
          <Level top={700} left={140} href={'/forest/level/1'} />
          <Level top={545} left={145} href={'/forest/level/2'} />
          <Level top={380} left={280} href={'/forest/level/3'} />
          <Level top={260} left={200} href={'/forest/level/4'} />
          <Level top={140} left={130} href={'/forest/level/5'} />
          <Level top={-10} left={220} href={'/forest/level/6'} />
          <Level top={-135} left={290} href={'/forest/level/7'} />
          <Level top={-260} left={360} href={'/forest/level/8'} />
          <Level top={-370} left={420} href={'/forest/level/9'} />
          <Level top={-420} left={480} href={'/forest/level/9'} />
          <Level top={-450} left={590} href={'/forest/level/10'} />
          <Level top={-500} left={650} href={'/forest/level/11'} />
        </Map>
      </Game>
    </Layout>
  )
}