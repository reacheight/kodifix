import React, { useEffect } from 'react';
import { GamePreview, Section, SectionTitle, SectionGames, Wrapper, PreviewImage, PreviewTitle, PreviewTags, ComingSoonTitle } from './styled';
import firstStepsPreviewImage from '../../assets/first-steps-preview.png';
import bridgesPreviewImage from '../../assets/bridges-preview.png';
import variablesPreviewImage from '../../assets/variables-preview.png';
import whatIfPreviewImage from '../../assets/what-if-preview.png';
import elseImagePreview from '../../assets/else-preview.png';
import whileImagePreview from '../../assets/while-preview.png';
import { Header } from '../Header/Header';
import { Layout } from '../Layout/Layout';

export const MainMenu = () => {
  useEffect(() => {
    if (!document.cookie.includes('yaToken') && window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        {
          client_id: '064dd0d0ea2d41bd8867928cd9704763',
          response_type: 'token',
          redirect_uri: 'https://demo.kodifix.ru/ya_callback'
        },
        'https://demo.kodifix.ru',
        { view: "default" }
      )
      .then(({handler}) => handler())
      .then(data => {
        document.cookie = `yaToken=${data.access_token}; path=/; max-age=${data.expires_in}; secure; domain=kodifix.ru; samesite=lax`
      })
      .catch(error => console.log('Обработка ошибки', error));
    }
  }, []);
  
  return (
    <Layout>
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
            <GamePreview isUnavailable={true}>
              <PreviewImage source={elseImagePreview} />
              <PreviewTitle>План Б</PreviewTitle>
              <PreviewTags>if-else-выражения</PreviewTags>
              <ComingSoonTitle>Скоро появится</ComingSoonTitle>
            </GamePreview>
            <GamePreview isUnavailable={true}>
              <PreviewImage source={whileImagePreview} />
              <PreviewTitle>До последнего врага</PreviewTitle>
              <PreviewTags>циклы while</PreviewTags>
              <ComingSoonTitle>Скоро появится</ComingSoonTitle>
            </GamePreview>
          </SectionGames>
        </Section>
      </Wrapper>
    </Layout>
  )
}