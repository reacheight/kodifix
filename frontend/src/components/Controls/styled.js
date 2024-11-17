import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 529px;
  @media only screen and (max-width: 1300px) {
    right: 480px;
  }
    
  background-color: #2a2623;

  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px 0 0 16px;
  border-right: none;

  box-shadow: 0 30px rgba(37, 34, 32, 1);
  
  z-index: 101;
`;

export const Buttons = styled.div`
  padding: 18px 40px 0px 40px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  position: relative;
  bottom: 40px;
`
