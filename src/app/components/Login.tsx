import { bind } from "decko"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { preventDefault } from "src/common/util/react"
import { StoredValue } from "src/common/util/storage"

type LoginProps = {
  onSubmit: (username: string, password: string) => void
  onAbout: () => void
  statusText: string
}

@observer
export class Login extends React.Component<LoginProps> {
  @observable username = ""
  @observable password = ""
  storedUsername = new StoredValue<string>("Login_username")

  @action
  setUsername(username: string) {
    this.username = username
  }

  @action
  setPassword(password: string) {
    this.password = password
  }

  @bind
  handleSubmit() {
    this.props.onSubmit(this.username, this.password)
  }

  @bind
  handleUsernameInput(event: React.UIEvent<HTMLInputElement>) {
    this.setUsername(event.currentTarget.value)
    this.storedUsername.save(this.username).catch(console.error)
  }

  @bind
  handlePasswordInput(event: React.UIEvent<HTMLInputElement>) {
    this.setPassword(event.currentTarget.value)
  }

  async componentDidMount() {
    const initialUsername = await this.storedUsername.restore()
    this.setUsername(initialUsername || "")
  }

  render() {
    return (
      <section className="text-center">
        <h1 className="margin">Hello, beautiful.</h1>
        <form onSubmit={preventDefault(this.handleSubmit)}>
          <fieldset>
            <input
              type="text"
              placeholder="Username"
              value={this.username}
              onInput={this.handleUsernameInput}
            />
          </fieldset>
          <fieldset>
            <input
              type="password"
              placeholder="Password"
              value={this.password}
              onInput={this.handlePasswordInput}
            />
          </fieldset>
          <fieldset>
            <button type="submit">Submit</button>
          </fieldset>
        </form>
        <p>{this.props.statusText}</p>
        <p>
          <a className="bbc-link" href="#" onClick={this.props.onAbout}>
            About
          </a>
        </p>
      </section>
    )
  }
}
