import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'react-emotion'

import { Button, TextArea } from '../../ui/components'
import { helpers } from '../../ui/styles'

const Container = styled.div`
  display: flex;
  ${helpers.spacedChildrenHorizontal()};
`

const Input = styled(TextArea)`
  flex-grow: 1;
  resize: none;
`

const SendButton = styled(Button)`
  width: 6rem;
`

type Props = {
  placeholder?: string
  onMessageSent?: (message: string) => void
}

@observer
export class ChatInput extends React.Component<Props> {
  @observable private text = ''

  render() {
    return (
      <Container>
        <Input
          value={this.text}
          onKeyDown={this.handleKeyDown}
          onInput={this.handleInput}
          placeholder={this.props.placeholder || 'Say something!'}
        />
        <SendButton onClick={this.handleSendClick}>Send</SendButton>
      </Container>
    )
  }

  @action.bound
  private handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey) {
      this.props.onMessageSent && this.props.onMessageSent(this.text)
      this.text = ''
      event.preventDefault()
    }
  }

  @action.bound
  private handleInput(event: React.UIEvent<HTMLTextAreaElement>) {
    this.text = event.currentTarget.value
  }

  @action.bound
  private handleSendClick() {
    this.props.onMessageSent && this.props.onMessageSent(this.text)
    this.text = ''
  }
}
