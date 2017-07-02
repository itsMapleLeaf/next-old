import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { preventDefault } from '../lib/react-utils'
import { bound } from '../lib/util'

@observer
export default class Login extends React.Component {
  props: {
    onSubmit: (username: string, password: string) => any
  }

  @observable username = ''
  @observable password = ''

  @bound
  handleSubmit() {
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
          <button className="button" action="submit">
            Submit
          </button>
        </fieldset>
      </form>
    )
  }
}
