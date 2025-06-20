import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../Header/Header';
import Cookies from 'js-cookie';
import { axios } from '../../api/axios';
import { LoginModal } from '../LoginModal/LoginModal';

const LayoutWrapper = styled.div`
`

export const Layout = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const params = {
      client_id: '064dd0d0ea2d41bd8867928cd9704763',
      response_type: 'token',
      redirect_uri: 'https://codemagics.ru/ya_callback'
    };

    if (!document.cookie.includes('yaToken') && window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        params,
        'https://codemagics.ru',
        { view: "default" }
      )
      .then(({handler}) => handler())
      .then(data => {
        Cookies.set('yaToken', data.access_token, { path: '/', domain: '.codemagics.ru', secure: true, sameSite: 'Lax', expires: Math.floor(Number(data.expires_in) / 86400) })
        axios.post(`/user`, {}, { withCredentials: true })
          .then(() => location.reload());
      })
      .catch(error => console.log('Обработка ошибки', error));
    }
  }, []);

  return (
    <LayoutWrapper>
      <Header onLoginClick={() => setShowLoginModal(true)} />
      {children}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)}/>}
    </LayoutWrapper>
  )
}