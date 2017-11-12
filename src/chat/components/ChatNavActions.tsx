import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { fetchChannelList } from 'src/channel-browser/actions'
import { disconnectFromServer } from 'src/chat/actions'
import { ChatAction } from 'src/chat/components/ChatAction'
import { Stores } from 'src/stores'

type InjectedProps = {
  onChannelBrowser: () => void
  onStatusMenu: () => void
  onFriendBrowser: () => void
  onExit: () => void
  onInfo: () => void
}

function storesToProps(stores: Stores): InjectedProps {
  const { chatViewStore, appStore } = stores
  return {
    onStatusMenu: chatViewStore.statusMenu.show,
    onFriendBrowser: chatViewStore.friendBrowser.show,

    onChannelBrowser() {
      chatViewStore.channelBrowser.show()
      fetchChannelList()
    },

    onExit() {
      disconnectFromServer()
    },

    onInfo() {
      appStore.appInfo.toggle()
    },
  }
}

@inject(storesToProps)
@observer
class ChatNavActionsComponent extends React.Component<InjectedProps> {
  render() {
    return (
      <div className="bg-color-darken-2 flex-column">
        <section className="flex-grow flex-column">
          <ChatAction icon="forum" onClick={this.props.onChannelBrowser} />
          <ChatAction icon="account-circle" onClick={this.props.onStatusMenu} />
          <ChatAction icon="account-multiple" onClick={this.props.onFriendBrowser} />
          <ChatAction icon="info" onClick={this.props.onInfo} />
          {/* <ChatAction icon="settings" /> */}
        </section>

        <section className="flex-column">
          <ChatAction icon="exit" onClick={this.props.onExit} />
        </section>
      </div>
    )
  }
}

export const ChatNavActions: React.ComponentClass = ChatNavActionsComponent
