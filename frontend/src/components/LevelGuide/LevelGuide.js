import React, { useState } from 'react';

import arrow2Icon from '../../assets/arrow-2.svg';

import { Button } from '../Button/Button';

import { useNavigate, useParams } from 'react-router-dom';

import {
  Wrapper,
  Modal,
  Top,
  Title,
  CloseButton,
  Block,
  Instructions,
  CodeMirrorWrapper,
  NewCommandsWrapper,
  Subtitle,
  Steps,
  Control,
  CirclesWrapper,
  Circle,
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
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { tags as t } from '@lezer/highlight';
import { python } from '@codemirror/lang-python';

const basicSetup = {
  highlightActiveLineGutter: false,
};

const extensions = [python()];

const theme = vscodeDarkInit({
  styles: [{ tag: t.comment, color: 'rgba(255, 255, 255, 0.5)' }],
});

export const LevelGuide = ({ level, data, onClose }) => {
  const { instructions, example, newCommands } = data;
  const [commandIndex, setCommandIndex] = useState(0);
  const newCommand = newCommands[commandIndex];
  const newCommandCode = extract(newCommand?.code);
  const navigate = useNavigate();
  const { gameId } = useParams();

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

  const openMenu = () => {
    navigate(`/${gameId}`);
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
              <CodeMirrorWrapper>
                <CodeMirror
                  extensions={extensions}
                  basicSetup={basicSetup}
                  theme={theme}
                  value={example}
                  editable={false}
                />
              </CodeMirrorWrapper>
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
                <CodeMirrorWrapper>
                  <CodeMirror
                    extensions={extensions}
                    basicSetup={basicSetup}
                    theme={theme}
                    value={newCommand?.example}
                    editable={false}
                  />
                </CodeMirrorWrapper>
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
              ) : null}
            </Block>
          </NewCommandsWrapper>
        ) : null}

        <ButtonsWrapper>
          <Button frontColor="#BD3A0F" shadowColor="#8C2B0B" onClick={openMenu} height="50" width="100">
            <span>Меню</span>
          </Button> 
          <Button frontColor="#40BF4C" shadowColor="#1E9029" onClick={onClose} height="50" width="100">
            <span>Дальше</span>
          </Button>
        </ButtonsWrapper>
      </Modal>
    </Wrapper>
  );
};
