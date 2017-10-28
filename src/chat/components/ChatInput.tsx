import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'

type ChatInputProps = JSX.IntrinsicElements['div'] & {
  onMessage?: (message: string) => void
}

@observer
export class ChatInput extends React.Component<ChatInputProps> {
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
      if (message.length > 0 && this.props.onMessage) {
        this.props.onMessage(message)
      }

      this.message = ''
    }
  }

  render() {
    const { className, ...divProps } = this.props
    return (
      <div className={`flex-row padding ${className}`} {...divProps}>
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
