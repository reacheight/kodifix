import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, Wrapper, Top, Title } from './styled';
import { Button } from '../Button/Button';

export const UnavailableLevelModal = ({ dontHaveAccess = false }) => {
  const navigate = useNavigate();

  const openMenu = () => {
    navigate(`/`);
  };

  return (
    <Wrapper>
      <Modal>
        <Top>
          <Title>Уровень недоступен</Title>
        </Top>
        {!dontHaveAccess && (<>
          Сначала пройдите предыдущие уровни
          <Button frontColor="#BD3A0F" shadowColor="#8C2B0B" onClick={openMenu} height="50" width="100">
            <span>Меню</span>
          </Button>
        </>)}
        {dontHaveAccess && (<span>
          Вы прошли все бесплатные уровни. Для получения доступа к остальным уровням пишите в телеграм <a href={"https://t.me/reacheight"}>@reacheight</a>.
        </span>)}
      </Modal>
    </Wrapper>
  );
}