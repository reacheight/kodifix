import React from 'react';
import {
  Wrapper,
  Top,
  Title,
  Tag,
  Description,
  Example,
  ExampleTitle,
  CodeMirrorWrapper,
} from './styled';

import { extract } from '../../utils/extract'
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { tags as t } from '@lezer/highlight';
import { python } from '@codemirror/lang-python';

const basicSetup = {
  highlightActiveLineGutter: false,
};

const extensions = [python()];

const theme = vscodeDarkInit({
  styles: [{ tag: t.comment, color: 'rgba(255, 255, 255, 0.5)' }],
});

export const CommandDescription = ({ command }) => {
  const title = command.code ? extract(command.code) : null;

  return (
    <Wrapper>
      {title && (
        <Top>
          <Title>
            {title.name}
            <span>{title.brackets}</span>
          </Title>
          <span>-</span>
          <Tag>метод</Tag>
        </Top>
      )}
      {command?.description && <Description>{command.description}</Description>}
      {command?.example && (
        <Example>
          <ExampleTitle>Пример использования:</ExampleTitle>
          <CodeMirrorWrapper>
            <CodeMirror
              extensions={extensions}
              basicSetup={basicSetup}
              theme={theme}
              value={command.example}
              editable={false}
            />
          </CodeMirrorWrapper>
        </Example>
      )}
    </Wrapper>
  );
};
