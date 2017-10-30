import { action } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'react-emotion'
import { ChannelBrowser } from 'src/channel-browser/components/ChannelBrowser'
import { CharacterDetails } from 'src/character/components/CharacterDetails'
import { CharacterMenu } from 'src/character/components/CharacterMenu'
import { ChatNavigationStore } from 'src/chat/stores/ChatNavigationStore'
import { ChatStore } from 'src/chat/stores/ChatStore'
import { ChatViewStore } from 'src/chat/stores/ChatViewStore'
import { Drawer } from 'src/common/components/Drawer'
import { FadeTransition } from 'src/common/components/FadeTransition'
import { Overlay } from 'src/common/components/Overlay/Overlay'
import { ShowOnDesktop } from 'src/common/components/responsive-utils'
import { CharacterBrowser } from './CharacterBrowser'
import { ChatNavActions } from './ChatNavActions'
import { ChatNavTabs } from './ChatNavTabs'
import { ChatViewRoute } from './ChatViewRoute'
import { StatusMenu } from './StatusMenu'

const ChannelBrowserWrapper = styled('div')`
  width: 400px;
  height: 600px;

  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
`

type ChatProps = {
  chatStore?: ChatStore
  chatViewStore?: ChatViewStore
  chatNavigationStore?: ChatNavigationStore
}

@inject('chatStore', 'chatViewStore', 'chatNavigationStore')
@observer
export class ChatView extends React.Component<ChatProps> {
  viewStore = this.props.chatViewStore!

  render() {
    return (
      <main
        className="bg-color-darken-3 fullscreen flex-row"
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}
      >
        {this.renderNavSidebar()}

        <section className="flex-grow flex-column">
          <ChatViewRoute route={this.props.chatNavigationStore!.currentRoute} />
        </section>

        {this.renderNavDrawer()}

        {this.renderChannelBrowser()}
        {this.renderStatusMenu()}
        {this.renderFriendBrowser()}

        {this.renderCharacterMenu()}
      </main>
    )
  }

  @action.bound
  private handleClick() {
    this.viewStore.closeCharacterMenu()
  }

  @action.bound
  private handleContextMenu(event: React.MouseEvent<HTMLElement>) {
    const el = event.target
    if (el instanceof HTMLElement && el.dataset && el.dataset.character) {
      event.preventDefault()
      this.viewStore.openCharacterMenu(el.dataset.character!, event.clientX, event.clientY)
    }
  }

  private renderChannelBrowser() {
    const { channelBrowser } = this.viewStore

    return (
      <FadeTransition visible={channelBrowser.isOpen}>
        <Overlay onShadeClick={channelBrowser.hide}>
          <ChannelBrowserWrapper className="bg-color-main">
            <ChannelBrowser onDone={channelBrowser.hide} />
          </ChannelBrowserWrapper>
        </Overlay>
      </FadeTransition>
    )
  }

  private renderStatusMenu() {
    const { statusMenu } = this.viewStore
    return (
      <FadeTransition visible={statusMenu.isOpen}>
        <Overlay onShadeClick={statusMenu.hide}>
          <StatusMenu />
        </Overlay>
      </FadeTransition>
    )
  }

  private renderFriendBrowser() {
    const { friendBrowser } = this.viewStore
    return (
      <FadeTransition visible={friendBrowser.isOpen}>
        <Overlay onShadeClick={friendBrowser.hide}>
          <CharacterBrowser />
        </Overlay>
      </FadeTransition>
    )
  }

  private renderCharacterMenu() {
    const { open, ...props } = this.viewStore.characterMenu
    return (
      <FadeTransition visible={open}>
        <CharacterMenu {...props} />
      </FadeTransition>
    )
  }

  private renderNavContent() {
    return (
      <nav className="flex-row full-height" style={{ width: '240px' }}>
        <ChatNavActions />

        <div className="divider-h" />

        <div className="flex-grow flex-column">
          <div className="bg-color-main">
            <CharacterDetails name={this.props.chatStore!.identity} />
          </div>

          <div className="divider-v" />

          <div className="bg-color-darken-1 flex-grow">
            <ChatNavTabs />
          </div>
        </div>
      </nav>
    )
  }

  private renderNavSidebar() {
    return (
      <ShowOnDesktop className="flex-row">
        {this.renderNavContent()}
        <div className="divider-h" />
      </ShowOnDesktop>
    )
  }

  private renderNavDrawer() {
    const { navDrawer } = this.props.chatViewStore!
    return (
      <Drawer side="left" visible={navDrawer.isOpen} onShadeClicked={navDrawer.hide}>
        {this.renderNavContent()}
      </Drawer>
    )
  }
}
