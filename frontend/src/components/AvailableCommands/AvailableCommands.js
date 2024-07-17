import React, { useState } from 'react';
import {
  Collapse,
  CollapseContent,
  CollapseIcon,
  CollapseTitle,
  Command,
} from './styled';
import arrowIcon from '../../assets/arrow.svg';
import addIcon from '../../assets/add.svg';
import { CommandDescription } from '../CommandDescription/CommandDescription';

export const AvailableCommands = ({ isOpen, commands, onAdd, onToggle }) => {
  const [command, setCommand] = useState(null);

  return (
    <Collapse isOpen={isOpen}>
      <CollapseTitle onClick={onToggle}>
        Доступные команды
        <CollapseIcon isOpen={isOpen}>
          <img src={arrowIcon} alt="arrow" />
        </CollapseIcon>
      </CollapseTitle>
      <CollapseContent>
        {commands.map((command) => (
          <Command
            key={command.code}
            onMouseOver={() => setCommand(command)}
            onMouseLeave={() => setCommand(null)}
          >
            {command.code}
            <img src={addIcon} alt="add" onClick={() => onAdd(command.code)} />
          </Command>
        ))}
      </CollapseContent>
      {command && <CommandDescription command={command} />}
    </Collapse>
  );
};
