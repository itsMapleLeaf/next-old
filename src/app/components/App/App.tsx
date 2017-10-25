import * as React from 'react'

import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import { Loading } from 'src/app/components/Loading'
import { AppState, AppStore } from 'src/app/stores/AppStore'
import { ChatView } from 'src/chat/components/ChatView'

import { CharacterSelect } from './CharacterSelect'
import { Login } from './Login'

type AppProps = {
  appStore?: AppStore
}

@inject('appStore')
@observer
export class App extends React.Component<AppProps> {
  store = this.props.appStore!
  @observable loginStatus = ''

  @action.bound
  async handleLoginSubmit(username: string, password: string) {
    try {
      this.loginStatus = 'Logging in...'

      await this.store.auth.fetchTicket(username, password)
      await this.store.auth.fetchCharacters()

      this.store.auth.saveAuthData().catch(console.error)
      this.store.setState(AppState.characterSelect)

      this.loginStatus = ''
    } catch (error) {
      this.loginStatus = error.message || error.toString()
    }
  }

  @action.bound
  handleCharacterSubmit(character: string) {
    const { account, ticket } = this.store.auth

    this.store.setState(AppState.connecting)

    this.store.chat.connectToServer(
      account,
      ticket,
      character,
      this.handleConnect,
      this.handleDisconnect,
    )
  }

  @action.bound
  handleConnect() {
    this.store.setState(AppState.online)
  }

  @action.bound
  handleDisconnect() {
    this.store.init()
  }

  renderCurrentView() {
    switch (this.store.state) {
      case AppState.setup:
        return <Loading text="Setting things up..." />

      case AppState.login:
        return <Login statusText={this.loginStatus} onSubmit={this.handleLoginSubmit} />

      case AppState.characterSelect:
        return (
          <CharacterSelect
            characters={this.store.auth.characters}
            onSubmit={this.handleCharacterSubmit}
          />
        )

      case AppState.connecting:
        return <Loading text="Connecting..." />

      case AppState.online:
        return <ChatView />
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
