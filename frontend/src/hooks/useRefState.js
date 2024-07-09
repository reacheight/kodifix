import { useState, useRef } from 'react';

export const useRefState = (initValue) => {
  const [state, setState] = useState(initValue);
  const ref = useRef(initValue);

  const setRefState = (state) => {
    setState(state);
    ref.current = state;
  };

  return [ref, setRefState, state];
};
