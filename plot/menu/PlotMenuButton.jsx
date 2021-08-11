import styled from "styled-components";

export const PlotMenuButton = styled.button.attrs((p) => {
  return {
    style: {
      "--background:": "none",
      "--background-hover": "#ccc4",
      ...p.style,
    },
  };
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 100vh;
  border: none;
  cursor: pointer;
  pointer-events: auto;
  background: none;
  transition: 0.25s ease-in-out;
  padding: 0;
  color: var(--color-font);
  user-select: none;

  :hover {
    background: var(--background-hover);
    color: var(--color-font-alt);
  }

  :focus {
    border-color: none;
    outline: 0;
  }
`;
