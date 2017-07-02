import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { bound } from '../lib/util'
import { Store } from '../stores'
import CharacterSelect from './CharacterSelect'
import Chat from './Chat'
import Login from './Login'

export enum AppView {
  loading,
  login,
  characterSelect,
  chat,
}

@observer
export default class App extends React.Component {
  props: {
    store: Store
  }

  @observable view = AppView.loading
  @observable loginStatus = ''

  @bound
  async handleLoginSubmit(account: string, password: string) {
    const { store } = this.props
    this.loginStatus = 'Logging in...'
    try {
      await store.user.fetchTicket(account, password)
      await store.user.fetchCharacters()
      store.user.saveUserData()
      this.view = AppView.characterSelect
    } catch (error) {
      this.view = AppView.login
      this.loginStatus = error.toString()
    }
  }

  @bound
  handleCharacterSubmit(identity: string) {
    const { store } = this.props
    store.chat.setIdentity(identity)
    store.chat.onDisconnect = () => this.init()
    store.chat.connect(store.user.account, store.user.ticket)
    this.view = AppView.chat
  }

  async init() {
    const { store } = this.props
    this.view = AppView.loading
    try {
      store.user.loadUserData()
      await store.user.fetchCharacters()
      this.view = AppView.characterSelect
    } catch (err) {
      this.view = AppView.login
    }
  }

  componentDidMount() {
    if (this.props.store.chat.socket == null) {
      this.init()
    } else {
      this.view = AppView.chat
    }
  }

  render() {
    const { store } = this.props

    switch (this.view) {
      case AppView.loading:
        return <div>Loading...</div>

      case AppView.login:
        return (
          <div className="fullscreen text-center flex-column flex-center">
            <h1>Hello, beautiful.</h1>
            <Login onSubmit={this.handleLoginSubmit} />
            <p>
              {this.loginStatus}
            </p>
          </div>
        )

      case AppView.characterSelect:
        return (
          <div className="fullscreen text-center flex-column flex-center">
            <h1>Choose your identity.</h1>
            <CharacterSelect
              characters={store.user.characters}
              onSubmit={this.handleCharacterSubmit}
            />
          </div>
        )

      case AppView.chat:
        return <Chat store={store.chat} />
    }
  }
}
