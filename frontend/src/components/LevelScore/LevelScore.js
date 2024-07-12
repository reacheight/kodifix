import React from 'react';
import { createPortal } from 'react-dom';

import starIcon from '../../assets/star.svg';

import { Wrapper, Modal, Title, Stars } from './styled';
import { Button } from '../Button/Button';

export const LevelScore = ({ onContinue }) => {
  return createPortal(
    <Wrapper>
      <Modal>
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
      </Modal>
    </Wrapper>,
    document.body,
  );
};
