import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { updateStatus } from 'src/chat/actions'
import { preventDefault } from 'src/common/util/react'
import { Stores } from 'src/stores'
import { Select, Button, TextArea } from 'src/ui/components'

type InjectedProps = {
  initialStatus: string
  initialStatusMessage: string
  onSubmit: (status: string, statusMessage: string) => void
}

function storesToProps(stores: Stores): InjectedProps {
  const { chatStore, chatViewStore } = stores
  const char = chatStore.identityCharacter
  return {
    initialStatus: char.status,
    initialStatusMessage: char.statusMessage,
    onSubmit(status: string, statusMessage: string) {
      updateStatus(status, statusMessage)
      chatViewStore.statusMenu.hide()
    },
  }
}

// TODO: rewrite with formik
@inject(storesToProps)
@observer
class StatusMenuComponent extends React.Component<InjectedProps> {
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
  handleSubmit() {
    this.props.onSubmit(this.status, this.statusMessage)
  }

  @action
  init() {
    this.status = this.props.initialStatus
    this.statusMessage = this.props.initialStatusMessage
  }

  componentDidMount() {
    this.init()
  }

  render() {
    return (
      <div className="bg-color-main">
        <form onSubmit={preventDefault(this.handleSubmit)}>
          <fieldset>
            <h2 style={{ margin: 0 }}>Status Update</h2>
          </fieldset>
          <fieldset>
            <Select value={this.status} onChange={this.updateStatus}>
              <option value="online">Online</option>
              <option value="looking">Looking</option>
              <option value="away">Away</option>
              <option value="busy">Busy</option>
              <option value="dnd">DND</option>
            </Select>
          </fieldset>
          <fieldset>
            <TextArea
              placeholder="Status message..."
              value={this.statusMessage}
              onInput={this.updateStatusMessage}
            />
          </fieldset>
          <fieldset>
            <Button type="submit">Update</Button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export const StatusMenu: React.ComponentClass<{}> = StatusMenuComponent
