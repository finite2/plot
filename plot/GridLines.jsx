import React from "react";
import styled from "styled-components";

import {
  getTickValues,
  DIRECTION,
  usePlotContext,
  GPlotRegion,
} from "./plot-utils";

const { VERTICAL } = DIRECTION;

const GLine = styled.line`
  stroke: #c8d6dd;
  pointer-events: none;
`;

export const GridLines = ({ tickTotal, direction, tickValues }) => {
  const {
    innerHeight,
    innerWidth,
    xScale,
    xValues,
    yScale,
    yValues,
  } = usePlotContext();

  const isVertical = direction === VERTICAL;
  const tickXAttr = isVertical ? "y" : "x";
  const tickYAttr = isVertical ? "x" : "y";
  const scale = isVertical ? xScale : yScale;
  const length = isVertical ? innerHeight : innerWidth;
  const ordinalValues = direction === VERTICAL ? xValues : yValues;
  const values = getTickValues(scale, ordinalValues, tickTotal, tickValues);

  const lines = values.map((v, i) => {
    const pos = scale(v);
    const pathProps = {
      [`${tickYAttr}1`]: pos,
      [`${tickYAttr}2`]: pos,
      [`${tickXAttr}1`]: 0,
      [`${tickXAttr}2`]: length,
    };

    return <GLine className="plot__grid-lines__line" {...pathProps} key={i} />;
  });

  return <GPlotRegion className="plot__grid-lines">{lines}</GPlotRegion>;
};

GridLines.defaultProps = {
  tickTotal: 5,
};

export const HorizontalGridLines = (props) => <GridLines {...props} />;

HorizontalGridLines.defaultProps = {
  direction: DIRECTION.HORIZONTAL,
};

export const VerticalGridLines = (props) => <GridLines {...props} />;

VerticalGridLines.defaultProps = {
  direction: DIRECTION.VERTICAL,
};
