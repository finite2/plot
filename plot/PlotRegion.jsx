import React, { useRef } from "react";
import styled from "styled-components";

import { usePlotContext } from "./plot-utils";

const PlotRegionRect = styled.rect``;

export const PlotRegion = ({ fill, draggable, children }) => {
  const { left, innerWidth, top, innerHeight, events } = usePlotContext();
  const ref = useRef();

  let draggableEvents = {};
  if (draggable) {
    const { onPointerDown, onPointerUp, onPointerMove, ...rest } = events;

    draggableEvents = {
      onPointerDown: (e) => onPointerDown(e, ref),
      onPointerUp: (e) => onPointerUp(e, ref),
      onPointerMove: (e) => onPointerMove(e, ref),
      ...rest,
    };
  }

  return (
    <g ref={ref} {...draggableEvents} style={{ cursor: draggable ? "move" : "auto" }}>
      <PlotRegionRect
        className="plot__region-dragcatcher"
        x={left}
        y={top}
        width={innerWidth}
        height={innerHeight}
        fill={fill}
      />
      {children}
    </g>
  );
};

PlotRegion.defaultProps = {
  fill: "var(--color-background-alt)",
  draggable: false,
};
