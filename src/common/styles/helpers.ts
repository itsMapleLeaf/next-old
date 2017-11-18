import { css } from 'react-emotion'

export const fullscreenStyle = css`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

export const scrollVertical = css`
  overflow-y: auto;
  min-height: 0;
  transform: translateZ(0); /* for accelerated GPU rendering */
`
