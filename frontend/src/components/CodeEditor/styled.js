import styled, { css } from 'styled-components';

export const CodeMirrorWrapper = styled.div`
  margin: 20px 20px 0 0;
  overflow: hidden;
  font-size: 18px;

  .cm-editor {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background: #2a2623;
  }

  .cm-gutters {
    border-top-left-radius: 16px;
    background: #2f2b29;
    overflow: hidden;
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
`;
