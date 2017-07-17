import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { preventDefault } from '../lib/react-utils'

export type LoginSubmitCallback = (username: string, password: string) => any

@observer
export default class Login extends React.Component {
  props: {
    onSubmit: LoginSubmitCallback
  }

  @observable username = ''
  @observable password = ''

  handleSubmit = () => {
    this.props.onSubmit(this.username, this.password)
  }

  render() {
    return (
      <form onSubmit={preventDefault(this.handleSubmit)}>
        <fieldset>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={this.username}
            onInput={e => (this.username = e.currentTarget.value)}
          />
        </fieldset>
        <fieldset>
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={this.password}
            onInput={e => (this.password = e.currentTarget.value)}
          />
        </fieldset>
        <fieldset>
          <button className="button" formAction="submit">
            Submit
          </button>
        </fieldset>
      </form>
    )
  }
}
