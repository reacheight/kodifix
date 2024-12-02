import styled, { keyframes } from 'styled-components';

const appearance = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  width: 470px;
  padding: 16px;
  background-color: #2a2623;
  border-radius: 12px;
  border: 2px #4b4745 solid;
  transition: 300ms ease-in-out;
  opacity: 0;
  position: absolute;
  left: -485px;
  bottom: 160px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: 300ms ${appearance} ease-in-out forwards;
`;

export const Top = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  gap: 8px;
`;

export const Title = styled.div`
  span {
    color: #7ac8ea;
  }
`;

export const Tag = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000;
  background-color: #fff;
  border-radius: 4px;
  padding: 4px 12px;
`;

export const Description = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #fff;
`;

export const Example = styled.div`
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ExampleTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

export const CodeMirrorWrapper = styled.div`
  .cm-editor {
    background: rgb(61, 55, 50);
    border-radius: 4px;
    padding-bottom: 0;
  }

  .cm-content {
    padding: 8px 0;
  }

  .cm-line {
    padding: 0 16px;
  }

  .cm-gutters {
    display: none;
  }

  .cm-activeLine {
    background: none;
  }

  .cm-scroller {
    &::-webkit-scrollbar {
      width: 14px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 20px;
      border: 4px solid transparent;
      background-clip: content-box;
    }
  }
`;