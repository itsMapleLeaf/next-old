import sortBy = require('lodash/sortBy')
import debounce = require('lodash/debounce')
import { computed, observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { ChannelInfo } from '../chat-store'

const channelListStyle: React.CSSProperties = {
  height: 'calc(100vh - 10em)',
  width: 'calc(100vw - 4em)',
  maxWidth: '30em',
}

@observer
export default class ChannelList extends React.Component {
  props: {
    channels: ChannelInfo[]
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
      const padding = { padding: '0.3em 0.6em' }
      return (
        <a className="flex-row" href="#" key={ch.id}>
          <div
            style={padding}
            className="flex-grow"
            dangerouslySetInnerHTML={{ __html: ch.title }}
          />
          <div style={padding}>
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
        <div style={{ padding: '0.5em' }}>
          <input
            style={{ width: '100%' }}
            className="input"
            type="text"
            placeholder="Search..."
            onInput={e => this.updateSearchText(e.currentTarget.value)}
          />
        </div>
      </div>
    )
  }
}
