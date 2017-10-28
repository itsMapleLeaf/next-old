import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { CharacterDetails } from 'src/character/components/CharacterDetails'
import { ChatAction } from 'src/chat/components/ChatAction'
import { Stores } from 'src/stores'
import { ChatNavigatorTabs } from './ChatNavigatorTabs'

type ChatNavigatorProps = {
  identity: string
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
    identity: chatStore.identity,
    onChannelBrowser: chatViewStore.toggleChannelBrowser,
    onStatusMenu: chatViewStore.toggleStatusMenu,
  }
}

@inject(storesToProps)
@observer
class ChatNavigatorComponent extends React.Component<ChatNavigatorProps> {
  render() {
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

          <ChatNavigatorTabs />
        </div>
      </div>
    )
  }
}

export const ChatNavigator: React.ComponentClass = ChatNavigatorComponent
