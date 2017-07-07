import { computed, observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import Store from '../store'
import ChannelView from './ChannelView'
import ChatTab from './ChatTab'

interface Tab {
  title: React.ReactNode
  view: () => React.ReactNode
}

@observer
export default class Chat extends React.Component {
  props: {
    store: Store
  }

  store = this.props.store

  @observable tabIndex = 0

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

  render() {
    const tabs = this.tabs.map((tab, index) =>
      <ChatTab key={index} active={index === this.tabIndex} onClick={() => (this.tabIndex = index)}>
        {tab.title}
      </ChatTab>
    )

    const currentTab = this.tabs[this.tabIndex]

    return (
      <div className="fullscreen flex-row">
        <div className="bg-2">
          {tabs}
        </div>
        <div className="flex-grow">
          {currentTab && currentTab.view()}
        </div>
      </div>
    )
  }
}
