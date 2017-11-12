import { action } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'react-emotion'
import { getProfileURL } from 'src/api'
import { Icon } from 'src/app/components/Icon'
import { CharacterDetails } from 'src/character/components/CharacterDetails'
import { ignore, unignore } from 'src/chat/actions'
import { ChatStore } from 'src/chat/stores/ChatStore'
import { openPrivateChat } from 'src/private-chat/actions'

type CharacterMenuProps = {
  x: number
  y: number
  character: string
  chatStore?: ChatStore
}

const MenuWrapper = styled('div')`
  width: 200px;
  position: fixed;
  box-shadow: 0px 0px 8px black;
`

const MenuAction = styled('a')`
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`

@inject('chatStore')
@observer
export class CharacterMenu extends React.Component<CharacterMenuProps> {
  updatePosition() {
    const el = ReactDOM.findDOMNode(this) as HTMLElement
    const rect = el.getBoundingClientRect()
    const { x, y } = this.props
    const right = x + rect.width
    const bottom = y + rect.height

    el.style.left = x - Math.max(right - (window.innerWidth - 16), 0) + 'px'
    el.style.top = y - Math.max(bottom - (window.innerHeight - 16), 0) + 'px'
  }

  componentDidMount() {
    this.updatePosition()
  }

  componentDidUpdate() {
    this.updatePosition()
  }

  @action.bound
  handleMessageAction() {
    openPrivateChat(this.props.character)
  }

  renderIgnoreAction() {
    const { character } = this.props
    const chatStore = this.props.chatStore!
    const isIgnored = chatStore.ignored.has(character)

    const icon = isIgnored ? 'remove-circle' : 'remove-circle-outline'
    const text = isIgnored ? 'Unignore' : 'ignore'
    const handleClick = isIgnored ? unignore : ignore

    return (
      <MenuAction className="padding" href="#" onClick={handleClick.bind(null, character)}>
        <Icon name={icon} key="ignore-action" /> {text}
      </MenuAction>
    )
  }

  render() {
    const { character } = this.props
    const profileURL = getProfileURL(character)
    return (
      <MenuWrapper className="bg-color-darken-1 flex-column">
        <div className="bg-color-main">
          <CharacterDetails name={character} />
        </div>
        <MenuAction className="padding" href="#" onClick={this.handleMessageAction}>
          <Icon name="message" /> Send Message
        </MenuAction>
        <MenuAction className="padding" href={profileURL} target="_blank">
          <Icon name="link" /> Open Profile
        </MenuAction>
        {this.renderIgnoreAction()}
      </MenuWrapper>
    )
  }
}
