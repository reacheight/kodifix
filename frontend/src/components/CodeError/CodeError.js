import React from 'react';

import { Wrapper, Title, Divider, Message, Tag } from './styled';
import close1Icon from '../../assets/close-1.svg';

function splitStringOutsideQuotes(inputString) {
  const parts = [];
  const insideQuotes = inputString.match(/`([^`]*)`/g); // Находим все подстроки внутри одинарных кавычек
  const outsideParts = inputString.split(/`[^`]+`/); // Разбиваем строку на части вне одинарных кавычек

  // Добавляем части вне одинарных кавычек в результирующий массив
  for (let i = 0; i < outsideParts.length; i++) {
    if (outsideParts[i].trim() !== '') {
      parts.push(outsideParts[i].trim());
    }

    // Если есть соответствующая подстрока внутри одинарных кавычек, добавляем её тоже в результирующий массив
    if (insideQuotes && insideQuotes[i]) {
      parts.push(insideQuotes[i]);
    }
  }

  return parts;
}

export const CodeError = ({ codeErrors, onErrorsClear }) => {
  const error = codeErrors[0];

  return (
    <Wrapper offset={(error.line - 1) * 25.19}>
      <img src={close1Icon} alt="close" onClick={() => onErrorsClear()} />
      <Title>Исправь свой код</Title>
      <Divider />
      <Message>
        {splitStringOutsideQuotes(error.message).map((text, i) => {
          if (text.includes("`")) {
            return <Tag key={i}>{text.replace(/`/g, '')}</Tag>;
          } else {
            return <span key={i}>{text}</span>
          }
        })}
      </Message>
    </Wrapper>
  );
};
