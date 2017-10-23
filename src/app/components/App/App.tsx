import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Loading } from 'src/app/components/Loading'
import { AppState, AppStore } from 'src/app/stores/AppStore'
import { CharacterSelect } from './CharacterSelect'
import { Login } from './Login'

type AppProps = {
  store?: AppStore
}

@inject('store')
@observer
export class App extends React.Component<AppProps> {
  @observable loginStatus = ''

  @action.bound
  async init() {
    const store = this.props.store!
    try {
      await store.auth.loadAuthData()
      await store.auth.fetchCharacters()
      store.setState(AppState.characterSelect)
    } catch {
      store.setState(AppState.login)
    }
  }

  @action.bound
  async handleLoginSubmit(username: string, password: string) {
    const store = this.props.store!

    try {
      this.loginStatus = 'Logging in...'

      await store.auth.fetchTicket(username, password)
      await store.auth.fetchCharacters()

      store.auth.saveAuthData().catch(console.error)
      store.setState(AppState.characterSelect)

      this.loginStatus = ''
    } catch (error) {
      this.loginStatus = error.message || error.toString()
    }
  }

  @action.bound
  handleCharacterSubmit(character: string) {
    const store = this.props.store!
    const { account, ticket } = store.auth

    store.setState(AppState.connecting)

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
    this.props.store!.setState(AppState.online)
  }

  @action.bound
  handleDisconnect() {
    this.init()
  }

  async componentDidMount() {
    await this.init()
  }

  renderCurrentView() {
    const store = this.props.store!

    switch (store.state) {
      case AppState.setup:
        return <Loading text="Setting things up..." />

      case AppState.login:
        return <Login statusText={this.loginStatus} onSubmit={this.handleLoginSubmit} />

      case AppState.characterSelect:
        return (
          <CharacterSelect
            characters={store.auth.characters}
            onSubmit={this.handleCharacterSubmit}
          />
        )

      case AppState.connecting:
        return <Loading text="Connecting..." />

      case AppState.online:
        return <div>am chat</div>
    }
  }

  render() {
    return (
      <main className="fullscreen flex-center bg-color-main text-color-main">
        {this.renderCurrentView()}
      </main>
    )
  }
}
