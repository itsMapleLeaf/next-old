import { action } from 'mobx'
import { inject, observer, Observer } from 'mobx-react'
import * as React from 'react'
import styled from 'react-emotion'
import { ChannelBrowser } from 'src/channel-browser/components/ChannelBrowser'
import { ChannelTabContent } from 'src/channel/components/ChannelTabContent'
import { ChannelView } from 'src/channel/components/ChannelView'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { CharacterDetails } from 'src/character/components/CharacterDetails'
import { CharacterMenu } from 'src/character/components/CharacterMenu'
import { ChatTab } from 'src/chat/components/ChatTab'
import { ChatStore } from 'src/chat/stores/ChatStore'
import { ChatViewStore } from 'src/chat/stores/ChatViewStore'
import { Drawer } from 'src/common/components/Drawer'
import { FadeTransition } from 'src/common/components/FadeTransition'
import { Navigator, NavigatorRenderProps } from 'src/common/components/Navigator'
import { Overlay } from 'src/common/components/Overlay/Overlay'
import { ShowOnDesktop } from 'src/common/components/responsive-utils'
import { PrivateChatTabContent } from 'src/private-chat/components/PrivateChatTabContent'
import { PrivateChatView } from 'src/private-chat/components/PrivateChatView'
import { PrivateChatStore } from 'src/private-chat/stores/PrivateChatStore'
import { CharacterBrowser } from './CharacterBrowser'
import { ChatHeader } from './ChatHeader'
import { ChatNavActions } from './ChatNavActions'
import { StatusMenu } from './StatusMenu'

type NavRoute = { type: 'channel'; id: string } | { type: 'private-chat'; partner: string }

const ChannelBrowserWrapper = styled('div')`
  width: 400px;
  height: 600px;

  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
`

type ChatProps = {
  channelStore?: ChannelStore
  privateChatStore?: PrivateChatStore
  chatStore?: ChatStore
  chatViewStore?: ChatViewStore
}

@inject('chatStore', 'chatViewStore', 'channelStore', 'privateChatStore')
@observer
export class ChatView extends React.Component<ChatProps> {
  viewStore = this.props.chatViewStore!

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

  renderChannelBrowser() {
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

  renderStatusMenu() {
    const { statusMenu } = this.viewStore
    return (
      <FadeTransition visible={statusMenu.isOpen}>
        <Overlay onShadeClick={statusMenu.hide}>
          <StatusMenu />
        </Overlay>
      </FadeTransition>
    )
  }

  renderFriendBrowser() {
    const { friendBrowser } = this.viewStore
    return (
      <FadeTransition visible={friendBrowser.isOpen}>
        <Overlay onShadeClick={friendBrowser.hide}>
          <CharacterBrowser />
        </Overlay>
      </FadeTransition>
    )
  }

  renderCharacterMenu() {
    const { open, ...props } = this.viewStore.characterMenu
    return (
      <FadeTransition visible={open}>
        <CharacterMenu {...props} />
      </FadeTransition>
    )
  }

  renderChannelTabs({ route, bindRoute }: NavigatorRenderProps<NavRoute>) {
    return this.props.channelStore!.getJoinedChannels().map(ch => {
      const isActive = route.type === 'channel' && route.id === ch.id
      const handleActivate = bindRoute({ type: 'channel', id: ch.id })
      return (
        <ChatTab key={ch.id} active={isActive} onActivate={handleActivate}>
          <ChannelTabContent title={ch.title} type="public" />
        </ChatTab>
      )
    })
  }

  renderPrivateChatTabs({ route, bindRoute }: NavigatorRenderProps<NavRoute>) {
    return this.props.privateChatStore!.getOpenPrivateChats().map(chat => {
      const isActive = route.type === 'private-chat' && route.partner === chat.partner
      const handleActivate = bindRoute({ type: 'private-chat', partner: chat.partner })
      return (
        <ChatTab key={chat.partner} active={isActive} onActivate={handleActivate}>
          <PrivateChatTabContent partner={chat.partner} />
        </ChatTab>
      )
    })
  }

  renderNavRoute(route: NavRoute) {
    if (route.type === 'channel') {
      return <ChannelView id={route.id} />
    }
    if (route.type === 'private-chat') {
      return <PrivateChatView partner={route.partner} />
    }
    return (
      <ChatHeader>
        <h3>next</h3>
      </ChatHeader>
    )
  }

  renderNavContent = (navProps: NavigatorRenderProps<NavRoute>) => {
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
            <h2 className="padding faded">Channels</h2>
            {this.renderChannelTabs(navProps)}

            <h2 className="padding faded">Private Chats</h2>
            {this.renderPrivateChatTabs(navProps)}
          </div>
        </div>
      </nav>
    )
  }

  renderNavSidebar = (navProps: NavigatorRenderProps<NavRoute>) => {
    return (
      <ShowOnDesktop className="flex-row">
        {this.renderNavContent(navProps)}
        <div className="divider-h" />
      </ShowOnDesktop>
    )
  }

  renderNavDrawer = (navProps: NavigatorRenderProps<NavRoute>) => {
    const { navDrawer } = this.props.chatViewStore!
    return (
      <Drawer side="left" visible={navDrawer.isOpen} onShadeClicked={navDrawer.hide}>
        {this.renderNavContent(navProps)}
      </Drawer>
    )
  }

  renderNavigatorView = (navProps: NavigatorRenderProps<NavRoute>) => (
    <Observer>
      {() => (
        <main
          className="bg-color-darken-3 fullscreen flex-row"
          onClick={this.handleClick}
          onContextMenu={this.handleContextMenu}
        >
          {this.renderNavSidebar(navProps)}

          <section className="flex-grow flex-column">{this.renderNavRoute(navProps.route)}</section>

          {this.renderNavDrawer(navProps)}

          {this.renderChannelBrowser()}
          {this.renderStatusMenu()}
          {this.renderFriendBrowser()}

          {this.renderCharacterMenu()}
        </main>
      )}
    </Observer>
  )

  render() {
    return <Navigator initialRoute={{}} render={this.renderNavigatorView} />
  }
}
