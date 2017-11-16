import styled from 'react-emotion'

type Props = {
  visible: boolean
}

export const FadeTransition = styled.div`
  opacity: ${(props: Props) => (props.visible ? 1 : 0)};
  visibility: ${(props: Props) => (props.visible ? 'visible' : 'hidden')};
  transition: 0.3s;
`
