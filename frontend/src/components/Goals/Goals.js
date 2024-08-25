import React, { useState } from 'react';
import { Collapse, Wrapper, Title, CollapseIcon, CollapsTitle, CollapseContent, GoalsBlock, GoalsBlockTitle, GoalsList, Goal } from './styled';
import arrow1Icon from '../../assets/arrow-1.svg';
import checkmark from '../../assets/checkmark.svg';

export const Goals = ({ forceOpen, goals, goalsResult }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!goals || goals.length === 0)
    return;

  const trueIsOpen = isOpen || forceOpen;
  const showResults = forceOpen && goalsResult && goalsResult.length > 0;
  const requiredGoals = goals.filter(g => g.required);
  const optionalGoals = goals.filter(g => !g.required);

  return (
    <Wrapper>
      <Collapse>
        <CollapsTitle onClick={() => setIsOpen(!isOpen)}>
          <Title>Цели уровня</Title>
          <CollapseIcon isOpen={trueIsOpen}>
            <img src={arrow1Icon} alt="arrow" />
          </CollapseIcon>
        </CollapsTitle>
        <CollapseContent isOpen={trueIsOpen}>
          {requiredGoals.length > 0 && (
            <GoalsBlock>
              <GoalsBlockTitle>Обязательные</GoalsBlockTitle>
              <GoalsList>
                {requiredGoals.map(goal => {
                  const goalCompleted = goalsResult?.find(r => r.type === goal.type)?.completed;
                  return <Goal notCompleted={showResults && !goalCompleted} key={goal.type}>
                    {goal.name}
                    {(showResults && goalCompleted) && (<img src={checkmark} />)}
                  </Goal>;
                })}
              </GoalsList>
            </GoalsBlock>
          )}
          {optionalGoals.length > 0 && (
            <GoalsBlock>
              <GoalsBlockTitle>Опциональные</GoalsBlockTitle>
              <GoalsList>
                {optionalGoals.map(goal => {
                  const goalCompleted = goalsResult?.find(r => r.type === goal.type)?.completed;
                  return <Goal notCompleted={showResults && !goalCompleted} key={goal.type}>
                    {goal.name}
                    {(showResults && goalCompleted) && (<img src={checkmark} />)}
                  </Goal>;
                })}
              </GoalsList>
            </GoalsBlock>
          )}
        </CollapseContent>
      </Collapse>
    </Wrapper>
  )
}