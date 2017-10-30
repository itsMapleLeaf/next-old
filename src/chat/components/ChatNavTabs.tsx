import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { ChannelTabContent } from 'src/channel/components/ChannelTabContent'
import { ChatTab } from 'src/chat/components/ChatTab'
import { ChatNavigationStore } from 'src/chat/stores/ChatNavigationStore'
import { PrivateChatTabContent } from 'src/private-chat/components/PrivateChatTabContent'
import { Stores } from 'src/stores'

type InjectedProps = {
  navigation: ChatNavigationStore
  onChannelClose: (id: string) => void
  onPrivateChatClose: (partner: string) => void
}

function storesToProps(stores: Stores): InjectedProps {
  return {
    navigation: stores.chatNavigationStore,

    onChannelClose(id) {
      stores.chatStore.leaveChannel(id)
    },

    onPrivateChatClose(partner) {
      stores.privateChatStore.closePrivateChat(partner)
    },
  }
}

@inject(storesToProps)
@observer
class ChatNavTabsComponent extends React.Component<InjectedProps> {
  renderChannelTabs() {
    const navigation = this.props.navigation
    const routes = navigation.channelRoutes
    const currentRoute = navigation.currentRoute

    return routes.map((route, index) => {
      const isActive = route === currentRoute
      const handleActivate = () => navigation.setRoute(route)
      const handleClose = () => this.props.onChannelClose(route.id)

      return (
        <ChatTab key={route.id} active={isActive} onActivate={handleActivate} onClose={handleClose}>
          <ChannelTabContent id={route.id} />
        </ChatTab>
      )
    })
  }

  renderPrivateChatTabs() {
    const navigation = this.props.navigation
    const currentRoute = navigation.currentRoute
    const routes = navigation.privateChatRoutes

    return routes.map((route, index) => {
      const isActive = route === currentRoute
      const handleActivate = () => navigation.setRoute(route)
      const handleClose = () => this.props.onPrivateChatClose(route.partner)

      return (
        <ChatTab
          key={route.partner}
          active={isActive}
          onActivate={handleActivate}
          onClose={handleClose}
        >
          <PrivateChatTabContent partner={route.partner} />
        </ChatTab>
      )
    })
  }

  renderConsoleTab() {
    const navigation = this.props.navigation
    const currentRoute = navigation.currentRoute
    const handleActivate = () => navigation.setRoute(navigation.consoleRoute)

    return (
      <ChatTab active={currentRoute === navigation.consoleRoute} onActivate={handleActivate}>
        <Icon name="code" className="margin-right" /> Console
      </ChatTab>
    )
  }

  render() {
    return (
      <div>
        {this.renderConsoleTab()}

        <h3 className="padding faded">Channels</h3>
        {this.renderChannelTabs()}

        <h3 className="padding faded">Private Chats</h3>
        {this.renderPrivateChatTabs()}
      </div>
    )
  }
}

export const ChatNavTabs: React.ComponentClass<{}> = ChatNavTabsComponent
