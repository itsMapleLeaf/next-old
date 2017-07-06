import { observer } from 'mobx-react'
import * as React from 'react'
import Store from '../store'

@observer
export default class Chat extends React.Component {
  props: {
    store: Store
  }

  store = this.props.store

  render() {
    const channels = Array.from(this.store.chat.channels.values())
    return (
      <div className="fullscreen flex-row">
        <div>
          {channels.map(ch =>
            <div key={ch.id}>
              {ch.title}
            </div>
          )}
        </div>
        <div className="flex-grow">i am chat</div>
      </div>
    )
  }
}
