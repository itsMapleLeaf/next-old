import * as React from 'react'
import { getAvatarURL } from '../lib/f-list'
import { InputEvent, preventDefault } from '../lib/react-utils'

const avatarStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
}

export default class CharacterSelect extends React.Component {
  props: {
    characters: string[]
    onSubmit: (character: string) => any
  }

  state = {
    current: '',
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.current)
  }

  handleChange = (event: InputEvent) => {
    const { value } = event.currentTarget
    this.setState({ current: value })
    localStorage.setItem('lastCharacter', value)
  }

  componentDidMount() {
    this.setState({ current: localStorage.getItem('lastCharacter') || this.props.characters[0] })
  }

  render(): JSX.Element {
    const { current } = this.state
    return (
      <form onSubmit={preventDefault(this.handleSubmit)}>
        <fieldset>
          <img src={getAvatarURL(current)} alt={`Avatar for ` + current} style={avatarStyle} />
        </fieldset>
        <fieldset>
          <select className="input" value={current} onChange={this.handleChange}>
            {this.props.characters.map(name =>
              <option key={name}>
                {name}
              </option>
            )}
          </select>
        </fieldset>
        <fieldset>
          <button className="button" action="submit">
            Confirm
          </button>
        </fieldset>
      </form>
    )
  }
}
