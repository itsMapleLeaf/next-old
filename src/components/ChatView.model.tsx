import { computed, observable } from 'mobx'
import * as React from 'react'
import publicIcon from '../assets/ic_public_white_48px.svg'
import Store from '../store'
import { Channel } from '../store/chat-state'
import ChannelView from './ChannelView'

interface Tab {
  title: React.ReactNode
  view: () => React.ReactNode
}

function renderChannelTab(channel: Channel): Tab {
  return {
    title: (
      <span>
        <img src={publicIcon} style={{ height: '1.25em' }} /> {channel.title}
      </span>
    ),
    view: () => <ChannelView channel={channel} />,
  }
}

export class ChatViewModel {
  @observable tabIndex = 0

  constructor(private store: Store) {}

  @computed
  get tabs(): Tab[] {
    const channels = Array.from(this.store.chat.channels.values())
    return channels.map(renderChannelTab)
  }

  @computed
  get currentTab(): Tab | void {
    return this.tabs[this.tabIndex]
  }

  @computed
  get currentView() {
    return this.currentTab ? this.currentTab.view() : <div />
  }
}
