import styled from "styled-components";

import { PlotContainer } from "./PlotContainer";
import { FullscreenButton } from "./FullscreenButton";

const MenuHolder = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;

  visibility: hidden;

  ${PlotContainer}:hover & {
    visibility: visible;
  }
  :hover {
    visibility: visible;
  }
`;

export const PlotMenu = () => {
  return (
    <MenuHolder>
      <FullscreenButton />
    </MenuHolder>
  );
};
