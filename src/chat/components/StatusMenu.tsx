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
  @observable
  fields = {
    status: '',
    statusMessage: '',
  }

  @action updateStatus = this.linkField('status')
  @action updateStatusMessage = this.linkField('statusMessage')

  linkField(field: keyof StatusMenu['fields']) {
    return (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      this.fields[field] = event.currentTarget.value
    }
  }

  @action.bound
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.props.chatStore!.updateStatus(this.fields.status, this.fields.statusMessage)
    this.props.chatViewStore!.toggleStatusMenu()
  }

  componentDidMount() {
    const char = this.props.chatStore!.identityCharacter
    this.fields.status = char.status
    this.fields.statusMessage = char.statusMessage
  }

  render() {
    return (
      <div className="bg-color-main">
        <form onSubmit={preventDefault(this.handleSubmit)}>
          <fieldset>
            <h2 style={{ margin: 0 }}>{this.props.chatStore!.identity}</h2>
          </fieldset>
          <fieldset>
            <select value={this.fields.status} onInput={this.updateStatus}>
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
              value={this.fields.statusMessage}
              onInput={this.updateStatusMessage}
            />
          </fieldset>
          <fieldset>
            <button>Update</button>
          </fieldset>
        </form>
      </div>
    )
  }
}
