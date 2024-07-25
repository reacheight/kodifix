import React from 'react';
import { createPortal } from 'react-dom';

import button1 from '../../assets/button-1.svg';
import button2 from '../../assets/button-2.svg';

import {
  Wrapper,
  Modal,
  Block,
  Title,
  Achievement,
  Stars,
  Star1,
  Star2,
  Star3,
  Button,
  ButtonsWrapper,
  GameOver,
} from './styled';

export const LevelScore = ({ isLastLevel, collectedGemsCount, onContinue }) => {
  return createPortal(
    <Wrapper>
      <Modal>
        <Stars>
          <Star1 />
          <Star2 />
          <Star3 />
        </Stars>
        <Block>
          <Title>Уровень пройден</Title>
          {isLastLevel ? (
            <GameOver>
              Спасибо за прохождение демоверсии!
              <br />
              <br />
              Новые уровни находятся в разработке.
              <br />
              <br />
              За новостями можете следить в нашем{' '}
              <a
                href="https://t.me/kodifix_ru"
                target="_blank"
                rel="noreferrer"
              >
                канале в Telegram
              </a>
            </GameOver>
          ) : (
            <Achievement>Собрано алмазов: {collectedGemsCount}</Achievement>
          )}
        </Block>

        {!isLastLevel && (
          <ButtonsWrapper>
            <Button>
              <img src={button1} alt="меню" />
            </Button>
            <Button onClick={onContinue}>
              <img src={button2} alt="дальше" />
            </Button>
          </ButtonsWrapper>
        )}
      </Modal>
    </Wrapper>,
    document.body,
  );
};
