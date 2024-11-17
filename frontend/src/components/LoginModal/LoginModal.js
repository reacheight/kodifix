import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { axios } from '../../api/axios';
import { Modal, Wrapper, Top, CloseButton, Title, YaLoginButton } from './styled';
import close2Icon from '../../assets/close-2.svg';

export const LoginModal = ({ onClose }) => {
  useEffect(() => {
    const params = {
      client_id: '064dd0d0ea2d41bd8867928cd9704763',
      response_type: 'token',
      redirect_uri: 'https://demo.kodifix.ru/ya_callback'
    };

    if (window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        params,
        'https://demo.kodifix.ru',
        {
          view: 'button',
          parentId: "yaButtonContainerId",
          buttonSize: 's',
          buttonView: 'main',
          buttonTheme: 'light',
          buttonBorderRadius: '10',
          buttonIcon: 'ya',
        }
      )
      .then(({handler}) => handler())
      .then(data => {
        Cookies.set('yaToken', data.access_token, { path: '/', domain: '.kodifix.ru', secure: true, sameSite: 'Lax', expires: Math.floor(Number(data.expires_in) / 86400) })
        axios.post(`/user`, {}, { withCredentials: true })
          .then(() => location.reload());
      })
      .catch(error => console.log('Обработка ошибки', error))
    }
  }, []);

  return (
    <Wrapper>
      <Modal>
        <Top>
          <Title>Вход</Title>
          <CloseButton onClick={onClose}>
            <img src={close2Icon} alt="close" />
          </CloseButton>
        </Top>
        <YaLoginButton id="yaButtonContainerId" />
      </Modal>
    </Wrapper>
  )
}