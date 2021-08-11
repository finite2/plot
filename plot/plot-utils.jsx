import React, { createContext, useContext } from "react";

import { scaleLinear, scaleLog } from "d3-scale";

export const SVGContext = createContext({
  width: 900,
  height: 600
});

export const useSVGContext = () => useContext(SVGContext);

export const PlotContext = createContext({});
// // contains:
// innerWidth, data plot region width
// innerHeight, data plot region height
// outerLeft, outer plot region (relative to svg, including margins)
// outerRight, outer plot region (relative to svg, including margins)
// outerBottom, outer plot region (relative to svg, including margins)
// outerTop, outer plot region (relative to svg, including margins)
// left, inner plot region (relative to svg)
// right, inner plot region (relative to svg)
// bottom, inner plot region (relative to svg)
// top, inner plot region (relative to svg)
// xType, string (possibly optional)
// xDomain, [min,max] (possibly optional)
// xScale, d3 scale object
// yType, string (possibly optional)
// yDomain, [min,max] (possibly optional)
// yScale, d3 scale object
// //

export const usePlotContext = () => useContext(PlotContext);

export const getTickValues = (scale, ordinalValues, tickTotal, tickValues) => {
  if (tickValues) {
    return tickValues;
  } else if (ordinalValues) {
    return ordinalValues.map((d, i) => i);
  }
  return scale.ticks ? scale.ticks(tickTotal) : scale.domain();
};

export function classes() {
  return [...arguments].filter(Boolean).join(" ");
}

export const ORIENTATION = {
  TOP: "top",
  LEFT: "left",
  RIGHT: "right",
  BOTTOM: "bottom",
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal"
};

export const DIRECTION = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal"
};

export const GPlotRegion = ({ className, children }) => {
  const { left, top } = usePlotContext();

  return (
    <g className={className} transform={`translate(${left},${top})`}>
      {children}
    </g>
  );
};

export const onDataEvents = (props, data, index) => {
  let eventHandlerKeys = Object.keys(props).filter(k => k.startsWith("on"));
  let p = {};
  for (var i = 0; i < eventHandlerKeys.length; i++) {
    let key = eventHandlerKeys[i];
    p[key] = e => props[key](e, data, index);
  }
  return p;
};

export const getScale = (domain, range, type = "linear") => {
  if (type === "linear" || type === "ordinal") {
    return scaleLinear()
      .domain(domain)
      .range(range);
  } else if (type === "log") {
    if (domain[0] <= 0) {
      console.warn("log scale cannot be less than or equal to zero");
    }
    return scaleLog()
      .domain(domain)
      .range(range);
  }
};
