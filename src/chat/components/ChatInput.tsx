import * as React from 'react'

export function ChatInput() {
  return (
    <textarea
      className="padding fill-area"
      rows={3}
      placeholder="Say something..."
      style={{ resize: 'none' }}
    />
  )
}
