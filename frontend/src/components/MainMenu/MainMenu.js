import React from 'react';
import { GamePreview, Section, SectionTitle, SectionGames, Wrapper, PreviewImage, PreviewTitle, PreviewTags } from './styled';
import firstStepsPreviewImage from '../../assets/first-steps-preview.png';
import bridgesPreviewImage from '../../assets/bridges-preview.png';
import variablesPreviewImage from '../../assets/variables-preview.png';
import whatIfPreviewImage from '../../assets/what-if-preview.png';

export const MainMenu = () => {
  return (
    <Wrapper>
      <Section>
        <SectionTitle>Начало</SectionTitle>
        <SectionGames>
          <GamePreview href={'/first-steps/level/1'}>
            <PreviewImage source={firstStepsPreviewImage} />
            <PreviewTitle>Первые шаги</PreviewTitle>
            <PreviewTags>методы, параметры</PreviewTags>
          </GamePreview>
          <GamePreview href={'/fights-on-bridges/level/1'}>
            <PreviewImage source={bridgesPreviewImage} />
            <PreviewTitle>Драки на мостах</PreviewTitle>
            <PreviewTags>параметры, строки</PreviewTags>
          </GamePreview>
          <GamePreview href={'/variables/level/1'}>
            <PreviewImage source={variablesPreviewImage} />
            <PreviewTitle>Перемена?</PreviewTitle>
            <PreviewTags>параметры, переменные</PreviewTags>
          </GamePreview>
        </SectionGames>
      </Section>
      <Section>
        <SectionTitle>Основы</SectionTitle>
        <SectionGames>
        <GamePreview href={'/what-if/level/1'}>
            <PreviewImage source={whatIfPreviewImage} />
            <PreviewTitle>А что, если...</PreviewTitle>
            <PreviewTags>if-выражения</PreviewTags>
          </GamePreview>
        </SectionGames>
      </Section>
    </Wrapper>
  )
}