import sortBy = require('lodash/sortBy')
import debounce = require('lodash/debounce')
import { computed, observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { ChannelInfo } from '../chat-store'
import { preventDefault } from '../lib/react-utils'

const channelListStyle: React.CSSProperties = {
  height: 'calc(100vh - 10em)',
  width: 'calc(100vw - 4em)',
  maxWidth: '30em',
}

const channelStyle: React.CSSProperties = { padding: '0.4em 0.6em' }

@observer
export default class ChannelList extends React.Component {
  props: {
    channels: ChannelInfo[]
    joinedChannels: string[]
    onClose?: () => any
    onChannelInput: (id: string) => any
  }

  @observable searchText = ''

  updateSearchText = debounce((text: string) => {
    this.searchText = text
  }, 500)

  @computed
  get processedChannels() {
    const search = this.searchText.toLowerCase()
    const sorted = sortBy(this.props.channels, 'type', 'title')
    return sorted.filter(ch => ch.title.toLowerCase().includes(search))
  }

  render() {
    const renderChannel = (ch: ChannelInfo) => {
      const onClick = preventDefault(() => this.props.onChannelInput(ch.id))
      const joinedClass = this.props.joinedChannels.includes(ch.id) ? 'bg-1' : ''
      return (
        <a className={`flex-row ${joinedClass}`} href="#" key={ch.id} onMouseDown={onClick}>
          <div
            style={channelStyle}
            className="flex-grow"
            dangerouslySetInnerHTML={{ __html: ch.title }}
          />
          <div style={channelStyle}>
            {ch.userCount}
          </div>
        </a>
      )
    }

    return (
      <div>
        <div className="bg-2 scroll-v" style={channelListStyle}>
          {this.processedChannels.map(renderChannel)}
        </div>
        <div className="flex-row" style={{ padding: '0.5em' }}>
          <input
            className="input flex-grow"
            style={{ marginRight: '0.5em' }}
            type="text"
            placeholder="Search..."
            onInput={e => this.updateSearchText(e.currentTarget.value)}
          />
          <button className="button" onMouseDown={this.props.onClose}>
            Done
          </button>
        </div>
      </div>
    )
  }
}
