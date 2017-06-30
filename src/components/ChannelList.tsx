import { observer } from 'mobx-react'
import * as React from 'react'
import { ChannelInfo } from './Chat.store'

@observer
export default class ChannelList extends React.Component {
  props: {
    channels: ChannelInfo[]
  }

  render() {
    return (
      <div>
        {this.props.channels.map(ch =>
          <div key={ch.id}>
            {ch.title}
          </div>
        )}
      </div>
    )
  }
}
