import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { ChannelView } from 'src/channel/components/ChannelView'
import { Drawer } from 'src/common/components/Drawer'
import { ShowOnDesktop } from 'src/common/components/responsive-utils'
import { ChatMenu } from './ChatMenu'

type ChatProps = {}

@observer
export class ChatView extends React.Component<ChatProps> {
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
          {this.currentChannel && this.renderChannelView()}
        </section>
      </main>
    )
  }
}
