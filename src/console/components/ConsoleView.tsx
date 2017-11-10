import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChatHeader } from 'src/chat/components/ChatHeader'
import { ChatInput } from 'src/chat/components/ChatInput'
import { ConsoleMessage } from 'src/console/models/ConsoleMessage'
import { Stores } from 'src/stores'

type InjectedProps = {
  messages: ConsoleMessage[]
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

  private renderMessage = (message: ConsoleMessage, i: number) => (
    <div className="padding" key={i}>
      <div className="float-right text-small text-italic faded">
        [{message.time.toLocaleTimeString()}]
      </div>
      <span dangerouslySetInnerHTML={{ __html: message.text }} />
    </div>
  )
}

export const ConsoleView: React.ComponentClass<{}> = ConsoleViewComponent
