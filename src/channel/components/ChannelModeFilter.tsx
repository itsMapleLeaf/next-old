import * as React from 'react'

type Props = { text: string; active: boolean } & JSX.IntrinsicElements['a']

export function ChannelModeFilter(props: Props) {
  const { text, active, children, ...anchorProps } = props
  return (
    <a href="#" className={`padding ${props.active ? '' : 'faded'}`} {...anchorProps}>
      {props.text}
    </a>
  )
}
