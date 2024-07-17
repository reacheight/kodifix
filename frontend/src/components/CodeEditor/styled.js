import styled, { css } from 'styled-components';

export const CodeMirrorWrapper = styled.div`
  margin: 20px 20px 0 0;
  font-size: 18px;

  .cm-editor {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background: #2a2623;
    padding-bottom: 20px;
    transition: 0.5s ease-in-out;
  }

  .cm-gutters {
    border-top-left-radius: 16px;
    background: #2f2b29;
    overflow: hidden;
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

  ${({ highlightFocusedLine }) => {
    return !highlightFocusedLine
      ? css`
          .cm-activeLine,
          .cm-activeLineGutter {
            background: none;
          }
        `
      : null;
  }}

  ${({ executingLine }) => {
    return executingLine
      ? css`
          .cm-line:nth-child(${executingLine}) {
            background-color: rgba(255, 255, 255, 0.15);
          }
        `
      : null;
  }}

  ${({ errorLine }) => {
    return errorLine
      ? css`
          .cm-line:nth-child(${errorLine}) {
            background-color: #9a3c31;
          }
        `
      : null;
  }}
`;
