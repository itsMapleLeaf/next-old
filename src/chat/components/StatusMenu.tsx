import { bind } from 'decko'
import { Formik, FormikProps } from 'formik'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { updateStatus } from 'src/chat/actions'
import { Stores } from 'src/stores'
import { Button, Select, TextArea } from 'src/ui/components'

type InjectedProps = {
  initialValues: FormValues
  onSubmit: (status: string, statusMessage: string) => void
}

function storesToProps(stores: Stores): InjectedProps {
  const { chatStore, chatViewStore } = stores
  const { status, statusMessage } = chatStore.identityCharacter
  return {
    initialValues: { status, statusMessage },
    onSubmit(status: string, statusMessage: string) {
      updateStatus(status, statusMessage)
      chatViewStore.statusMenu.hide()
    },
  }
}

type FormValues = {
  status: string
  statusMessage: string
}

@inject(storesToProps)
@observer
class StatusMenuComponent extends React.Component<InjectedProps> {
  render() {
    return (
      <div className="bg-color-main">
        <Formik
          initialValues={this.props.initialValues}
          render={this.renderForm}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }

  @bind
  private renderForm(props: FormikProps<FormValues>) {
    return (
      <form onSubmit={props.handleSubmit}>
        <fieldset>
          <h2 style={{ margin: 0 }}>Status Update</h2>
        </fieldset>
        <fieldset>
          <Select name="status" value={props.values.status} onChange={props.handleChange}>
            <option value="online">Online</option>
            <option value="looking">Looking</option>
            <option value="away">Away</option>
            <option value="busy">Busy</option>
            <option value="dnd">DND</option>
          </Select>
        </fieldset>
        <fieldset>
          <TextArea
            name="statusMessage"
            placeholder="Status message..."
            value={props.values.statusMessage}
            onInput={props.handleChange}
          />
        </fieldset>
        <fieldset>
          <Button type="submit">Update</Button>
        </fieldset>
      </form>
    )
  }

  @bind
  private handleSubmit(values: FormValues) {
    this.props.onSubmit(values.status, values.statusMessage)
  }
}

export const StatusMenu: React.ComponentClass<{}> = StatusMenuComponent
