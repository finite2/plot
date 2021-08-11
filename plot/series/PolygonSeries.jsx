import React from "react";
import styled from "styled-components";

import { usePlotContext, GPlotRegion, classes } from "../plot-utils";

const generatePath = (data, getX, getY) =>
  `${data.reduce((res, row, i) => `${res} ${i ? "L" : "M"}${getX(row)} ${getY(row)}`, "")} Z`;

const PolygonPath = styled.path`
  stroke-width: 0;
  pointer-events: auto;
`;

export const PolygonSeries = ({
  id,
  className,
  style,
  data,
  getX,
  getY,
  getColor,
  getStroke,
  getOpacity,
  getFill,
  strokeWidth,
  stroke,
  color,
  onClick,
}) => {
  const { xScale, yScale } = usePlotContext();

  if (getColor) {
    if (!getFill) {
      getFill = getColor;
    }
    if (!getStroke) {
      getStroke = getColor;
    }
  }

  const scaledGetX = (d) => xScale(getX(d));
  const scaledGetY = (d) => yScale(getY(d));

  const polygons = data.map((d, i) => {
    console.log(d.points);
    const attrs = {
      key: i,
      d: generatePath(d.points, scaledGetX, scaledGetY),
      style: {
        opacity: getOpacity && getOpacity(d),
        stroke: strokeWidth ? (getStroke ? getStroke(d) : stroke ? stroke : color) : null,
        fill: getFill ? getFill(d) : color,
        strokeWidth: strokeWidth || null,
        ...style,
      },
      onClick: (e) => onClick(e, d.points, scaledGetX, scaledGetY),
    };

    return <PolygonPath {...attrs} />;
  });

  return (
    <GPlotRegion
      id={id}
      className={classes("plot__series--polygon", className)}
      style={{ fill: color }}
    >
      {polygons}
    </GPlotRegion>
  );
};

PolygonSeries.defaultProps = {
  getX: (d) => d.x,
  getY: (d) => d.y,
  color: "blue",
  onClick: () => null,
};
