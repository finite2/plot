import React, { useMemo } from "react";
import styled from "styled-components";

import { usePlotContext } from "./plot-utils";

export const ClipPath = ({ id, margin }) => {
  const { left, top, innerWidth, innerHeight } = usePlotContext();

  return (
    <clipPath id={id}>
      <rect
        x={left - margin}
        y={top - margin}
        width={innerWidth + margin}
        height={innerHeight + margin}
      />
    </clipPath>
  );
};

ClipPath.defaultProps = {
  id: "content-area",
  margin: 0,
};

const ClipG = styled.g.attrs((p) => ({
  style: { clipPath: `url(#${p.regionID})` },
}))``;

export const ClipPlotRegion = ({ id, margin, children }) => {
  const idMemo = useMemo(() => (id ? id : `clip-path-${Math.random()}`), [id]);

  return (
    <>
      <ClipPath className="plot__clippath" id={idMemo} margin={margin} />
      <ClipG className="plot__g-clippath" regionID={idMemo}>
        {children}
      </ClipG>
    </>
  );
};

ClipPlotRegion.defaultProps = {
  id: "",
  margin: 0,
};
