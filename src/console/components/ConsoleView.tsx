import * as React from 'react'
import { ChatHeader } from 'src/chat/components/ChatHeader'
import { ChatInput } from 'src/chat/components/ChatInput'

export class ConsoleView extends React.Component {
  render() {
    return (
      <main className="flex-column fill-area">
        <ChatHeader>Console</ChatHeader>

        <div className="divider-v" />

        <div className="flex-grow bg-color-darken-1">messages</div>

        <div className="divider-v" />

        <div className="bg-color-main">
          <ChatInput />
        </div>
      </main>
    )
  }
}
