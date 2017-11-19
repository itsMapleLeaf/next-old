import * as React from 'react'

type HTMLProps = JSX.IntrinsicElements['span'] & { children: string }

export function HTML({ children, ...props }: HTMLProps) {
  return <span {...props} dangerouslySetInnerHTML={{ __html: children }} />
}
