import React, { useState } from 'react';
import {
  Collapse,
  CollapseContent,
  CollapseIcon,
  CollapseTitle,
  Command,
  NewCommand,
} from './styled';
import arrow1Icon from '../../assets/arrow-1.svg';
import addIcon from '../../assets/add.svg';
import { CommandDescription } from '../CommandDescription/CommandDescription';

const formatCode = (code) => code.replace(/\(\w+\)/, '()');

export const AvailableCommands = ({ isOpen, newCommands = [], prevCommands = [], onAdd, onToggle }) => {
  const [command, setCommand] = useState(null);

  const renderCommand = (command, isNew = false) => (
    <Command
      key={command.code}
      as={isNew ? NewCommand : undefined}
      onMouseOver={() => setCommand(command)}
      onMouseLeave={() => setCommand(null)}
    >
      <div>
        hero.
        <span>{command.code.substring(5, command.code.indexOf('('))}</span>
        {command.code.substring(command.code.indexOf('('), command.code.length)}
      </div>
      <img
        src={addIcon}
        alt="add"
        onClick={() => onAdd(formatCode(command.code))}
      />
    </Command>
  );

  return (
    <Collapse isOpen={isOpen}>
      <CollapseTitle onClick={onToggle}>
        Доступные команды
        <CollapseIcon isOpen={isOpen}>
          <img src={arrow1Icon} alt="arrow" />
        </CollapseIcon>
      </CollapseTitle>
      <CollapseContent>
        {newCommands.map((command) => renderCommand(command, true))}
        {prevCommands.map((command) => renderCommand(command))}
      </CollapseContent>
      {command && <CommandDescription command={command} />}
    </Collapse>
  );
};
