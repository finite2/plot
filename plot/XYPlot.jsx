import React, { useMemo } from "react";

import { PlotContext, getScale, useSVGContext } from "./plot-utils";

import { useZoomablePlot } from "./useZoomablePlot";

const constructGridObject = (grid) => {
  if (!("right" in grid)) {
    grid.right = grid.left;
  }
  if (!("bottom" in grid)) {
    grid.bottom = grid.top;
  }
  return grid;
};

const constructMargin = (margin) => {
  if (typeof margin === "number") {
    return { left: margin, right: margin, top: margin, bottom: margin };
  }

  if (!("left" in margin)) {
    margin.left = 40;
  }
  if (!("right" in margin)) {
    margin.right = 10;
  }
  if (!("top" in margin)) {
    margin.top = 10;
  }
  if (!("bottom" in margin)) {
    margin.bottom = 40;
  }
  return margin;
};

export const XYPlot = ({
  grid,
  margin,
  xType,
  xDomain,
  xValues,
  yType,
  yDomain,
  yValues,
  preserveRatio,
  children,
}) => {
  const { width, height } = useSVGContext();

  if (xValues) {
    xType = "ordinal";
    xDomain = [-0.5, xValues.length - 0.5];
  }
  if (yValues) {
    yType = "ordinal";
    yDomain = [-0.5, yValues.length - 0.5];
  }

  grid = constructGridObject(grid);
  margin = constructMargin(margin);

  const xGrid = width / grid.width;
  const [outerLeft, outerRight] = [grid.left * xGrid, (grid.right + 1) * xGrid];
  const innerWidth = outerRight - margin.right - outerLeft - margin.left;
  const [left, right] = [outerLeft + margin.left, outerRight - margin.right];

  const yGrid = height / grid.height;
  const [outerTop, outerBottom] = [grid.top * yGrid, (grid.bottom + 1) * yGrid];
  const innerHeight = outerBottom - margin.bottom - outerTop - margin.top;
  const [top, bottom] = [outerTop + margin.top, outerBottom - margin.bottom];

  if (innerWidth <= 0) {
    throw "plot region width too small";
  }
  if (innerHeight <= 0) {
    throw "plot region height too small";
  }

  const xRange = useMemo(() => [0, innerWidth], [innerWidth]);
  const yRange = useMemo(() => [innerHeight, 0], [innerHeight]);

  const [domains, events] = useZoomablePlot(xDomain, yDomain, xRange, yRange, preserveRatio);

  const xScale = getScale(domains.xDomain, xRange, xType);
  const yScale = getScale(domains.yDomain, yRange, yType);

  return (
    <PlotContext.Provider
      value={{
        innerWidth,
        innerHeight,
        outerLeft,
        outerRight,
        outerBottom,
        outerTop,
        left,
        right,
        bottom,
        top,
        preserveRatio,
        xType,
        xDomain,
        xRange,
        xScale,
        xValues,
        yType,
        yScale,
        yDomain,
        yRange,
        yValues,
        ...domains,
        events,
      }}
    >
      {children}
    </PlotContext.Provider>
  );
};

XYPlot.defaultProps = {
  grid: { left: 0, right: 0, top: 0, bottom: 0, width: 1, height: 1 },
  margin: { left: 40, right: 10, top: 10, bottom: 40 },
  xDomain: [0, 1],
  xType: "linear",
  yDomain: [0, 1],
  yType: "linear",
  preserveRatio: false,
};
