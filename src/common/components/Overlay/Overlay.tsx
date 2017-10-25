import * as React from 'react'
import { preventDefault, stopPropagation } from 'src/common/util/react'
import './Overlay.scss'

type OverlayProps = {
  children?: React.ReactNode
  visible?: boolean
  onShadeClick?: () => void
}

export function Overlay(props: OverlayProps) {
  const handleClick = preventDefault(() => {
    if (props.onShadeClick) props.onShadeClick()
  })
  return (
    <div
      className="Overlay-shade"
      style={{ display: props.visible ? undefined : 'none' }}
      onClick={handleClick}
    >
      <div className="Overlay-panel" onClick={stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}
