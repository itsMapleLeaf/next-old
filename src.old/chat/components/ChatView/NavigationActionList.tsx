import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { fetchChannelList } from 'src/channel-browser/actions'
import { disconnectFromServer } from 'src/chat/actions'
import { Stores } from 'src/stores'
import { NavigationAction } from './NavigationAction'

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
class NavigationActionListComponent extends React.Component<InjectedProps> {
  render() {
    return (
      <div className="bg-color-darken-2 flex-column fill-area">
        <section className="flex-grow flex-column">
          <NavigationAction icon="forum" onClick={this.props.onChannelBrowser} />
          <NavigationAction icon="account-circle" onClick={this.props.onStatusMenu} />
          <NavigationAction icon="account-multiple" onClick={this.props.onFriendBrowser} />
          <NavigationAction icon="info" onClick={this.props.onInfo} />
          {/* <ChatAction icon="settings" /> */}
        </section>

        <section className="flex-column">
          <NavigationAction icon="exit" onClick={this.props.onExit} />
        </section>
      </div>
    )
  }
}

export const NavigationActionList: React.ComponentClass = NavigationActionListComponent
