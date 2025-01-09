import React from 'react';
import { ClosedBridge, OpenBridge } from "./styled";

export const Bridge = ({ key, xStart, xEnd, yStart, yEnd, vertical, activated, random }) => {
  return activated
    ? <OpenBridge
        key={`${key}`}
        xStart={xStart}
        xEnd={xEnd}
        yStart={yStart}
        yEnd={yEnd}
        vertical={vertical}
        random={random}
      />
    : <ClosedBridge
        key={`${key}`}
        xStart={xStart}
        xEnd={xEnd}
        yStart={yStart}
        yEnd={yEnd}
        vertical={vertical}
        random={random}
      >
      </ClosedBridge>
};