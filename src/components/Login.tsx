import * as React from 'react'
import { preventDefault, linkState } from '../lib/react-utils'
import Icon from './Icon'

export default class Login extends React.Component {
  props: {
    onSubmit: (username: string, password: string) => any
  }

  state = {
    username: '',
    password: '',
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.username, this.state.password)
  }

  render(): JSX.Element {
    return (
      <form onSubmit={preventDefault(this.handleSubmit)}>
        <fieldset>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onInput={linkState(this, 'username')}
          />
        </fieldset>
        <fieldset>
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onInput={linkState(this, 'password')}
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
