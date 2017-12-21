import { css } from 'react-emotion'

export const baseInputStyles = css`
  border: none;
  padding: 0.5rem 0.75rem;
  background-color: rgba(0, 0, 0, 0.2);
  transition: 0.2s background-color;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.4);
  }

  /* &:focus {
    background-color: rgba(0, 0, 0, 0.6);
  } */
`
