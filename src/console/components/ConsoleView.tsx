import { MessageComponent } from '../../chat/components/ChatMessageView'
import { ChatMessage } from '../../chat/models/ChatMessage'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChatHeader } from 'src/chat/components/ChatHeader'
import { ChatInput } from 'src/chat/components/ChatInput'
import { Stores } from 'src/stores'

type InjectedProps = {
  messages: ChatMessage[]
}

function storesToProps({ consoleStore }: Stores): InjectedProps {
  return {
    messages: consoleStore.messages,
  }
}

@inject(storesToProps)
@observer
class ConsoleViewComponent extends React.Component<InjectedProps> {
  render() {
    return (
      <main className="flex-column fill-area">
        <ChatHeader>
          <h3>Console</h3>
        </ChatHeader>

        <div className="divider-v" />

        <div className="flex-grow bg-color-darken-1">
          {this.props.messages.map(this.renderMessage)}
        </div>

        <div className="divider-v" />

        <div className="bg-color-main">
          <ChatInput />
        </div>
      </main>
    )
  }

  private renderMessage = (message: ChatMessage, i: number) => (
    <MessageComponent key={i} message={message} />
  )
}

export const ConsoleView: React.ComponentClass<{}> = ConsoleViewComponent
