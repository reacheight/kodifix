import React from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../Button/Button';

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
            <Button frontColor="#BD3A0F" shadowColor="#8C2B0B" height="50" width="100">
              <span>Меню</span>
            </Button> 
            <Button frontColor="#40BF4C" shadowColor="#1E9029" onClick={onContinue} height="50" width="100">
              <span>Дальше</span>
            </Button>
            <Button frontColor="#D79D2C" shadowColor="#B47C11" onClick={onClose} height="50" width="100">
              <span>Заново</span>
            </Button>
          </ButtonsWrapper>
        )}
      </Modal>
    </Wrapper>,
    document.body,
  );
};
