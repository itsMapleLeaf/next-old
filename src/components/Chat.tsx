import { bind } from 'decko'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { preventDefault } from '../lib/react-utils'
import { ChatStore } from '../stores/chat'
import ChannelList from './ChannelList'
import Icon from './Icon'
import Overlay from './Overlay'

import './Chat.css'

function Action(props: { icon: string; action: () => any }) {
  return (
    <a className="chat-action" href="#" onMouseDown={preventDefault(props.action)}>
      <Icon>
        {props.icon}
      </Icon>
    </a>
  )
}

function ActionBar(props: { channelListAction: () => any }) {
  return (
    <div className="flex-column">
      <Action icon="forum" action={props.channelListAction} />
    </div>
  )
}

function TabBar(props: {
  tabs: Array<{ title: string }>
  current: number
  onTabClicked: (tabIndex: number) => any
}) {
  return (
    <div>
      {props.tabs.map((tab, i) => {
        const activeClass = props.current === i ? 'chat-tab--active' : ''
        const onMouseDown = preventDefault(() => props.onTabClicked(i))
        return (
          <a href="#" className={`chat-tab ${activeClass}`} key={i} onMouseDown={onMouseDown}>
            {tab.title}
          </a>
        )
      })}
    </div>
  )
}

@observer
export default class Chat extends React.Component {
  props: {
    store: ChatStore
  }

  @observable tabIndex = 0
  @observable channelListOpen = false

  @bind
  setTabIndex(index: number) {
    this.tabIndex = index
  }

  @bind
  openChannelList() {
    this.props.store.requestChannelList()
    this.channelListOpen = true
  }

  @bind
  closeChannelList() {
    this.channelListOpen = false
  }

  @bind
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
    const channels = this.props.store.channels.values()

    const tabs = Array.from(channels).map(ch => {
      return { title: ch.title }
    })

    return (
      <div className="bg-3 fullscreen flex-row">
        <ActionBar channelListAction={this.openChannelList} />
        <div className="bg-2">
          <TabBar tabs={tabs} current={this.tabIndex} onTabClicked={this.setTabIndex} />
        </div>
        {this.renderChatView()}
        {this.channelListOpen && this.renderChannelList()}
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
