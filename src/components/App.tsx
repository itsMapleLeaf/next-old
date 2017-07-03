import { bind } from 'decko'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import Store from '../store'
import CharacterSelect from './CharacterSelect'
import Login from './Login'

enum AppView {
  login,
  characterSelect,
}

@observer
export default class App extends React.Component {
  props: {
    store: Store
  }

  @observable view = AppView.login
  @observable loginStatus = ''

  @bind
  async handleLoginSubmit(account: string, password: string) {
    const { store } = this.props
    this.loginStatus = 'Logging in...'
    try {
      await store.login(account, password)
      await store.fetchUserCharacters()
      this.view = AppView.characterSelect
    } catch (err) {
      this.loginStatus = err.toString()
    }
  }

  render() {
    const { store } = this.props
    switch (this.view) {
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
            <CharacterSelect characters={store.userCharacters} onSubmit={console.log} />
          </div>
        )
    }
  }
}
