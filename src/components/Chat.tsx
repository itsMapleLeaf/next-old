import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import Store from '../store'
import ChannelView from './ChannelView'
import ChatTab from './ChatTab'

@observer
export default class Chat extends React.Component {
  props: {
    store: Store
  }

  store = this.props.store
  @observable tabIndex = 0

  render() {
    const channels = Array.from(this.store.chat.channels.values())

    const tabs = channels.map((ch, index) =>
      <ChatTab key={ch.id} active={index === this.tabIndex} onClick={() => (this.tabIndex = index)}>
        {ch.title}
      </ChatTab>
    )

    const currentChannel = channels[this.tabIndex]

    return (
      <div className="fullscreen flex-row">
        <div className="bg-2">
          {tabs}
        </div>
        <div className="flex-grow">
          {currentChannel && <ChannelView channel={currentChannel} />}
        </div>
      </div>
    )
  }
}
