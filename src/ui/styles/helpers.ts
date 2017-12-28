import { css } from 'react-emotion'

export const fullscreen = css`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

export const flexCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const faded = css`
  opacity: 0.5;
`

export const spacedChildrenVertical = (spacing = '0.5rem') => css`
  > * + * {
    margin-top: ${spacing};
  }
`

export const spacedChildrenHorizontal = (spacing = '0.5rem') => css`
  > * + * {
    margin-left: ${spacing};
  }
`

export const fadedHoverReveal = (defaultOpacity = 0.5, hoveredOpacity = 0.75) => css`
  opacity: ${defaultOpacity};
  transition: 0.2s;

  &:hover {
    opacity: ${hoveredOpacity};
  }
`

export const debugBorder = css`
  > * {
    border: 1px solid red;
  }
`

export const grid = ({ rows = '100%', columns = '100%', gap = '4px' } = {}) => css`
  display: grid;
  grid-template-rows: ${rows};
  grid-template-columns: ${columns};
  grid-gap: ${gap};
`
