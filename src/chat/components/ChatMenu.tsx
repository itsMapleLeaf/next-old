import * as React from 'react'
import sortBy from 'lodash/sortBy'
import { inject, observer } from 'mobx-react'
import { ChannelTabContent } from 'src/channel/components/ChannelTabContent'
import { Channel } from 'src/channel/models/Channel'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { CharacterDetails } from 'src/character/components/CharacterDetails'
import { ChatAction } from 'src/chat/components/ChatAction'
import { ChatTab } from 'src/chat/components/ChatTab'
import { ChatStore } from 'src/chat/stores/ChatStore'
import { ChatViewStore } from 'src/chat/stores/ChatViewStore'
import { PrivateChatStore } from 'src/private-chat/stores/PrivateChatStore'
import { PrivateChat } from 'src/private-chat/models/PrivateChat'
import { getAvatarURL } from 'src/api'

type ChatMenuProps = {
  channelStore?: ChannelStore
  chatStore?: ChatStore
  chatViewStore?: ChatViewStore
  privateChatStore?: PrivateChatStore
  channelBrowserAction: () => void
  onChannelActivate: (channel: string) => void
}

// TODO: rename to "ChatNavigator"
@inject('channelStore', 'chatStore', 'chatViewStore', 'privateChatStore')
@observer
export class ChatMenu extends React.Component<ChatMenuProps> {
  renderChannelTab = (channel: Channel) => {
    const route = this.props.chatViewStore!.route
    const isActive = route.type === 'channel' && route.id === channel.id

    const handleActivate = () => {
      this.props.onChannelActivate(channel.id)
    }

    return (
      <ChatTab active={isActive} key={channel.id} onActivate={handleActivate}>
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

    return (
      <ChatTab key={chat.partner} active={isActive} onActivate={handleActivate}>
        <div className="flex-row flex-align-center">
          <img
            src={getAvatarURL(chat.partner)}
            className="margin-right"
            style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
          />
          {chat.partner}
        </div>
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
            <ChatAction icon="account-circle" />
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
