import { Theme } from 'src/ui/theme'
import { css } from 'styled-components'

type Props = {
  theme?: Theme
}

const backgroundColor = (props: Props) => props.theme!.mainColor.darken(0.2).toString()
const backgroundColorActive = (props: Props) => props.theme!.mainColor.darken(0.4).toString()

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
