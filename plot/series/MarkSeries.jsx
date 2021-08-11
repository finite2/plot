import React from "react";
import styled from "styled-components";

import {
  usePlotContext,
  GPlotRegion,
  classes,
  onDataEvents
} from "../plot-utils";

const TextMark = styled.text`
  alignment-baseline: middle;
  text-anchor: middle;
`;

const starPoints = size => {
  return [...new Array(5)]
    .map((c, index) => {
      const angle = (index / 5) * Math.PI * 2;
      const innerAngle = angle + Math.PI / 10;
      const outerAngle = angle - Math.PI / 10;
      // ratio of inner polygon to outer polgyon
      const innerRadius = size / 2.61;
      return `
        ${Math.cos(outerAngle) * size} ${Math.sin(outerAngle) * size}
        ${Math.cos(innerAngle) * innerRadius} ${Math.sin(innerAngle) *
        innerRadius}
      `;
    })
    .join(" ");
};

const marks = {
  circle: ({ size, ...rest }) => <circle r={size / 2} {...rest} />,
  square: ({ size, ...rest }) => (
    <rect x={-size / 2} y={-size / 2} width={size} height={size} {...rest} />
  ),
  star: ({ size, ...rest }) => (
    <polygon points={starPoints(size / 2)} {...rest} />
  ),
  diamond: ({ size, ...rest }) => (
    <polygon
      points={`0 0 ${size / 2} ${size / 2} 0 ${size} ${-size / 2} ${size /
        2} 0 0`}
      {...rest}
    />
  ),
  text: ({ size, content, ...rest }) => (
    <TextMark fontSize={size} {...rest}>
      {content}
    </TextMark>
  )
};

export const MarkSeries = ({
  mark,
  data,
  getX,
  getY,
  getMark,
  getContent,
  getSize,
  getColor,
  getStroke,
  getOpacity,
  getFill,
  strokeWidth,
  color,
  size,
  markTemplates,
  className,
  style,
  ...rest
}) => {
  const extraProps = { ...rest };
  const { xScale, yScale } = usePlotContext();

  let markLibrary = marks;
  if (markTemplates) {
    markLibrary = { ...marks, ...markTemplates };
  }
  let Mark = null;
  if (typeof mark === "string") {
    if (mark in markLibrary) {
      Mark = markLibrary[mark];
    } else {
      throw new Error(`Error in MarkSeries mark named "${mark}" not found`);
    }
  } else if (mark instanceof Function) {
    Mark = mark;
  }

  if (getColor) {
    if (!getFill) {
      getFill = getColor;
    }
    if (!getStroke) {
      getStroke = getColor;
    }
  }

  const points = data.map((d, i) => {
    if (getMark) {
      Mark = markLibrary[getMark(d, i)];
      if (!Mark) {
        console.error(
          `Error in markSeries mark named "${getMark(d, i)}" not found`
        );
        return null;
      }
    }

    const x = xScale(getX(d, i));
    const y = yScale(getY(d, i));
    const attrs = {
      key: i,
      size: getSize ? getSize(d, i) : size,
      content: getContent && getContent(d, i),
      color: getColor ? getColor(d, i) : color,
      style: {
        opacity: getOpacity && getOpacity(d, i),
        stroke: getStroke ? getStroke(d, i) : color,
        fill: getFill ? getFill(d, i) : color,
        strokeWidth: strokeWidth || 1 * (mark !== "text"),
        ...style
      },
      ...onDataEvents(extraProps, d, i)
    };

    return (
      <g transform={`translate(${x},${y})`}>
        <Mark {...attrs} />
      </g>
    );
  });

  return (
    <GPlotRegion
      className={classes("plot__series--mark", className)}
      style={{ fill: color }}
    >
      {points}
    </GPlotRegion>
  );
};

MarkSeries.defaultProps = {
  mark: "circle",
  getX: d => d.x,
  getY: d => d.y,
  color: "blue",
  size: 10
};
