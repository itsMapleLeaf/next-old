// TODO: split this shit up
import sortBy from 'lodash/sortBy'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChannelTabContent } from 'src/channel/components/ChannelTabContent'
import { Channel } from 'src/channel/models/Channel'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { CharacterDetails } from 'src/character/components/CharacterDetails'
import { ChatAction } from 'src/chat/components/ChatAction'
import { ChatTab } from 'src/chat/components/ChatTab'
import { ChatStore } from 'src/chat/stores/ChatStore'
import { ChatViewStore } from 'src/chat/stores/ChatViewStore'
import { PrivateChatTabContent } from 'src/private-chat/components/PrivateChatTabContent'
import { PrivateChat } from 'src/private-chat/models/PrivateChat'
import { PrivateChatStore } from 'src/private-chat/stores/PrivateChatStore'
import { Stores } from 'src/stores'
import { ChatViewRoute } from '../stores/ChatViewStore'

type ChatNavigatorProps = {
  currentRoute: ChatViewRoute
  joinedChannels: Channel[]
  privateChats: PrivateChat[]
  identity: string
  onChannelActivate: (id: string) => void
  onChannelClose: (id: string) => void
  onPrivateChatActivate: (partner: string) => void
  onPrivateChatClose: (partner: string) => void
  onChannelBrowser: () => void
  onStatusMenu: () => void
}

function storesToProps({
  chatStore,
  chatViewStore,
  channelStore,
  privateChatStore,
}: Stores): ChatNavigatorProps {
  return {
    currentRoute: chatViewStore.route,
    joinedChannels: channelStore.getJoinedChannels(),
    privateChats: privateChatStore.getOpenPrivateChats(),
    identity: chatStore.identity,
    onChannelActivate(id) {
      chatViewStore.setRoute({ type: 'channel', id })
    },
    onChannelClose(id) {
      chatStore.leaveChannel(id)
    },
    onPrivateChatActivate(partner) {
      chatViewStore.setRoute({ type: 'private-chat', partner: partner })
    },
    onPrivateChatClose(partner) {
      privateChatStore.closePrivateChat(partner)
    },
    onChannelBrowser: chatViewStore.toggleChannelBrowser,
    onStatusMenu: chatViewStore.toggleStatusMenu,
  }
}

@inject(storesToProps)
@observer
class ChatNavigatorComponent extends React.Component<ChatNavigatorProps> {
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
      <div className="bg-color-main flex-row full-height" style={{ width: '240px' }}>
        <div className="bg-color-darken-2 flex-column">
          <section className="flex-grow flex-column">
            <ChatAction icon="forum" onClick={this.props.onChannelBrowser} />
            <ChatAction icon="account-circle" onClick={this.props.onStatusMenu} />
            <ChatAction icon="account-multiple" />
            <ChatAction icon="settings" />
          </section>

          <section className="flex-column">
            <ChatAction icon="exit" />
          </section>
        </div>

        <div className="flex-grow flex-column flex-align-stretch">
          <CharacterDetails name={this.props.identity} />

          <div className="bg-color-darken-2 divider-v" />

          <div className="bg-color-darken-1 flex-grow flex-column scroll-v">
            <h3 className="margin faded">Channels</h3>
            {sortedChannels.map(this.renderChannelTab)}

            <h3 className="margin faded">Private Chats</h3>
            {privateChats.map(this.renderPrivateChatTab)}
          </div>
        </div>
      </div>
    )
  }
}

export const ChatNavigator: React.ComponentClass = ChatNavigatorComponent
