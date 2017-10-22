import * as React from 'react'

import { preventDefault } from '@/util/react'

type OverlayProps = {
  children: React.ReactNode
  onShadeClick?: () => void
}

export function Overlay(props: OverlayProps) {
  const handleClick = preventDefault(() => {
    if (props.onShadeClick) props.onShadeClick()
  })
  return (
    <div className="overlay-shade" onClick={handleClick}>
      <div className="overlay-panel">{props.children}</div>
    </div>
  )
}
