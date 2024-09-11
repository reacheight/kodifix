import React from 'react';
import { createPortal } from 'react-dom';

import button1 from '../../assets/button-1.svg';
import button2 from '../../assets/button-2.svg';
import button3 from '../../assets/button-3.svg';

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

export const LevelScore = ({ isLastLevel, goals, onContinue, onClose }) => {
  const someRequiredGoalNotCompleted = goals.filter(g => g.required).some(g => !g.completed);
  const everyOptionalGoalNotCompleted = goals.filter(g => !g.required).every(g => !g.completed);
  const someOptionalGoalNotCompleted = everyOptionalGoalNotCompleted || goals.filter(g => !g.required).some(g => !g.completed);
  return createPortal(
    <Wrapper>
      <Modal>
        <Stars>
          <Star1 isEmpty={someRequiredGoalNotCompleted} />
          <Star2 isEmpty={everyOptionalGoalNotCompleted} />
          <Star3 isEmpty={someOptionalGoalNotCompleted} />
        </Stars>
        <Block>
          <Title>Уровень пройден!</Title>
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
          ) : (<>
            {someOptionalGoalNotCompleted && <Achievement>Но чтобы заработать больше звезд, нужно выполнить все задания</Achievement>}
          </>
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
            <Button onClick={onClose}>
              <img src={button3} alt="снова" />
            </Button>
          </ButtonsWrapper>
        )}
      </Modal>
    </Wrapper>,
    document.body,
  );
};
