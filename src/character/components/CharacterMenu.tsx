import { action } from 'mobx'
import { inject } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { getProfileURL } from 'src/api'
import { Icon } from 'src/app/components/Icon'
import { CharacterDetails } from 'src/character/components/CharacterDetails'
import { ChatStore } from 'src/chat/stores/ChatStore'
import styled from 'styled-components'

type CharacterMenuProps = {
  x: number
  y: number
  character: string
  chatStore?: ChatStore
}

const MenuWrapper = styled.div`
  width: 200px;
  position: fixed;
  box-shadow: 0px 0px 8px black;
`

const MenuAction = styled.a`
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`

@inject('chatStore')
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
    this.props.chatStore!.openPrivateChat(this.props.character)
  }

  render() {
    const { character } = this.props
    return (
      <MenuWrapper className="bg-color-darken-1 flex-column">
        <div className="bg-color-main">
          <CharacterDetails name={character} />
        </div>
        <MenuAction className="padding" href="#" onClick={this.handleMessageAction}>
          <Icon name="message" /> Send Message
        </MenuAction>
        <MenuAction className="padding" href={getProfileURL(character)} target="_blank">
          <Icon name="link" /> Open Profile
        </MenuAction>
        <MenuAction className="padding" href="#">
          <Icon name="remove-circle" /> Ignore
        </MenuAction>
      </MenuWrapper>
    )
  }
}
