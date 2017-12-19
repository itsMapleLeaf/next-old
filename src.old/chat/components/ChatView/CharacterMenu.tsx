import { bind } from 'decko'
import * as React from 'react'
import { CharacterMenuContent } from 'src/chat/components/ChatView/CharacterMenuContent'
import { ContextMenu } from 'src/common/components/ContextMenu'

export class CharacterMenu extends React.Component {
  state = {
    x: 0,
    y: 0,
    visible: false,
    character: '',
  }

  componentDidMount() {
    window.addEventListener('contextmenu', this.handleContextMenu)
    window.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    window.removeEventListener('contextmenu', this.handleContextMenu)
    window.removeEventListener('click', this.handleClick)
  }

  render() {
    return (
      this.state.visible && (
        <ContextMenu x={this.state.x} y={this.state.y}>
          <CharacterMenuContent character={this.state.character} />
        </ContextMenu>
      )
    )
  }

  @bind
  private handleContextMenu(event: PointerEvent) {
    const { clientX, clientY } = event
    const clickedElements = document.elementsFromPoint(clientX, clientY)

    for (const el of clickedElements) {
      if (el instanceof HTMLElement && el.dataset.character) {
        this.setState({ character: el.dataset.character, x: clientX, y: clientY, visible: true })
        event.preventDefault()
      }
    }
  }

  @bind
  private handleClick() {
    this.setState({ visible: false })
  }
}
