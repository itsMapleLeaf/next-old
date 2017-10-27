import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChannelBrowser } from 'src/channel-browser/components/ChannelBrowser'
import { ChannelView } from 'src/channel/components/ChannelView'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { CharacterMenu } from 'src/character/components/CharacterMenu'
import { ChatStore } from 'src/chat/stores/ChatStore'
import { ChatViewStore } from 'src/chat/stores/ChatViewStore'
import { Drawer } from 'src/common/components/Drawer'
import { Overlay } from 'src/common/components/Overlay/Overlay'
import { ShowOnDesktop } from 'src/common/components/responsive-utils'
import { ChatHeader } from './ChatHeader'
import { ChatMenu } from './ChatMenu'

type ChatProps = {
  channelStore?: ChannelStore
  chatStore?: ChatStore
  chatViewStore?: ChatViewStore
}

@inject('chatStore', 'chatViewStore', 'channelStore')
@observer
export class ChatView extends React.Component<ChatProps> {
  viewStore = this.props.chatViewStore!

  @action.bound
  handleChannelActivate(channel: string) {
    this.viewStore.setRoute({ type: 'channel', id: channel })
    this.viewStore.isMenuOpen = false
  }

  @action.bound
  handleClick() {
    this.viewStore.closeCharacterMenu()
  }

  @action.bound
  handleContextMenu(event: React.MouseEvent<HTMLElement>) {
    const el = event.target
    if (el instanceof HTMLElement && el.dataset && el.dataset.character) {
      event.preventDefault()
      this.viewStore.openCharacterMenu(el.dataset.character!, event.clientX, event.clientY)
    }
  }

  renderMenu() {
    return (
      <ChatMenu
        channelBrowserAction={this.viewStore.toggleChannelBrowser}
        onChannelActivate={this.handleChannelActivate}
      />
    )
  }

  renderRoute() {
    const { route, toggleMenu } = this.viewStore
    if (route.type === 'channel') {
      return (
        <ChannelView channelID={route.id} onMenuClicked={toggleMenu} onMoreClicked={console.log} />
      )
    }
    return ''
  }

  renderSidebarMenu() {
    return (
      <ShowOnDesktop className="flex-row">
        {this.renderMenu()}
        <div className="divider-h" />
      </ShowOnDesktop>
    )
  }

  renderDrawerMenu() {
    return (
      <Drawer
        side="left"
        visible={this.viewStore.isMenuOpen}
        onShadeClicked={this.viewStore.toggleMenu}
      >
        {this.renderMenu()}
      </Drawer>
    )
  }

  renderChannelBrowserOverlay() {
    return (
      <Overlay
        visible={this.viewStore.isChannelBrowserOpen}
        onShadeClick={this.viewStore.toggleChannelBrowser}
      >
        <div className="bg-color-main" style={{ width: '320px', height: '600px' }}>
          <ChannelBrowser onDone={this.viewStore.toggleChannelBrowser} />
        </div>
      </Overlay>
    )
  }

  renderCharacterMenu() {
    const { open, ...props } = this.viewStore.characterMenu
    return open && <CharacterMenu {...props} />
  }

  render() {
    return (
      <main
        className="bg-color-darken-3 fullscreen flex-row"
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}
      >
        {this.renderSidebarMenu()}

        <section className="flex-grow flex-column">{this.renderRoute()}</section>

        {this.renderDrawerMenu()}

        {this.renderChannelBrowserOverlay()}

        {this.renderCharacterMenu()}
      </main>
    )
  }
}
