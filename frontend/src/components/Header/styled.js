import styled from 'styled-components';

export const HeaderContent = styled.header`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-between;

  max-width: 1600px;
  width: 100%;

  margin: 0 auto;
  margin-top: 20px;
  padding: 12px 25px;
  
  background: ${({ isTransparent }) => isTransparent ? 'transparent' : 'linear-gradient(to right,rgb(133, 182, 231),rgb(115, 186, 245))'};

  border-radius: 16px;
  box-shadow: ${({ isTransparent }) => isTransparent ? 'none' : '0 4px 24px rgba(0, 0, 0, 0.12)'};

  left: 50%;
  transform: translateX(-50%);

  z-index: 10;
`

export const Logo = styled.img`
  height: 30px;
  filter: ${({ isTransparent }) => isTransparent ? 'none' : 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))'};
  position: relative;
  left: 10px;
  top: 5px;

  @media (max-width: 768px) {
    height: 18px;
  }
`
