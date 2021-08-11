import React from "react";

export const Offset = ({ left, top, children }) => {
  return <g transform={`translate(${left},${top})`}>{children}</g>;
};

Offset.defaultProps = {
  left: 0,
  top: 0
};
