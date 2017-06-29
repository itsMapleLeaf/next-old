import * as React from 'react'

export default function Icon(props: { children: string; size?: string }) {
  return (
    <i className="icon material-icons" style={{ fontSize: props.size || '1.2em' }}>
      {props.children}
    </i>
  )
}
