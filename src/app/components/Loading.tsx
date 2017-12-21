import * as React from 'react'
import styled, { keyframes } from 'react-emotion'
import { Icon } from '../../ui/components/Icon'
import { helpers } from '../../ui/styles'

const iconAnimation = keyframes`
  0% { transform: perspective(180px) rotateX(0) rotateY(0); }
  25% { transform: perspective(180px) rotateX(0.5turn) rotateY(0); }
  50% { transform: perspective(180px) rotateX(0.5turn) rotateY(0.5turn); }
  75% { transform: perspective(180px) rotateX(1turn) rotateY(0.5turn); }
  100% { transform: perspective(180px) rotateX(1turn) rotateY(1turn); }
`

const Shade = styled.div`
  ${helpers.fullscreen};
  ${helpers.flexCenter};
  background: rgba(0, 0, 0, 0.5);
`

const AnimatedIcon = styled(Icon)`
  animation: ${iconAnimation} 4s infinite;
  opacity: 0.3;
`

const Text = styled.h2`
  font-style: italic;
`

type Props = { message: string }

export function Loading(props: Props) {
  return (
    <Shade>
      <AnimatedIcon name="paw" size={100} />
      <Text>{props.message}</Text>
    </Shade>
  )
}
