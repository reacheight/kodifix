import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { axios } from '../../api/axios';
import { Modal, Wrapper, Top, CloseButton, Title, YaLoginButton } from './styled';
import close2Icon from '../../assets/close-2.svg';

export const LoginModal = ({ onClose, onSuccess, title = 'Вход' }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200); // Match animation duration
  };

  useEffect(() => {
    const params = {
      client_id: '064dd0d0ea2d41bd8867928cd9704763',
      response_type: 'token',
      redirect_uri: 'https://codemagics.ru/ya_callback'
    };

    if (window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        params,
        'https://codemagics.ru',
        {
          view: 'button',
          parentId: "yaButtonContainerId",
          buttonSize: 'l',
          buttonView: 'main',
          buttonTheme: 'light',
          buttonBorderRadius: '24',
          buttonIcon: 'ya',
        }
      )
      .then(({handler}) => handler())
      .then(data => {
        Cookies.set('yaToken', data.access_token, { path: '/', domain: '.codemagics.ru', secure: true, sameSite: 'Lax', expires: Math.floor(Number(data.expires_in) / 86400) })
        axios.post(`/user`, {}, { withCredentials: true })
          .then(() => {
            if (onSuccess) {
              onSuccess();
            } else {
              location.reload();
            }
          });
      })
      .catch(error => console.log('Обработка ошибки', error))
    }
  }, [onSuccess]);

  return (
    <Wrapper isClosing={isClosing}>
      <Modal>
        <Top>
          <Title>{title}</Title>
          <CloseButton onClick={handleClose}>
            ×
          </CloseButton>
        </Top>
        <YaLoginButton id="yaButtonContainerId" />
      </Modal>
    </Wrapper>
  )
}