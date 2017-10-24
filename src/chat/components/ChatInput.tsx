import * as React from 'react'

export function ChatInput(props: JSX.IntrinsicElements['div']) {
  const { className, ...divProps } = props
  return (
    <div className={`flex-row padding ${className}`} {...divProps}>
      <textarea
        className="flex-grow padding margin-right"
        placeholder="Say something..."
        style={{ resize: 'none' }}
      />
      <button style={{ width: '80px' }}>Send</button>
    </div>
  )
}
