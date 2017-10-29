import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChatStore } from 'src/chat/stores/ChatStore'
import { ChatViewStore } from 'src/chat/stores/ChatViewStore'
import { preventDefault } from 'src/common/util/react'

type StatusMenuProps = {
  chatStore?: ChatStore
  chatViewStore?: ChatViewStore
}

@inject('chatStore', 'chatViewStore')
@observer
export class StatusMenu extends React.Component<StatusMenuProps> {
  @observable status = ''
  @observable statusMessage = ''

  @action.bound
  updateStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    this.status = event.currentTarget.value
  }

  @action.bound
  updateStatusMessage(event: React.UIEvent<HTMLTextAreaElement>) {
    this.statusMessage = event.currentTarget.value
  }

  @action.bound
  handleSubmit(event: React.FormEvent<any>) {
    this.props.chatStore!.updateStatus(this.status, this.statusMessage)
    this.props.chatViewStore!.statusMenu.hide()
  }

  componentDidMount() {
    const char = this.props.chatStore!.identityCharacter
    this.status = char.status
    this.statusMessage = char.statusMessage
  }

  render() {
    return (
      <div className="bg-color-main">
        <form onSubmit={preventDefault(this.handleSubmit)}>
          <fieldset>
            <h2 style={{ margin: 0 }}>{this.props.chatStore!.identity}</h2>
          </fieldset>
          <fieldset>
            <select value={this.status} onChange={this.updateStatus}>
              <option value="online">Online</option>
              <option value="looking">Looking</option>
              <option value="away">Away</option>
              <option value="busy">Busy</option>
              <option value="dnd">DND</option>
            </select>
          </fieldset>
          <fieldset>
            <textarea
              placeholder="Status message..."
              value={this.statusMessage}
              onInput={this.updateStatusMessage}
            />
          </fieldset>
          <fieldset>
            <button type="submit">Update</button>
          </fieldset>
        </form>
      </div>
    )
  }
}
