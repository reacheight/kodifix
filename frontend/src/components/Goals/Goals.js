import React, { useState } from 'react';
import { Collapse, Wrapper, Title, CollapseIcon, CollapsTitle, CollapseContent, GoalsBlock, GoalsBlockTitle, GoalsList, Goal } from './styled';
import arrow1Icon from '../../assets/arrow-1.svg';

export const Goals = ({ goals }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!goals || goals.length === 0)
    return;

  const requiredGoals = goals.filter(g => g.required);
  const optionalGoals = goals.filter(g => !g.required);

  return (
    <Wrapper>
      <Collapse>
        <CollapsTitle onClick={() => setIsOpen(!isOpen)}>
          <Title>Цели уровня</Title>
          <CollapseIcon isOpen={isOpen}>
            <img src={arrow1Icon} alt="arrow" />
          </CollapseIcon>
        </CollapsTitle>
        <CollapseContent isOpen={isOpen}>
          {requiredGoals.length > 0 && (
            <GoalsBlock>
              <GoalsBlockTitle>Обязательные</GoalsBlockTitle>
              <GoalsList>
                {requiredGoals.map(goal => <Goal key={goal.type}>{goal.name}</Goal>)}
              </GoalsList>
            </GoalsBlock>
          )}
          {optionalGoals.length > 0 && (
            <GoalsBlock>
              <GoalsBlockTitle>Опциональные</GoalsBlockTitle>
              <GoalsList>
                {optionalGoals.map(goal => <Goal key={goal.type}>{goal.name}</Goal>)}
              </GoalsList>
            </GoalsBlock>
          )}
        </CollapseContent>
      </Collapse>
    </Wrapper>
  )
}