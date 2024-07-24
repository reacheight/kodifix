import React, { useState } from 'react';

import arrow2Icon from '../../assets/arrow-2.svg';
import button1Icon from '../../assets/button-1.svg';
import button2Icon from '../../assets/button-2.svg';

import {
  Wrapper,
  Modal,
  Top,
  Title,
  CloseButton,
  Block,
  Instructions,
  ExampleCode,
  NewCommandsWrapper,
  Subtitle,
  Steps,
  Control,
  CirclesWrapper,
  Circle,
  Button,
  ButtonsWrapper,
} from './styled';
import {
  Top as NewCommandTop,
  Tag,
  Description,
  Example,
  ExampleTitle,
} from '../CommandDescription/styled';
import close2Icon from '../../assets/close-2.svg';
import { extract } from '../../utils/extract';

export const LevelGuide = ({ level, data, onClose }) => {
  const { instructions, example, newCommands } = data;
  const commonExamples = example?.split('\n').map(extract);
  const [commandIndex, setCommandIndex] = useState(0);
  const newCommand = newCommands[commandIndex];
  const newCommandExample = extract(newCommand?.example);
  const newCommandCode = extract(newCommand?.code);

  const hasPrev = commandIndex > 0;

  const hasNext = commandIndex < newCommands.length - 1;

  const next = () => {
    if (hasNext) {
      setCommandIndex(commandIndex + 1);
    }
  };

  const prev = () => {
    if (hasPrev) {
      setCommandIndex(commandIndex - 1);
    }
  };

  return (
    <Wrapper>
      <Modal>
        <Top>
          <Title>Уровень {level}</Title>
          <CloseButton onClick={onClose}>
            <img src={close2Icon} alt="close" />
          </CloseButton>
        </Top>

        {instructions || example ? (
          <Block>
            {instructions ? <Instructions>{instructions}</Instructions> : null}
            {example ? (
              <ExampleCode>
                {commonExamples.map((a) => (
                  <div key={a.name}>
                    {a.name}
                    <span>{a.brackets}</span>
                  </div>
                ))}
              </ExampleCode>
            ) : null}
          </Block>
        ) : null}

        {newCommand ? (
          <NewCommandsWrapper>
            <Subtitle>Новые команды</Subtitle>
            <Block>
              <NewCommandTop>
                <Subtitle>
                  {newCommandCode.name}
                  <span>{newCommandCode.brackets}</span>
                </Subtitle>
                <span>-</span>
                <Tag>метод</Tag>
              </NewCommandTop>
              <Description>{newCommand.description}</Description>
              <Example>
                <ExampleTitle>Пример использования:</ExampleTitle>
                <ExampleCode>
                  {newCommandExample.name}
                  <span>{newCommandExample.brackets}</span>
                </ExampleCode>
              </Example>

              {newCommands.length > 1 ? (
                <Steps>
                  <Control type="prev" onClick={prev} disabled={!hasPrev}>
                    <img src={arrow2Icon} alt="предыдущий" />
                  </Control>

                  <CirclesWrapper>
                    {newCommands.map((_, i) => (
                      <Circle
                        key={i}
                        isActive={i === commandIndex}
                        onClick={() => setCommandIndex(i)}
                      />
                    ))}
                  </CirclesWrapper>

                  <Control type="next" onClick={next} disabled={!hasNext}>
                    <img src={arrow2Icon} alt="следующий" />
                  </Control>
                </Steps>
              ): null}
            </Block>
          </NewCommandsWrapper>
        ) : null}

        <ButtonsWrapper>
          <Button>
            <img src={button1Icon} alt="меню" />
          </Button>
          <Button onClick={onClose}>
            <img src={button2Icon} alt="продолжить" />
          </Button>
        </ButtonsWrapper>
      </Modal>
    </Wrapper>
  );
};