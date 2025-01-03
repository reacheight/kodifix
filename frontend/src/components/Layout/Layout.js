import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header } from '../Header/Header';
import Cookies from 'js-cookie';
import { axios } from '../../api/axios';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  background: #F5F7FA;
`

export const Layout = ({ children }) => {
  useEffect(() => {
    const params = {
      client_id: '064dd0d0ea2d41bd8867928cd9704763',
      response_type: 'token',
      redirect_uri: 'https://demo.kodifix.ru/ya_callback'
    };

    if (!document.cookie.includes('yaToken') && window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        params,
        'https://demo.kodifix.ru',
        { view: "default" }
      )
      .then(({handler}) => handler())
      .then(data => {
        Cookies.set('yaToken', data.access_token, { path: '/', domain: '.kodifix.ru', secure: true, sameSite: 'Lax', expires: Math.floor(Number(data.expires_in) / 86400) })
        axios.post(`/user`, {}, { withCredentials: true })
          .then(() => location.reload());
      })
      .catch(error => console.log('Обработка ошибки', error));
    }
  }, []);

  return (
    <LayoutWrapper>
      <Header />
      {children}
    </LayoutWrapper>
  )
}