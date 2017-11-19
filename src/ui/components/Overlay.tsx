import * as React from 'react'
import styled from 'react-emotion'
import { fullscreen, scrollVertical } from 'src/common/styles/helpers'
import { onlyOnSelf } from 'src/common/util/react'

export const OverlayShade = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${fullscreen};
`

type OverlayPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: string
  height?: string
}

export const OverlayPanel = styled.div`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  width: ${(props: OverlayPanelProps) => props.width || 'auto'};
  height: ${(props: OverlayPanelProps) => props.height || 'auto'};

  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 20px);

  ${scrollVertical};
`

type OverlayProps = {
  children?: React.ReactNode
  panelProps?: OverlayPanelProps
  onShadeClick?: () => void
}

export function Overlay(props: OverlayProps) {
  return (
    <OverlayShade onClick={onlyOnSelf(props.onShadeClick)}>
      <OverlayPanel {...props.panelProps}>{props.children}</OverlayPanel>
    </OverlayShade>
  )
}
