import { CodeMirrorWrapper } from './styled';
import CodeMirror from '@uiw/react-codemirror';
import { tags as t } from '@lezer/highlight';
import { python } from '@codemirror/lang-python';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { AvailableCommands } from '../AvailableCommands/AvailableCommands';
import React from 'react';

const height = window.innerHeight;

const theme = vscodeDarkInit({
  styles: [{ tag: t.comment, color: 'rgba(255, 255, 255, 0.5)' }],
});

const basicSetup = {
  highlightActiveLineGutter: false,
};

export const CodeEditor = ({
  isRunning,
  isPaused,
  executingLine,
  code,
  instructions,
  onChange,
}) => {
  return (
    <CodeMirrorWrapper
      highlightFocusedLine={!isRunning && !isPaused}
      executingLine={executingLine}
    >
      <CodeMirror
        value={code}
        width="529px"
        readOnly={isRunning}
        height={`${height - 20}px`}
        theme={theme}
        extensions={[python()]}
        basicSetup={basicSetup}
        onChange={onChange}
      />
      {instructions && (
        <AvailableCommands
          commands={[...instructions.newCommands, ...instructions.prevCommands]}
        />
      )}
    </CodeMirrorWrapper>
  );
};
