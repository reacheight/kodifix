import { useState, useRef } from 'react';

export const useRefState = (initValue) => {
  const [state, setState] = useState(initValue);
  const ref = useRef(initValue);

  const setRefState = (state) => {
    setRefState(state);
    ref.current = state;
  }

  return [ref.current, setRefState];
}