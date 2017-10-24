import * as React from 'react'

export function ChatInput(props: JSX.IntrinsicElements['textarea']) {
  return (
    <textarea
      className="padding"
      placeholder="Say something..."
      style={{ resize: 'none' }}
      {...props}
    />
  )
}
