import * as React from 'react'
import Toggle from './Toggle'

export type LoginSubmitCallback = (username: string, password: string) => any

export default class Login extends React.Component {
  props: { status: string; onSubmit: LoginSubmitCallback }

  state = { username: '', password: '' }

  updateUsername = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      username: event.currentTarget.value,
    })
  }

  updatePassword = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      password: event.currentTarget.value,
    })
  }

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const { username, password } = this.state
    this.props.onSubmit(username, password)
  }

  render() {
    return (
      <div>
        <h2>Hello, beautiful.</h2>
        <form onSubmit={this.handleSubmit}>
          <fieldset className="form-icon-input">
            <i className="mdi mdi-account-circle" />
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onInput={this.updateUsername}
            />
          </fieldset>
          <fieldset className="form-icon-input">
            <i className="mdi mdi-lock" />
            <input
              type="password"
              placeholder="••••••••"
              value={this.state.password}
              onInput={this.updatePassword}
            />
          </fieldset>
          <fieldset>
            <Toggle value={false}>Remember</Toggle>
          </fieldset>
          <fieldset>
            <button className="form-button" formAction="submit">
              Go
            </button>
          </fieldset>
        </form>
        <p className="status" style={{ maxWidth: '16em' }}>
          {this.props.status}
        </p>
      </div>
    )
  }
}
