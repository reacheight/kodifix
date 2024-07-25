import React from 'react';
import { createPortal } from 'react-dom';

import starIcon from '../../assets/star.svg';

import { Wrapper, Modal, Title, Stars, GameOver } from './styled';
import { Button } from '../Button/Button';

export const LevelScore = ({ isLastLevel, onContinue }) => {
  return createPortal(
    <Wrapper>
      <Modal>
        {isLastLevel ? (
          <>
            <Title>Уровень пройден</Title>
            <Stars>
              <img src={starIcon} alt="star" />
              <img src={starIcon} alt="star" />
              <img src={starIcon} alt="star" />
            </Stars>
            <GameOver>
              Спасибо за прохождение демоверсии.
              <br />
              Новые уровни находятся в разработке.
              <br />
              За новостями можете следить в{' '}
              <a
                href="https://t.me/kodifix_ru"
                target="_blank"
                rel="noreferrer"
              >
                телеграмм канале
              </a>
            </GameOver>
          </>
        ) : (
          <>
            <Title>Уровень пройден</Title>
            <Stars>
              <img src={starIcon} alt="star" />
              <img src={starIcon} alt="star" />
              <img src={starIcon} alt="star" />
            </Stars>
            <Button
              width={200}
              height={60}
              topColor="#1E9029"
              frontColor="#3CB949"
              onClick={onContinue}
            >
              Далее
            </Button>
          </>
        )}
      </Modal>
    </Wrapper>,
    document.body,
  );
};
