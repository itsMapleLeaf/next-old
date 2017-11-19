import styled, { css } from 'react-emotion'
import { baseInputStyles } from '../styles/inputStyles'

type ButtonProps = {
  flat?: boolean
  faded?: boolean
}

const flatStyle = css`
  background: transparent;
  padding: 0px 8px;
`

const fadedStyle = css`
  opacity: 0.5;
`

export const Button = styled.button`
  cursor: pointer;
  ${baseInputStyles};

  ${(props: ButtonProps) => props.flat && flatStyle};
  ${(props: ButtonProps) => props.faded && fadedStyle};
`
