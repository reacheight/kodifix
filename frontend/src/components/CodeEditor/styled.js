import styled, { css } from 'styled-components';

export const CodeMirrorWrapper = styled.div`
  font-size: 18px;
  background: #2a2623;
  z-index: 101;

  .cm-editor {
    background: #2a2623;
    transition: 0.5s ease-in-out;
  }

  .cm-focused {
    outline: none;
  }

  .cm-gutters {
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
