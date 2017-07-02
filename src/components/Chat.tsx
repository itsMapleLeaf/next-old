import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { preventDefault } from '../lib/react-utils'
import { ChatStore } from '../stores/chat'
import ChannelList from './ChannelList'
import Icon from './Icon'
import Overlay from './Overlay'

import { bound } from '../lib/util'
import './Chat.css'

function ChatAction(props: { icon: string; action: () => any }) {
  return (
    <a className="chat-action" href="#" onMouseDown={preventDefault(props.action)}>
      <Icon>
        {props.icon}
      </Icon>
    </a>
  )
}

@observer
export default class Chat extends React.Component {
  props: {
    store: ChatStore
  }

  @observable tabIndex = 0
  @observable channelListOpen = false

  @bound
  setTabIndex(index: number) {
    this.tabIndex = index
  }

  @bound
  openChannelList() {
    this.props.store.requestChannelList()
    this.channelListOpen = true
  }

  @bound
  closeChannelList() {
    this.channelListOpen = false
  }

  @bound
  handleChannelListInput(id: string) {
    const { store } = this.props
    if (store.isChannelJoined(id)) {
      store.leaveChannel(id)
    } else {
      store.joinChannel(id)
    }
  }

  componentDidMount() {
    // this.openChannelList()
  }

  render() {
    return (
      <div className="bg-3 fullscreen flex-row">
        {this.renderActionBar()}
        {this.renderTabBar()}
        {this.renderChatView()}
        {this.channelListOpen && this.renderChannelList()}
      </div>
    )
  }

  renderActionBar() {
    return (
      <div className="flex-column">
        <ChatAction icon="forum" action={this.openChannelList} />
      </div>
    )
  }

  renderTabBar() {
    const tabs = Array.from(this.props.store.channels.values()).map((ch, index) => {
      const activeClass = index === this.tabIndex ? 'chat-tab--active' : ''
      const onMouseDown = () => this.setTabIndex(index)
      return (
        <a href="#" className={`chat-tab ${activeClass}`} key={ch.id} onMouseDown={onMouseDown}>
          {ch.title}
        </a>
      )
    })
    return (
      <div className="bg-2">
        {tabs}
      </div>
    )
  }

  renderChatView() {
    return <div className="bg-1 flex-grow">chat</div>
  }

  renderChannelList() {
    return (
      <Overlay onShadeClick={this.closeChannelList}>
        <ChannelList
          channels={this.props.store.channelList}
          joinedChannels={this.props.store.channels}
          onClose={this.closeChannelList}
          onChannelInput={this.handleChannelListInput}
        />
      </Overlay>
    )
  }
}
