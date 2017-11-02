import { keyframes } from "emotion"
import * as React from "react"
import styled from "react-emotion"
import { Icon } from "src/app/components/Icon"

const Shade = styled.div`
  background: rgba(0, 0, 0, 0.5);
`

const iconAnimation = keyframes`
  0% { transform: perspective(180px) rotateX(0) rotateY(0); }
  25% { transform: perspective(180px) rotateX(0.5turn) rotateY(0); }
  50% { transform: perspective(180px) rotateX(0.5turn) rotateY(0.5turn); }
  75% { transform: perspective(180px) rotateX(1turn) rotateY(0.5turn); }
  100% { transform: perspective(180px) rotateX(1turn) rotateY(1turn); }
`

const AnimatedIcon = styled(Icon)`
  animation: ${iconAnimation} 4s infinite;
  opacity: 0.3;
`

type LoadingProps = { text: string }

export function Loading(props: LoadingProps) {
  return (
    <Shade className="fullscreen flex-column flex-center">
      <div>
        <AnimatedIcon name="paw" size={100} />
      </div>
      <h2 className="text-italic">{props.text}</h2>
    </Shade>
  )
}
