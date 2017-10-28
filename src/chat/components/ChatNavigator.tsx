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

type ChatMenuProps = {
  channelStore?: ChannelStore
  chatStore?: ChatStore
  chatViewStore?: ChatViewStore
  privateChatStore?: PrivateChatStore
  channelBrowserAction: () => void
  onChannelActivate: (channel: string) => void
}

@inject('channelStore', 'chatStore', 'chatViewStore', 'privateChatStore')
@observer
export class ChatNavigator extends React.Component<ChatMenuProps> {
  renderChannelTab = (channel: Channel) => {
    const route = this.props.chatViewStore!.route
    const isActive = route.type === 'channel' && route.id === channel.id

    const handleActivate = () => {
      this.props.onChannelActivate(channel.id)
    }

    const handleClose = () => {
      this.props.chatStore!.leaveChannel(channel.id)
    }

    return (
      <ChatTab active={isActive} key={channel.id} onActivate={handleActivate} onClose={handleClose}>
        <ChannelTabContent title={channel.title} type={'public'} />
      </ChatTab>
    )
  }

  renderPrivateChatTab = (chat: PrivateChat) => {
    const viewStore = this.props.chatViewStore!
    const { route } = viewStore
    const isActive = route.type === 'private-chat' && route.partner === chat.partner

    const handleActivate = () => {
      viewStore.setRoute({ type: 'private-chat', partner: chat.partner })
    }

    const handleClose = () => {
      this.props.privateChatStore!.closePrivateChat(chat.partner)
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
    const joinedChannels = this.props.channelStore!.getJoinedChannels()
    const sortedChannels = sortBy(joinedChannels, ch => ch.title.toLowerCase())
    const privateChats = this.props.privateChatStore!.getOpenPrivateChats()

    return (
      <div className="bg-color-main flex-row full-height" style={{ width: '240px' }}>
        <div className="bg-color-darken-2 flex-column">
          <section className="flex-grow flex-column">
            <ChatAction icon="forum" onClick={this.props.channelBrowserAction} />
            <ChatAction
              icon="account-circle"
              onClick={this.props.chatViewStore!.toggleStatusMenu}
            />
            <ChatAction icon="account-multiple" />
            <ChatAction icon="settings" />
          </section>

          <section className="flex-column">
            <ChatAction icon="exit" />
          </section>
        </div>

        <div className="flex-grow flex-column flex-align-stretch">
          <CharacterDetails name={this.props.chatStore!.identity} />

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
