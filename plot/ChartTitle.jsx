import React from "react";
import styled from "styled-components";

import { usePlotContext } from "./plot-utils";

const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Title = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
`;

export const ChartTitle = ({ paddingBottom, children }) => {
  const {
    outerLeft,
    //outerRight,
    //outerBottom,
    outerTop,
    left,
    //right,
    //bottom,
    top,
    innerWidth,
  } = usePlotContext();

  return (
    <foreignObject
      x={outerLeft + left}
      y={outerTop}
      height={top - paddingBottom}
      width={innerWidth}
    >
      <TitleContainer className="plot__title-container">
        <Title className="plot__title-title">{children}</Title>
      </TitleContainer>
    </foreignObject>
  );
};

ChartTitle.defaultProps = {
  paddingBottom: 5,
};
