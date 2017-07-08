import { computed, observable } from 'mobx'
import * as React from 'react'
import Store from '../store'
import ChannelView from './ChannelView'

interface Tab {
  title: React.ReactNode
  view: () => React.ReactNode
}

export class ChatViewModel {
  @observable tabIndex = 0

  constructor(private store: Store) {}

  @computed
  get tabs(): Tab[] {
    const channels = Array.from(this.store.chat.channels.values())
    return channels.map(ch => {
      return {
        title: ch.title,
        view: () => <ChannelView channel={ch} />,
      }
    })
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
