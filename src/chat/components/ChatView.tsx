import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { AppStore } from 'src/app/stores/AppStore'
import { ChannelView } from 'src/channel/components/ChannelView'
import { Drawer } from 'src/common/components/Drawer'
import { ShowOnDesktop } from 'src/common/components/responsive-utils'
import { ChatHeader } from './ChatHeader'
import { ChatMenu } from './ChatMenu'

type ChatProps = {
  store?: AppStore
}

@inject('store')
@observer
export class ChatView extends React.Component<ChatProps> {
  store = this.props.store!

  @observable isMenuOpen = false
  @observable currentChannel = ''

  @action.bound
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  @action.bound
  handleChannelActivate(channel: string) {
    this.currentChannel = channel
    this.isMenuOpen = false
  }

  renderMenu() {
    return (
      <ChatMenu
        activeChannel={this.currentChannel}
        onChannelActivate={this.handleChannelActivate}
      />
    )
  }

  renderChannelView() {
    return (
      <ChannelView
        className="flex-grow"
        onMenuClicked={this.toggleMenu}
        onMoreClicked={console.log}
        channelID={this.currentChannel}
      />
    )
  }

  renderHeaderTitle() {
    if (this.currentChannel) {
      return this.store.chat.channels.getChannel(this.currentChannel).title
    }
    return 'next'
  }

  render() {
    return (
      <main className="bg-color-darken-3 fullscreen flex-row">
        <ShowOnDesktop className="flex-row">
          {this.renderMenu()}
          <div className="divider-h" />
        </ShowOnDesktop>

        <Drawer side="left" visible={this.isMenuOpen} onShadeClicked={this.toggleMenu}>
          {this.renderMenu()}
        </Drawer>

        <section className="flex-grow flex-column">
          <ChatHeader
            title={this.renderHeaderTitle()}
            onMenuClicked={this.toggleMenu}
            onMoreClicked={console.log}
          />
          {this.currentChannel && this.renderChannelView()}
        </section>
      </main>
    )
  }
}
