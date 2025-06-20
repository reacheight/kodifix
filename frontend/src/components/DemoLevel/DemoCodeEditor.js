import React from 'react';
import styled from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { tags as t } from '@lezer/highlight';
import { autocompletion, snippetCompletion } from '@codemirror/autocomplete';

const getCompletions = (options) => {
  return (context) => {
    const word = context.matchBefore(/(\w|\.|\(|\))+/);

    if (!word || (word.from == word.to && !context.explicit)) {
      return null;
    }

    return {
      from: word.from,
      options,
    };
  };
};

const theme = vscodeDarkInit({
  styles: [{ tag: t.comment, color: 'rgba(255, 255, 255, 0.5)' }],
});

const basicSetup = {
  highlightActiveLineGutter: false,
  lineNumbers: false,
  highlightActiveLine: false,
};

const EditorWrapper = styled.div`
  position: relative;
  border-radius: 8px 8px 8px 0;
  overflow: hidden;
  background: #1e1e1e;
  height: 300px;
  width: 260px;

  .cm-editor {
    padding: 8px;
  }

  .cm-line {
    font-size: 14px;
  }

  ${({ executingLine }) =>
    executingLine &&
    `
    .cm-line:nth-child(${executingLine}) {
      background: rgba(86, 156, 214, 0.1);
    }
  `}

  ${({ errorLine }) =>
    errorLine &&
    `
    .cm-line:nth-child(${errorLine}) {
      background: rgba(255, 0, 0, 0.1);
      &::after {
        content: '⚠️';
        position: absolute;
        right: 8px;
      }
    }
  `}
`;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: rgba(255, 0, 0, 0.1);
  color: #ff6b6b;
  font-size: 12px;
  border-top: 1px solid rgba(255, 0, 0, 0.2);
`;

export const DemoCodeEditor = ({
  isRunning,
  executingLine,
  code,
  codeErrors,
  onCodeChange,
  onErrorsClear,
}) => {
  const options = [
    snippetCompletion('hero.move_right()', {
      label: 'hero.move_right()',
      detail: 'шаг вправо'
    }),
    snippetCompletion('hero.move_left()', {
      label: 'hero.move_left()',
      detail: 'шаг влево'
    }),
    snippetCompletion('hero.move_up()', {
      label: 'hero.move_up()',
      detail: 'шаг вверх'
    }),
    snippetCompletion('hero.move_down()', {
      label: 'hero.move_down()',
      detail: 'шаг вниз'
    }),
  ];

  const extensions = [
    python(),
    autocompletion({
      override: [getCompletions(options)],
    }),
    indentUnit.of("    "),
  ];

  return (
    <EditorWrapper
      errorLine={codeErrors?.[0]?.line}
      executingLine={executingLine}
    >
      <CodeMirror
        value={code}
        height="300px"
        width="260px"
        theme={theme}
        readOnly={isRunning}
        extensions={extensions}
        basicSetup={basicSetup}
        onChange={onCodeChange}
      />
      {codeErrors && (
        <ErrorMessage onClick={onErrorsClear}>
          {codeErrors[0].message}
        </ErrorMessage>
      )}
    </EditorWrapper>
  );
}; 