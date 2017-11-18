import { bind } from 'decko'
import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { AppState } from 'src/app/stores/AppStore'
import { fetchCharacters, fetchTicket, saveAuthData } from 'src/auth/actions'
import { connectToServer } from 'src/chat/actions/socketActions'
import { ChatView } from 'src/chat/components/ChatView'
import { Stores } from 'src/stores'
import { OverlayViewModel } from 'src/ui/models/OverlayViewModel'
import { init } from '../actions'
import { AppInfo } from './AppInfo'
import { CharacterSelect } from './CharacterSelect'
import { Loading } from './Loading'
import { Login } from './Login'

type InjectedProps = {
  appState: AppState
  appInfoOverlay: OverlayViewModel
  userCharacters: string[]

  onLoginSubmit: (username: string, password: string) => Promise<void>
  onIdentitySubmit: (identity: string) => void
  onReturnToLogin: () => void
}

function storesToProps(stores: Stores): InjectedProps {
  const { appStore, authStore } = stores

  function handleConnect() {
    appStore.setState(AppState.online)
  }

  function handleDisconnect() {
    init().catch(console.error)
  }

  return {
    appState: appStore.state,
    appInfoOverlay: appStore.appInfo,
    userCharacters: authStore.characters,

    async onLoginSubmit(username, password) {
      await fetchTicket(username, password)
      await fetchCharacters()

      saveAuthData().catch(console.error)
      appStore.setState(AppState.characterSelect)
    },

    onIdentitySubmit(identity) {
      const { account, ticket } = authStore
      connectToServer(account, ticket, identity, handleConnect, handleDisconnect)
      appStore.setState(AppState.connecting)
    },

    onReturnToLogin() {
      appStore.setState(AppState.login)
    },
  }
}

@inject(storesToProps)
@observer
class AppComponent extends React.Component<InjectedProps> {
  @observable loginStatus = ''

  @action
  setLoginStatus(text: string) {
    this.loginStatus = text
  }

  @bind
  async handleLoginSubmit(username: string, password: string) {
    try {
      this.setLoginStatus('Logging in...')
      await this.props.onLoginSubmit(username, password)
      this.setLoginStatus('')
    } catch (err) {
      this.setLoginStatus(err.message || String(err))
      console.error(err.stack || String(err))
    }
  }

  renderCurrentView() {
    switch (this.props.appState) {
      case AppState.setup:
        return <Loading text="Setting things up..." />

      case AppState.login:
        return (
          <Login
            statusText={this.loginStatus}
            onSubmit={this.handleLoginSubmit}
            onAbout={this.props.appInfoOverlay.show}
          />
        )

      case AppState.characterSelect:
        return (
          <CharacterSelect
            characters={this.props.userCharacters}
            onSubmit={this.props.onIdentitySubmit}
            onBack={this.props.onReturnToLogin}
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
      <main className="fullscreen flex-center">
        {this.renderCurrentView()}
        <AppInfo overlay={this.props.appInfoOverlay} />
      </main>
    )
  }
}

export const App: React.ComponentClass<{}> = AppComponent
