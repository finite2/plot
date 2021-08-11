import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { getId } from "@utils";

import { SVGContext } from "./plot-utils";
import { PlotMenu } from "./menu/PlotMenu";
import { PlotContainer } from "./menu/PlotContainer";

const SVGstyled = styled.svg`
  user-select: none;

  fill: var(--color-font);

  &:fullscreen {
    background: var(--color-background);
  }
`;

const useSVGsize = (width, height) => {
  const [size, setSize] = useState({ width, height });

  useEffect(() => {
    setSize((s) => {
      if (width !== s.width || height !== s.height) {
        return { width, height };
      } else {
        return s;
      }
    });
  }, [width, height]);

  const resetSize = useCallback(() => {
    setSize({ width, height });
  }, [width, height]);

  return [size, setSize, resetSize];
};

export const SVG = ({ width: propWidth, height: propHeight, children, ...rest }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const idRef = useRef(getId());

  const [{ width, height }, setSize, resetSize] = useSVGsize(propWidth, propHeight);

  return (
    <SVGContext.Provider value={{ width, height, svgRef, containerRef, setSize, resetSize }}>
      <PlotContainer ref={containerRef} id={idRef.current} style={{ width, height }}>
        <SVGstyled ref={svgRef} width={width} height={height} {...rest}>
          {children}
        </SVGstyled>
        <PlotMenu />
      </PlotContainer>
    </SVGContext.Provider>
  );
};

SVG.defaultProps = {
  width: 900,
  height: 600,
};
