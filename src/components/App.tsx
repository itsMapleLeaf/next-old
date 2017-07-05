import { bind } from 'decko'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import Store from '../store'
import CharacterSelect from './CharacterSelect'
import Login from './Login'

@observer
export default class App extends React.Component {
  props: {
    store: Store
  }

  store = this.props.store
  @observable view: () => JSX.Element = this.renderLoadingView
  @observable loginStatus = ''

  @bind
  async handleLoginSubmit(account: string, password: string) {
    this.loginStatus = 'Logging in...'
    try {
      await this.store.login(account, password)
      await this.store.fetchUserCharacters()
      this.store.saveUserData()
      this.view = this.renderCharacterSelect
    } catch (err) {
      this.loginStatus = err.toString()
    }
  }

  @bind
  handleCharacterSubmit(identity: string) {
    this.store.setIdentity(identity)
    this.store.connect()
    this.view = this.renderChat
  }

  @bind
  renderLoadingView() {
    return <div>Loading...</div>
  }

  @bind
  renderLogin() {
    return (
      <div className="fullscreen text-center flex-column flex-center">
        <h1>Hello, beautiful.</h1>
        <Login onSubmit={this.handleLoginSubmit} />
        <p>
          {this.loginStatus}
        </p>
      </div>
    )
  }

  @bind
  renderCharacterSelect() {
    return (
      <div className="fullscreen text-center flex-column flex-center">
        <h1>Choose your identity.</h1>
        <CharacterSelect
          characters={this.store.userCharacters}
          onSubmit={this.handleCharacterSubmit}
        />
      </div>
    )
  }

  @bind
  renderChat() {
    return <div>i am chat</div>
  }

  async init() {
    try {
      await this.store.loadUserData()
      await this.store.fetchUserCharacters()
      this.view = this.renderCharacterSelect
    } catch (err) {
      this.view = this.renderLogin
    }
  }

  componentDidMount() {
    if (this.store.isConnected) {
      this.view = this.renderChat
    } else {
      this.init()
    }
  }

  render() {
    return this.view()
  }
}
