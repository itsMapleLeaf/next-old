import sortBy from 'lodash/sortBy'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChannelTabContent } from 'src/channel/components/ChannelTabContent'
import { Channel } from 'src/channel/models/Channel'
import { ChatTab } from 'src/chat/components/ChatTab'
import { ChatViewRoute } from 'src/chat/stores/ChatViewStore'
import { PrivateChatTabContent } from 'src/private-chat/components/PrivateChatTabContent'
import { PrivateChat } from 'src/private-chat/models/PrivateChat'
import { Stores } from 'src/stores'

type InjectedProps = {
  currentRoute: ChatViewRoute
  joinedChannels: Channel[]
  privateChats: PrivateChat[]
  onChannelActivate: (id: string) => void
  onChannelClose: (id: string) => void
  onPrivateChatActivate: (partner: string) => void
  onPrivateChatClose: (partner: string) => void
}

function storesToProps(stores: Stores): InjectedProps {
  const { chatStore, chatViewStore, channelStore, privateChatStore } = stores
  return {
    currentRoute: chatViewStore.route,
    joinedChannels: channelStore.getJoinedChannels(),

    privateChats: privateChatStore
      .getOpenPrivateChats()
      .filter(chat => !chatStore.isIgnored(chat.partner)),

    onChannelActivate(id) {
      chatViewStore.setRoute({ type: 'channel', id })
      chatViewStore.navigator.hide()
    },

    onChannelClose(id) {
      chatStore.leaveChannel(id)
    },

    onPrivateChatActivate(partner) {
      chatViewStore.setRoute({ type: 'private-chat', partner: partner })
      chatViewStore.navigator.hide()
    },

    onPrivateChatClose(partner) {
      privateChatStore.closePrivateChat(partner)
    },
  }
}

@inject(storesToProps)
@observer
class Component extends React.Component<InjectedProps> {
  renderChannelTab = (channel: Channel) => {
    const route = this.props.currentRoute
    const isActive = route.type === 'channel' && route.id === channel.id

    const handleActivate = () => {
      this.props.onChannelActivate(channel.id)
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

  renderPrivateChatTab = (chat: PrivateChat) => {
    const route = this.props.currentRoute
    const isActive = route.type === 'private-chat' && route.partner === chat.partner

    const handleActivate = () => {
      this.props.onPrivateChatActivate(chat.partner)
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

  render() {
    const { joinedChannels, privateChats } = this.props
    const sortedChannels = sortBy(joinedChannels, ch => ch.title.toLowerCase())

    return (
      <div className="bg-color-darken-1 flex-grow flex-column scroll-v">
        <h3 className="margin faded">Channels</h3>
        {sortedChannels.map(this.renderChannelTab)}

        <h3 className="margin faded">Private Chats</h3>
        {privateChats.map(this.renderPrivateChatTab)}
      </div>
    )
  }
}

export const ChatNavigatorTabs: React.ComponentClass<{}> = Component
