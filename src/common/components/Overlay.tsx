import * as React from 'react'
import styled from 'styled-components'

const Shade = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
`

const Panel = styled.div`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`

type OverlayProps = {
  children?: React.ReactNode
  onShadeClick?: () => void
}

export function Overlay(props: OverlayProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.target
    if (el instanceof HTMLDivElement && el.classList.contains('is-shade')) {
      if (props.onShadeClick) {
        props.onShadeClick()
      }
    }
  }

  return (
    <Shade className="fullscreen flex-center is-shade" onClick={handleClick}>
      <Panel>{props.children}</Panel>
    </Shade>
  )
}
