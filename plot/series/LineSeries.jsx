import React from "react";

import { usePlotContext, GPlotRegion, classes } from "../plot-utils";

import * as d3Shape from "d3-shape";

const renderLine = (data, x, y, curve) => {
  let line = d3Shape.line();
  if (curve !== null) {
    if (typeof curve === "string" && d3Shape[curve]) {
      line = line.curve(d3Shape[curve]);
    } else if (typeof curve === "function") {
      line = line.curve(curve);
    }
  }
  line = line.x(x).y(y);
  return line(data);
};

export const LineSeries = ({
  getX,
  getY,
  curve,
  data,
  color,
  width,
  className,
  ...rest
}) => {
  const { xScale, yScale } = usePlotContext();

  const d = renderLine(data, d => xScale(getX(d)), d => yScale(getY(d)), curve);

  return (
    <GPlotRegion className={classes("plot__series--line", className)}>
      <path
        d={d}
        style={{ stroke: color, strokeWidth: width, fill: "none" }}
        {...rest}
      />
    </GPlotRegion>
  );
};

LineSeries.defaultProps = {
  getX: d => d.x,
  getY: d => d.y,
  curve: null,
  color: "blue",
  width: 2
};
