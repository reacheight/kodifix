import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 102;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  opacity: 0.7;
  top: 10px;
  right: 540px;

  &:hover {
    opacity: 0.9;
  }
`;

export const Collapse = styled.div`
  color: #fff;
  font-family: 'Nunito', sans-serif;
  width: 400px;
  padding: 14px 16px;
  background: #2a2623;
  border: 2px #4b4745 solid;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CollapsTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

export const Title = styled.div`
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 18px;
  color: #fff;
`;

export const CollapseIcon = styled.div`
  display: flex;
  align-items: center;
  transition: 300ms ease-in-out;
  transform: rotate(180deg);

  ${({ isOpen }) =>
    !isOpen &&
    css`
      transform: rotate(0deg);
    `}
`;

export const CollapseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  overflow-y: auto;
  transition: 0.3s ease-in-out;

  ${({ isOpen }) =>
    css`
      padding-top: ${isOpen ? 10 : 0}px;
      max-height: ${isOpen ? 200 : 0}px;
    `}
`;

export const GoalsBlock = styled.div`
  padding: 0 8px;
  padding-bottom: 6px;
  border-radius: 8px;
  background: #474542;
  box-shadow:
    0px 2px 0px 0px #504d4980,
    0px 2px 3px 0px #595959 inset;
`

export const GoalsBlockTitle = styled.div`
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
  font-size: 16px;
  line-height: 35px;
  color: #fff;
`

export const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 8px;
`

export const Goal = styled.div`
  display: flex;
  align-items: center;

  ${({ notCompleted }) =>
    notCompleted &&
    css`
      color:rgb(255, 100, 100);
      font-weight: 400;
    `}

  img {
    width: 20px;
    margin-left: 5px;
  }
`