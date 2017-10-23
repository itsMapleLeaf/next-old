import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Loading } from 'src/app/components/Loading'
import { AppStore } from 'src/app/stores/AppStore'
import { Transition } from 'src/common/components/Transition'
import { CharacterSelect } from './CharacterSelect'
import { Login } from './Login'

type AppProps = {
  store?: AppStore
}

@inject('store')
@observer
export class App extends React.Component<AppProps> {
  @observable view = 'setup'
  @observable loginStatus = ''

  @action.bound
  async init() {
    try {
      const store = this.props.store!

      await store.auth.loadAuthData()
      await store.auth.fetchCharacters()

      this.view = 'characterSelect'
    } catch {
      this.view = 'login'
    }
  }

  @action.bound
  async handleLoginSubmit(username: string, password: string) {
    try {
      this.loginStatus = 'Logging in...'

      const store = this.props.store!
      await store.auth.fetchTicket(username, password)
      await store.auth.fetchCharacters()
      await store.auth.saveAuthData()

      this.loginStatus = ''
      this.view = 'characterSelect'
    } catch (error) {
      this.loginStatus = error.message || error.toString()
    }
  }

  @action.bound
  handleCharacterSubmit(character: string) {
    const store = this.props.store!
    const { account, ticket } = store.auth

    this.view = 'connecting'

    store.chat.connectToServer(
      account,
      ticket,
      character,
      this.handleConnect,
      this.handleDisconnect,
    )
  }

  @action.bound
  handleConnect() {
    this.view = 'chat'
  }

  @action.bound
  handleDisconnect() {
    this.init()
  }

  componentDidMount() {
    this.init()
  }

  renderCurrentView() {
    const store = this.props.store!

    switch (this.view) {
      case 'setup':
        return <Loading text="Setting things up..." />

      case 'login':
        return (
          <Transition name="fade">
            <Login statusText={this.loginStatus} onSubmit={this.handleLoginSubmit} />
          </Transition>
        )

      case 'characterSelect':
        return (
          <Transition name="fade">
            <CharacterSelect
              characters={store.auth.characters}
              onSubmit={this.handleCharacterSubmit}
            />
          </Transition>
        )

      case 'connecting':
        return <Loading text="Connecting..." />

      case 'chat':
        return <div>am chat</div>
    }

    return `View not found: ${this.view}`
  }

  render() {
    return (
      <main className="fullscreen flex-center bg-color-main text-color-main">
        {this.renderCurrentView()}
      </main>
    )
  }
}
