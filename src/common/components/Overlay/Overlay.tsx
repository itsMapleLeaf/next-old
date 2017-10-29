import * as React from 'react'
import { preventDefault } from 'src/common/util/react'
import './Overlay.scss'

type OverlayProps = {
  children?: React.ReactNode
  onShadeClick?: () => void
}

export function Overlay(props: OverlayProps) {
  const handleClick = preventDefault((event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.target
    if (el instanceof HTMLDivElement && el.classList.contains('Overlay-shade')) {
      if (props.onShadeClick) props.onShadeClick()
    }
  })

  return (
    <div className="Overlay-shade" onClick={handleClick}>
      <div className="Overlay-panel">{props.children}</div>
    </div>
  )
}
