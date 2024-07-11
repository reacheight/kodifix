import React from 'react';
import {
  Wrapper,
  Top,
  Title,
  Tag,
  Description,
  Example,
  ExampleTitle,
  ExampleCode,
} from './styled';

function extract(code) {
  const regex = /(\w+)\((.*)\)/;
  const matches = code.match(regex);

  if (matches) {
    const name = matches[1];
    const brackets = matches[2];
    return { name, brackets: `(${brackets})` };
  }

  return null;
}

export const CommandDescription = ({ command }) => {
  const title = command?.code ? extract(command.code) : null;
  const example = command?.example ? extract(command.example) : null;

  return (
    <Wrapper visible={!!command}>
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
      {example && (
        <Example>
          <ExampleTitle>Пример использования:</ExampleTitle>
          <ExampleCode>
            {example.name}
            <span>{example.brackets}</span>
          </ExampleCode>
        </Example>
      )}
    </Wrapper>
  );
};
