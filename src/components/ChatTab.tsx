import * as React from 'react'
import { preventDefault } from '../lib/react-utils'

const chatTabStyle: React.CSSProperties = {
  width: '12em',
  padding: '0.4em 0.6em',
  display: 'block',
}

export default function ChatTab(props: { children: any; active: boolean; onClick: () => any }) {
  const activeClass = props.active ? 'bg-1' : ''
  const onMouseDown = preventDefault(props.onClick)
  return (
    <a href="#" style={chatTabStyle} className={activeClass} onMouseDown={onMouseDown}>
      {props.children}
    </a>
  )
}
