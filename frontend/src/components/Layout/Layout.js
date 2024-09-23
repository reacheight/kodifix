import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../Header/Header';
import Cookies from 'js-cookie';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-inline: 20%;
`

export const Layout = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get('yaToken'));

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
        Cookies.set('yaToken', data.access_token, { path: '/', domain: '.kodifix.ru', secure: true, sameSite: 'Lax', expires_in: data.expires_in })
        setAuthToken(data.access_token);
      })
      .catch(error => console.log('Обработка ошибки', error));
    }
  }, []);

  const logout = () => {
    Cookies.remove('yaToken', { path: '/', domain: '.kodifix.ru', secure: true, sameSite: 'Lax' });
    setAuthToken(null);
  };

  return (
    <LayoutWrapper>
      <Header authToken={authToken} onLogout={logout} />
      {children}
    </LayoutWrapper>
  )
}