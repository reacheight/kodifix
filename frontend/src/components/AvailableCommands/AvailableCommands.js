import React, { useState, useEffect } from 'react';
import { Collapse, CollapseContent, CollapseIcon, CollapseTitle } from './styled';
import arrowIcon from '../../assets/arrow.svg';
import axios from 'axios';

export const AvailableCommands = () => {
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   axios.get(`http://localhost:9000/level/${id}`)
  // }, []);

  return (
    <Collapse isOpen={isOpen}>
      <CollapseTitle onClick={() => setIsOpen(!isOpen)}>
        Доступные команды
        <CollapseIcon isOpen={isOpen}>
          <img src={arrowIcon} alt="arrow" />
        </CollapseIcon>
      </CollapseTitle>
      <CollapseContent>
        <div>hero.get_loot()</div>
        <div>hero.use()</div>
        <div>hero.has_enemies_around()</div>
        <div>hero.shot_fireball()</div>
      </CollapseContent>
    </Collapse>
  )
}