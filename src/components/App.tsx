import { observer } from 'mobx-react'
import * as React from 'react'
import { AppStore, AppView } from '../app-store'
import CharacterSelect from './CharacterSelect'
import Chat from './Chat'
import Login from './Login'

@observer
export default class App extends React.Component {
  props: {
    store: AppStore
  }

  store = this.props.store

  handleLoginSubmit = async (account: string, password: string) => {
    this.store.setLoginStatus('')
    try {
      await this.store.fetchTicket(account, password)
      await this.store.fetchCharacters()
      this.store.setView(AppView.characterSelect)
      this.store.saveUserData()
    } catch (error) {
      this.store.setView(AppView.login)
      this.store.setLoginStatus(error.toString())
    }
  }

  handleCharacterSubmit = (identity: string) => {
    this.store.setIdentity(identity)
    this.store.setView(AppView.chat)
  }

  handleDisconnect = () => {
    this.store.init()
  }

  render() {
    switch (this.store.view) {
      case AppView.loading:
        return <div>Loading...</div>

      case AppView.login:
        return (
          <div className="fullscreen text-center flex-column flex-center">
            <h1>Hello, beautiful.</h1>
            <Login onSubmit={this.handleLoginSubmit} />
            <p>
              {this.store.loginStatus}
            </p>
          </div>
        )

      case AppView.characterSelect:
        return (
          <div className="fullscreen text-center flex-column flex-center">
            <h1>Choose your identity.</h1>
            <CharacterSelect
              characters={this.store.characters}
              onSubmit={this.handleCharacterSubmit}
            />
          </div>
        )
      case AppView.chat:
        return (
          <Chat
            account={this.store.account}
            ticket={this.store.ticket}
            identity={this.store.identity}
            onDisconnect={this.handleDisconnect}
          />
        )
    }
  }
}
