import * as React from 'react'
import * as flist from '../lib/f-list'
import Login from './Login'
import CharacterSelect from './CharacterSelect'

export default class App extends React.Component {
  state = {
    account: '',
    ticket: '',
    characters: [] as string[],
    identity: '',
    loginStatus: '',
    view: () => <div>Setting things up...</div>,
  }

  loginView = () => {
    return (
      <div className="fullscreen text-center flex-column flex-center">
        <h1>Hello, beautiful.</h1>
        <Login onSubmit={this.handleLoginSubmit} />
        <p>
          {this.state.loginStatus}
        </p>
      </div>
    )
  }

  characterSelectView = () => {
    return (
      <div className="fullscreen text-center flex-column flex-center">
        <h1>Choose your identity.</h1>
        <CharacterSelect characters={this.state.characters} onSubmit={this.handleCharacterSubmit} />
      </div>
    )
  }

  chatView = () => {
    return <div />
  }

  handleLoginSubmit = async (account: string, password: string) => {
    this.setState({ loginStatus: 'Logging in...' })
    try {
      const ticket = await flist.fetchTicket(account, password)
      const characters = await flist.fetchCharacters(account, ticket)
      this.setState({ account, ticket, characters, view: this.characterSelectView })
      localStorage.setItem('account', account)
      localStorage.setItem('ticket', ticket)
    } catch (err) {
      this.setState({ loginStatus: err.toString() })
    }
  }

  handleCharacterSubmit = (identity: string) => {
    this.setState({ identity, view: this.chatView })
  }

  async componentDidMount() {
    try {
      const account = localStorage.getItem('account') || ''
      const ticket = localStorage.getItem('ticket') || ''
      const characters = await flist.fetchCharacters(account, ticket)
      this.setState({ account, ticket, characters, view: this.characterSelectView })
    } catch (err) {
      this.setState({ view: this.loginView })
    }
  }

  render() {
    return this.state.view()
  }
}
