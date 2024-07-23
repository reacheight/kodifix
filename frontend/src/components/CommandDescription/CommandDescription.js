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

import { extract } from '../../utils/extract'

export const CommandDescription = ({ command }) => {
  const title = command.code ? extract(command.code) : null;
  const example = command.example ? extract(command.example) : null;

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
