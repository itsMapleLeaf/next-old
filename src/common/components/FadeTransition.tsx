import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'

type Props = {
  visible: boolean
}

export const FadeTransition = styled.div`
  opacity: ${(props: Props) => (props.visible ? 1 : 0)};
  visibility: ${(props: Props) => (props.visible ? 'visible' : 'hidden')};
  transition: 0.3s;
`
