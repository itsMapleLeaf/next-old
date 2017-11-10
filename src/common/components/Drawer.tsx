import * as React from 'react'
import styled from 'react-emotion'

type Props = {
  children?: React.ReactNode
  onShadeClicked?: () => void
  visible?: boolean
  side: 'left' | 'right'
}

const Shade = styled('div')`
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.3s;

  > .overlay-panel {
    transition: 0.3s;
  }

  &.overlay-hidden {
    opacity: 0;
    visibility: hidden;

    > .overlay-panel-left {
      transform: translateX(-100%);
    }

    > .overlay-panel-right {
      transform: translateX(100%);
    }
  }

  &.overlay-visible {
    opacity: 1;
    visibility: visible;

    > .overlay-panel {
      transform: translateX(0%);
    }
  }
`

const Panel = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;

  box-shadow: 0px 0px 8px black;

  &.overlay-panel-left {
    left: 0;
  }

  &.overlay-panel-right {
    right: 0;
  }
`

export function Drawer(props: Props) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.target
    if (el instanceof HTMLDivElement && el.classList.contains('overlay-shade')) {
      if (props.onShadeClicked) props.onShadeClicked()
    }
  }

  const visibleClass = props.visible ? 'overlay-visible' : 'overlay-hidden'
  const panelClass = 'overlay-panel overlay-panel-' + props.side

  return (
    <Shade className={`fullscreen overlay-shade ${visibleClass}`} onClick={handleClick}>
      <Panel className={`${panelClass} bg-color-main flex-row`}>{props.children}</Panel>
    </Shade>
  )
}
