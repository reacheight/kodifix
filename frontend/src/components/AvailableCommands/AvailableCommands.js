import React, { useState } from 'react';
import {
  Collapse,
  CollapseContent,
  CollapseIcon,
  CollapseTitle,
  Command,
} from './styled';
import arrow1Icon from '../../assets/arrow-1.svg';
import addIcon from '../../assets/add.svg';
import { CommandDescription } from '../CommandDescription/CommandDescription';

const formatCode = (code) => code.replace(/\(\w+\)/, '()');

export const AvailableCommands = ({ isOpen, commands, onAdd, onToggle }) => {
  const [command, setCommand] = useState(null);

  return (
    <Collapse isOpen={isOpen}>
      <CollapseTitle onClick={onToggle}>
        Доступные команды
        <CollapseIcon isOpen={isOpen}>
          <img src={arrow1Icon} alt="arrow" />
        </CollapseIcon>
      </CollapseTitle>
      <CollapseContent>
        {commands.map((command) => (
          <Command
            key={command.code}
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
        ))}
      </CollapseContent>
      {command && <CommandDescription command={command} />}
    </Collapse>
  );
};
