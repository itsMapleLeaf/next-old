import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { sendChannelMessage } from 'src/channel/actions'
import { CommandInfo, parseChatCommand } from 'src/chat/util/chat-command'
import { sendPrivateMessage } from 'src/private-chat/actions'
import { Stores } from 'src/stores'

import { parseBBC } from '../util/bbc'

type InjectedProps = {
  onMessage: (message: string) => void
  onCommand: (command: CommandInfo) => void
}

function storesToProps(stores: Stores): InjectedProps {
  const { chatNavigationStore, consoleStore } = stores
  return {
    onMessage(message) {
      const route = chatNavigationStore.currentRoute

      if (route.type === 'channel') {
        sendChannelMessage(route.id, message)
      } else if (route.type === 'private-chat') {
        sendPrivateMessage(route.partner, message)
      }
    },
    onCommand(cmdinfo) {
      const route = chatNavigationStore.currentRoute

      switch (cmdinfo.command) {
        case 'preview': {
          if (route.type === 'console') {
            consoleStore.addMessage(`Preview: ${parseBBC(cmdinfo.paramString)}`)
          } else {
            console.log('not implemented')
          }
          break
        }
        default: {
          console.log('unknown command')
          break
        }
      }
    },
  }
}

@inject(storesToProps)
@observer
class ChatInputComponent extends React.Component<InjectedProps> {
  @observable message = ''

  @action.bound
  handleInput(event: React.UIEvent<HTMLTextAreaElement>) {
    this.message = event.currentTarget.value
  }

  @action.bound
  handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault()

      const message = this.message.trim()
      if (message.length > 0) {
        const command = parseChatCommand(message)
        if (command) {
          this.props.onCommand && this.props.onCommand(command)
        } else {
          this.props.onMessage && this.props.onMessage(message)
        }
      }

      this.message = ''
    }
  }

  render() {
    const { onMessage, onCommand, ...divProps } = this.props
    return (
      <div className="flex-row padding full-width" {...divProps}>
        <textarea
          className="flex-grow padding margin-right"
          placeholder="Say something..."
          style={{ resize: 'none' }}
          value={this.message}
          onInput={this.handleInput}
          onKeyDown={this.handleKeyDown}
        />
        <button style={{ width: '80px' }}>Send</button>
      </div>
    )
  }
}

export const ChatInput: React.ComponentClass<{}> = ChatInputComponent
