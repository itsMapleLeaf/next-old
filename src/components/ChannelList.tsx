import sortBy = require('lodash/sortBy')
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { ChannelInfo } from './Chat.store'
import Overlay from './Overlay'

import './ChannelList.css'

@observer
export default class ChannelList extends React.Component {
  props: {
    channels: ChannelInfo[]
  }

  @computed
  get sortedChannels() {
    return sortBy(this.props.channels, 'type', 'title')
  }

  render() {
    return (
      <Overlay>
        <div className="channel-list">
          {this.sortedChannels.map(ch =>
            <a href="#" key={ch.id} className="channel-list-channel">
              <div
                className="channel-list-channel-title"
                dangerouslySetInnerHTML={{ __html: ch.title }}
              />
              <div className="channel-list-channel-users">
                {ch.userCount}
              </div>
            </a>
          )}
        </div>
      </Overlay>
    )
  }
}
