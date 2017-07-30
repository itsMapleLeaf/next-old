import * as React from 'react'
import { getAvatarURL } from '../lib/f-list'

const avatarStyle = {
  width: '100px',
  height: '100px',
}

export default class CharacterList extends React.Component {
  props: {
    characters: string[]
    onSubmit?: (character: string) => any
    onBack?: () => any
  }

  state = { selected: '' }

  updateSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selected: event.currentTarget.value,
    })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.selected)
    }
  }

  componentDidMount() {
    this.setState({
      selected: this.props.characters[0] || '',
    })
  }

  render() {
    const { characters } = this.props
    const { selected } = this.state

    return (
      <div>
        <h2>Select a Character</h2>
        <p>
          <img
            src={getAvatarURL(selected)}
            alt={`Avatar for ${selected}`}
            style={avatarStyle}
          />
        </p>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <select value={selected} onChange={this.updateSelected}>
              {characters.map(name =>
                <option key={name}>
                  {name}
                </option>,
              )}
            </select>
          </fieldset>
          <fieldset>
            <button className="form-button" formAction="submit">
              Enter
            </button>
          </fieldset>
        </form>
        <p>
          <a href="#" className="link">
            Back
          </a>
        </p>
      </div>
    )
  }
}
