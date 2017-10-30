import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChannelTabContent } from 'src/channel/components/ChannelTabContent'
import { ChatTab } from 'src/chat/components/ChatTab'
import { ChatRoute } from 'src/chat/stores/ChatViewStore'
import { PrivateChatTabContent } from 'src/private-chat/components/PrivateChatTabContent'
import { Stores } from 'src/stores'

type InjectedProps = {
  routes: ChatRoute[]
  currentRoute: ChatRoute
  onRouteSelected: (index: number) => void
  onChannelClose: (id: string) => void
  onPrivateChatClose: (partner: string) => void
}

function storesToProps(stores: Stores): InjectedProps {
  const { chatStore, chatViewStore } = stores
  const { router } = chatViewStore
  return {
    routes: router.routes,
    currentRoute: router.currentRoute,

    onRouteSelected(index) {
      router.setRouteIndex(index)
    },

    onChannelClose(id) {
      chatStore.leaveChannel(id)
    },

    onPrivateChatClose(partner) {
      chatStore.removePrivateChat(partner)
    },
  }
}

@inject(storesToProps)
@observer
class Component extends React.Component<InjectedProps> {
  render() {
    const { routes } = this.props

    return (
      <div className="bg-color-darken-1 flex-grow flex-column scroll-v">
        <h3 className="margin faded">Channels</h3>
        {routes.map(this.renderChannelTab)}

        <h3 className="margin faded">Private Chats</h3>
        {routes.map(this.renderPrivateChatTab)}
      </div>
    )
  }

  private renderChannelTab = (route: ChatRoute, index: number) => {
    if (route.type !== 'channel') return

    const channel = route.channel
    const currentRoute = this.props.currentRoute
    const isActive = currentRoute.type === 'channel' && currentRoute.channel === channel

    const handleActivate = () => {
      this.props.onRouteSelected(index)
    }

    const handleClose = () => {
      this.props.onChannelClose(channel.id)
    }

    return (
      <ChatTab active={isActive} key={channel.id} onActivate={handleActivate} onClose={handleClose}>
        <ChannelTabContent title={channel.title} type={'public'} />
      </ChatTab>
    )
  }

  private renderPrivateChatTab = (route: ChatRoute, index: number) => {
    if (route.type !== 'private-chat') return

    const chat = route.privateChat
    const currentRoute = this.props.currentRoute
    const isActive =
      currentRoute.type === 'private-chat' && currentRoute.privateChat.partner === chat.partner

    const handleActivate = () => {
      this.props.onRouteSelected(index)
    }

    const handleClose = () => {
      this.props.onPrivateChatClose(chat.partner)
    }

    return (
      <ChatTab
        key={chat.partner}
        active={isActive}
        onActivate={handleActivate}
        onClose={handleClose}
      >
        <PrivateChatTabContent partner={chat.partner} />
      </ChatTab>
    )
  }
}

export const ChatNavigatorTabs: React.ComponentClass<{}> = Component
