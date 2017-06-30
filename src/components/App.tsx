import { observer } from 'mobx-react'
import * as React from 'react'
import AppStore, { AppView } from '../app-store'
import CharacterSelect from './CharacterSelect'
import Chat from './Chat'
import Login from './Login'

@observer
export default class App extends React.Component {
  props: {
    store: AppStore
  }

  handleLoginSubmit = async (account: string, password: string) => {
    const { store } = this.props
    store.setLoginStatus('')
    try {
      await store.fetchTicket(account, password)
      await store.fetchCharacters()
      store.setView(AppView.characterSelect)
      store.saveUserData()
    } catch (error) {
      store.setView(AppView.login)
      store.setLoginStatus(error.toString())
    }
  }

  handleCharacterSubmit = (identity: string) => {
    const { store } = this.props
    store.setIdentity(identity)
    store.setView(AppView.chat)
  }

  handleDisconnect = () => {
    this.props.store.init()
  }

  render() {
    const { store } = this.props
    switch (store.view) {
      case AppView.loading:
        return <div>Loading...</div>

      case AppView.login:
        return (
          <div className="fullscreen text-center flex-column flex-center">
            <h1>Hello, beautiful.</h1>
            <Login onSubmit={this.handleLoginSubmit} />
            <p>
              {store.loginStatus}
            </p>
          </div>
        )

      case AppView.characterSelect:
        return (
          <div className="fullscreen text-center flex-column flex-center">
            <h1>Choose your identity.</h1>
            <CharacterSelect characters={store.characters} onSubmit={this.handleCharacterSubmit} />
          </div>
        )
      case AppView.chat:
        return (
          <Chat
            account={store.account}
            ticket={store.ticket}
            store={store.chat}
            onDisconnect={this.handleDisconnect}
          />
        )
    }
  }
}
