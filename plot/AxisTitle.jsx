import React from "react";
import styled from "styled-components";

import { usePlotContext, ORIENTATION } from "./plot-utils";

const TitleContainer = styled.div`
  position: absolute;
  width: 100%;
`;

const Title = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const AxisTitle = ({ orientation, inside, margin, children }) => {
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
    innerHeight
  } = usePlotContext();

  let objectProps, titleProps, containerProps;
  if (orientation === ORIENTATION.BOTTOM) {
    objectProps = {
      x: left + margin,
      y: top + margin,
      height: innerHeight - 2 * margin,
      width: innerWidth - 2 * margin
    };

    containerProps = {
      style: {
        bottom: 0
      }
    };

    titleProps = {
      style: {
        textAlign: "right"
      }
    };
  } else if (orientation === ORIENTATION.TOP) {
    objectProps = {
      x: left + margin,
      y: top + margin,
      height: innerHeight - 2 * margin,
      width: innerWidth - 2 * margin
    };

    containerProps = {
      style: {
        top: 0
      }
    };

    titleProps = {
      style: {
        textAlign: "right"
      }
    };
  } else if (orientation === ORIENTATION.LEFT) {
    objectProps = {
      x: left + innerWidth / 2 - innerHeight / 2 + margin,
      y: top + innerHeight / 2 - innerWidth / 2 + margin,
      height: innerWidth - 2 * margin,
      width: innerHeight - 2 * margin,
      transform: `rotate(90)`,
      style: {
        transformOrigin: `${left + innerWidth / 2}px ${top + innerHeight / 2}px`
      }
    };

    containerProps = {
      style: {
        bottom: 0
      }
    };

    titleProps = {
      style: {
        textAlign: "left"
      }
    };
  } else if (orientation === ORIENTATION.RIGHT) {
    objectProps = {
      x: left + innerWidth / 2 - innerHeight / 2 + margin,
      y: top + innerHeight / 2 - innerWidth / 2 + margin,
      height: innerWidth - 2 * margin,
      width: innerHeight - 2 * margin,
      transform: `rotate(90)`,
      style: {
        transformOrigin: `${left + innerWidth / 2}px ${top + innerHeight / 2}px`
      }
    };

    containerProps = {
      style: {
        top: 0
      }
    };

    titleProps = {
      style: {
        textAlign: "left"
      }
    };
  } else {
    console.warn(`orientation value "${orientation}" not supported`);
  }

  return (
    <foreignObject {...objectProps}>
      <TitleContainer
        className="plot__axis-title-container"
        {...containerProps}
      >
        <Title className="plot__axis-title" {...titleProps}>
          {children}
        </Title>
      </TitleContainer>
    </foreignObject>
  );
};

AxisTitle.defaultProps = {
  orientation: ORIENTATION.BOTTOM,
  inside: false,
  margin: 5
};
