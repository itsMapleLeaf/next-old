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

class ChatViewState {
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
  get currentTab() {
    return this.tabs[this.tabIndex]
  }
}

@observer
export default class ChatView extends React.Component {
  props: {
    store: Store
  }

  store = this.props.store
  viewState = new ChatViewState(this.store)

  render() {
    const { currentTab } = this.viewState

    return (
      <div className="fullscreen flex-row">
        <div className="bg-2">
          {this.renderTabs()}
        </div>
        <div className="flex-grow">
          {currentTab && currentTab.view()}
        </div>
      </div>
    )
  }

  renderTabs() {
    return this.viewState.tabs.map((tab, index) => {
      const active = index === this.viewState.tabIndex
      const onClick = () => (this.viewState.tabIndex = index)
      return (
        <ChatTab key={index} active={active} onClick={onClick}>
          {tab.title}
        </ChatTab>
      )
    })
  }
}
