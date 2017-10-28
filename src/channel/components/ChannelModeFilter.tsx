import * as React from 'react'

type Props = JSX.IntrinsicElements['a'] & {
  text: string
  active: boolean
}

export function ChannelModeFilter(props: Props) {
  const { text, active, children, ...anchorProps } = props
  return (
    <a href="#" className={`padding ${props.active ? '' : 'faded'}`} {...anchorProps}>
      {props.text}
    </a>
  )
}
