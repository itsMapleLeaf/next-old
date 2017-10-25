import * as React from 'react'
import { Transition } from 'src/common/components/Transition'
import { preventDefault } from 'src/common/util/react'
import './Overlay.scss'

type OverlayProps = {
  children: React.ReactNode
  onShadeClick?: () => void
}

export function Overlay(props: OverlayProps) {
  const handleClick = preventDefault(() => {
    if (props.onShadeClick) props.onShadeClick()
  })
  return (
    <Transition name="fade">
      <div className="Overlay-shade" onClick={handleClick}>
        <div className="Overlay-panel">{props.children}</div>
      </div>
    </Transition>
  )
}
