import sortBy from 'lodash/sortBy'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { AppStore } from 'src/app/stores/AppStore'
import { ChannelTabContent } from 'src/channel/components/ChannelTabContent'
import { Channel } from 'src/channel/models/Channel'
import { CharacterDetails } from 'src/character/components/CharacterDetails'
import { ChatAction } from 'src/chat/components/ChatAction'
import { ChatTab } from 'src/chat/components/ChatTab'

type ChatMenuProps = {
  appStore?: AppStore
  activeChannel: string
  onChannelActivate: (channel: string) => void
}

@inject('appStore')
@observer
export class ChatMenu extends React.Component<ChatMenuProps> {
  store = this.props.appStore!

  renderChannelTab(channel: Channel) {
    const handleActivate = () => this.props.onChannelActivate(channel.id)
    const isActive = channel.id === this.props.activeChannel

    return (
      <ChatTab active={isActive} key={channel.id} onActivate={handleActivate}>
        <ChannelTabContent title={channel.title} type={'public'} />
      </ChatTab>
    )
  }

  render() {
    const joinedChannels = this.store.chat.channels.getJoinedChannels()
    const sortedChannels = sortBy(joinedChannels, ch => ch.title.toLowerCase())

    return (
      <div className="bg-color-main flex-row full-height" style={{ width: '240px' }}>
        <div className="bg-color-darken-2 flex-column">
          <section className="flex-grow flex-column">
            <ChatAction icon="forum" />
            <ChatAction icon="account-circle" />
            <ChatAction icon="account-multiple" />
            <ChatAction icon="settings" />
          </section>

          <section className="flex-column">
            <ChatAction icon="exit" />
          </section>
        </div>

        <div className="flex-grow flex-column flex-align-stretch">
          <CharacterDetails name={this.store.chat.identity} />

          <div className="bg-color-darken-2 divider-v" />

          <div className="bg-color-darken-1 flex-grow flex-column scroll-v">
            <h3 className="margin faded">Channels</h3>
            {sortedChannels.map(ch => this.renderChannelTab(ch))}

            <h3 className="margin faded">Private Chats</h3>
            <div className="text-italic text-small padding faded">Not working yet :(</div>
          </div>
        </div>
      </div>
    )
  }
}
