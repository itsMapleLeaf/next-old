import { bind } from 'decko'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { getAvatarURL } from '../lib/f-list'
import { InputEvent, preventDefault } from '../lib/react-utils'

const avatarStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
}

@observer
export default class CharacterSelect extends React.Component {
  props: {
    characters: string[]
    onSubmit: (character: string) => any
  }

  @observable current = ''

  @bind
  handleSubmit() {
    this.props.onSubmit(this.current)
  }

  @bind
  handleChange(event: InputEvent) {
    localStorage.setItem('lastCharacter', (this.current = event.currentTarget.value))
  }

  componentDidMount() {
    this.current = localStorage.getItem('lastCharacter') || this.props.characters[0]
  }

  render(): JSX.Element {
    const { current } = this
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
