import React, { useState } from 'react';
import {
  Collapse,
  CollapseContent,
  CollapseIcon,
  CollapseTitle,
  Command,
} from './styled';
import arrowIcon from '../../assets/arrow.svg';

export const AvailableCommands = ({ commands }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapse isOpen={isOpen}>
      <CollapseTitle onClick={() => setIsOpen(!isOpen)}>
        Доступные команды
        <CollapseIcon isOpen={isOpen}>
          <img src={arrowIcon} alt="arrow" />
        </CollapseIcon>
      </CollapseTitle>
      <CollapseContent>
        {commands.map((command) => (
          <Command key={command.code}>
            {command.code.slice(0, -2)}
            <span>()</span>
          </Command>
        ))}
      </CollapseContent>
    </Collapse>
  );
};
