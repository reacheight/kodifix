import React from 'react';
import styled from 'styled-components';
import { Header } from '../Header/Header';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      {children}
    </LayoutWrapper>
  )
}