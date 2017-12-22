import styled, { css } from 'react-emotion'

type Props = {
  active?: boolean
}

const activeStyle = css`
  opacity: 1;
  visibility: visible;
`

const inactiveStyle = css`
  opacity: 0;
  visibility: hidden;
`

export const FadeTransition = styled.div`
  transition: 0.25s;
  ${(props: Props) => (props.active ? activeStyle : inactiveStyle)};
`
