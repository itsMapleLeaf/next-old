import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { AppState, AppStore } from 'src/app/stores/AppStore'
import { AuthStore } from 'src/auth/stores/AuthStore'
import { ChatView } from 'src/chat/components/ChatView'
import { ChatStore } from 'src/chat/stores/ChatStore'

import { fetchCharacters, fetchTicket, saveAuthData } from '../../auth/actions'
import { connectToServer } from '../../chat/actions/socketActions'
import { init } from '../actions'
import { AppInfo } from './AppInfo'
import { CharacterSelect } from './CharacterSelect'
import { Loading } from './Loading'
import { Login } from './Login'

type AppProps = {
  appStore?: AppStore
  authStore?: AuthStore
  chatStore?: ChatStore
}

@inject('appStore', 'authStore', 'chatStore')
@observer
export class App extends React.Component<AppProps> {
  appStore = this.props.appStore!
  authStore = this.props.authStore!
  chatStore = this.props.chatStore!

  @observable loginStatus = ''

  @action.bound
  async handleLoginSubmit(username: string, password: string) {
    try {
      this.loginStatus = 'Logging in...'

      await fetchTicket(username, password)
      await fetchCharacters()

      saveAuthData().catch(console.error)
      this.appStore.setState(AppState.characterSelect)

      this.loginStatus = ''
    } catch (error) {
      this.loginStatus = error.message || error.toString()
    }
  }

  @action.bound
  handleCharacterSubmit(character: string) {
    const { account, ticket } = this.authStore

    this.appStore.setState(AppState.connecting)

    connectToServer(account, ticket, character, this.handleConnect, this.handleDisconnect)
  }

  @action.bound
  handleConnect() {
    this.appStore.setState(AppState.online)
  }

  @action.bound
  handleDisconnect() {
    init().catch(console.error)
  }

  @action.bound
  backToLogin() {
    this.appStore.setState(AppState.login)
  }

  renderCurrentView() {
    switch (this.appStore.state) {
      case AppState.setup:
        return <Loading text="Setting things up..." />

      case AppState.login:
        return (
          <Login
            statusText={this.loginStatus}
            onSubmit={this.handleLoginSubmit}
            onAbout={this.appStore.appInfo.show}
          />
        )

      case AppState.characterSelect:
        return (
          <CharacterSelect
            characters={this.authStore.characters}
            onSubmit={this.handleCharacterSubmit}
            onBack={this.backToLogin}
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
        <AppInfo overlay={this.appStore.appInfo} />
      </main>
    )
  }
}
