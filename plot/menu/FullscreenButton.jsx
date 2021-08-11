import React, { useEffect } from "react";

import { useSVGContext } from "../plot-utils";
import { PlotMenuButton } from "./PlotMenuButton";

import { Icon } from "@finite/core/components/Icon";

const openFullscreen = (target) => {
  if (target.requestFullscreen) {
    target.requestFullscreen();
  } else if (target.webkitRequestFullscreen) {
    /* Safari */
    target.webkitRequestFullscreen();
  } else if (target.msRequestFullscreen) {
    /* IE11 */
    target.msRequestFullscreen();
  }
};

const closeFullscreen = () => {
  document.exitFullscreen();
};

const toggleFullScreen = (targetRef) => {
  if (document.fullscreenElement && document.fullscreenElement.id === targetRef.current.id) {
    closeFullscreen();
  } else {
    openFullscreen(targetRef.current);
  }
};

const useFullScreenEvent = (svgRef, setSize, resetSize) => {
  useEffect(() => {
    const onEvent = (e) => {
      if (document.fullscreenElement && document.fullscreenElement.id === svgRef.current.id) {
        setTimeout(
          () =>
            setSize({
              width: window.screen.width,
              height: window.screen.height,
            }),
          50
        );
      } else {
        resetSize();
      }
    };

    document.addEventListener("fullscreenchange", onEvent);

    return () => document.removeEventListener("fullscreenchange", onEvent);
  }, []);
};

export const FullscreenButton = () => {
  const { containerRef, setSize, resetSize } = useSVGContext();

  useFullScreenEvent(containerRef, setSize, resetSize);

  return (
    <PlotMenuButton onClick={() => toggleFullScreen(containerRef)}>
      <Icon name="faExpand" />
    </PlotMenuButton>
  );
};
