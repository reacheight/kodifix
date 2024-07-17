import { CodeMirrorWrapper } from './styled';
import CodeMirror from '@uiw/react-codemirror';
import { autocompletion } from '@codemirror/autocomplete';
import { tags as t } from '@lezer/highlight';
import { python } from '@codemirror/lang-python';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { AvailableCommands } from '../AvailableCommands/AvailableCommands';
import React, { useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { CodeError } from '../CodeError/CodeError';

const theme = vscodeDarkInit({
  styles: [{ tag: t.comment, color: 'rgba(255, 255, 255, 0.5)' }],
});

const basicSetup = {
  highlightActiveLineGutter: false,
};

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

export const CodeEditor = ({
  isRunning,
  isPaused,
  executingLine,
  code,
  codeErrors,
  instructions,
  onCodeChange,
  onErrorsClear,
}) => {
  const [isCommandsOpen, setIsCommandsOpen] = useState(false);
  const { height: innerHeight } = useWindowSize();

  const commands = [...instructions.newCommands, ...instructions.prevCommands];
  const options = commands.map((command) => ({
    type: 'text',
    label: command.code,
    apply: command.code,
    detail: command.description,
  }));
  const extensions = [
    python(),
    autocompletion({
      override: [getCompletions(options)],
    }),
  ];
  const width = '529px';
  const height = `${innerHeight - (isCommandsOpen ? 268 : 65)}px`;

  const addCommand = (command) => onCodeChange(code + '\n' + command);

  const toggleCommands = () => setIsCommandsOpen(!isCommandsOpen);

  return (
    <>
      <CodeMirrorWrapper
        errorLine={codeErrors?.[0].line}
        highlightFocusedLine={!isRunning && !isPaused}
        executingLine={executingLine}
      >
        <CodeMirror
          autoFocus
          value={code}
          width={width}
          height={height}
          theme={theme}
          readOnly={isRunning}
          extensions={extensions}
          basicSetup={basicSetup}
          onChange={onCodeChange}
          selection={{ anchor: code.length }}
        />
        {instructions && (
          <AvailableCommands
            isOpen={isCommandsOpen}
            commands={commands}
            onAdd={addCommand}
            onToggle={toggleCommands}
          />
        )}
        {codeErrors && (
          <CodeError codeErrors={codeErrors} onErrorsClear={onErrorsClear} />
        )}
      </CodeMirrorWrapper>
    </>
  );
};
