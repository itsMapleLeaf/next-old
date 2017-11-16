import { theme } from '../theme'
import { css } from 'react-emotion'

const backgroundColor = theme.mainColor.darken(0.2).toString()
const backgroundColorActive = theme.mainColor.darken(0.4).toString()

export const baseInputStyles = css`
  color: inherit;
  font: inherit;
  padding: 0.5rem 0.75rem;
  background-color: ${backgroundColor};
  border: none;
  transition: 0.25s background-color;

  &:hover,
  &:focus {
    background-color: ${backgroundColorActive};
  }

  &:focus {
    outline: none;
  }
`
