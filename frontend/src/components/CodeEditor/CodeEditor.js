import { CodeMirrorWrapper } from './styled';
import CodeMirror from '@uiw/react-codemirror';
import { autocompletion, snippetCompletion } from '@codemirror/autocomplete';
import { tags as t } from '@lezer/highlight';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
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
  const [isCommandsOpen, setIsCommandsOpen] = useState(instructions.newCommands && instructions.newCommands.length > 0);
  const { height: innerHeight, width: windowWidth } = useWindowSize();

  const commands = [...instructions.newCommands, ...instructions.prevCommands];
  const options = commands.map((command) =>
    snippetCompletion(command.autocompleteValue ?? command.code, {
      label: command.code,
      detail: command.description,
    }),
  );
  const extensions = [
    python(),
    autocompletion({
      override: [getCompletions(options)],
    }),
    indentUnit.of("    "),
  ];
  const width = windowWidth <= 1366 ? 480 : 529;

  const [opennedCommandsHeight, closedCommandsHeight] =
    windowWidth <= 1366 ? [200, 0] : [268, 65];
  const height = `${innerHeight - (isCommandsOpen ? opennedCommandsHeight : closedCommandsHeight)}px`;

  const addCommand = (command) => onCodeChange(code + '\n' + command);

  const toggleCommands = () => setIsCommandsOpen(!isCommandsOpen);

  return (
    <>
      <CodeMirrorWrapper
        width={width}
        errorLine={codeErrors?.[0].line}
        highlightFocusedLine={!isRunning && !isPaused}
        executingLine={executingLine}
      >
        <CodeMirror
          autoFocus
          value={code}
          width={`${width}px`}
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
            newCommands={instructions.newCommands}
            prevCommands={instructions.prevCommands}
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
