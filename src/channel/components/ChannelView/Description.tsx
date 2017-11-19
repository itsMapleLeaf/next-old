import * as React from 'react'
import { HTML } from 'src/common/components/HTML'

export function Description(props: { text: string }) {
  return <HTML className="preserve-ws block padding">{props.text}</HTML>
}
