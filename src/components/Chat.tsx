import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { preventDefault } from '../lib/react-utils'
import Store from '../store'

const chatTabStyle: React.CSSProperties = {
  width: '12em',
  padding: '0.4em 0.6em',
  display: 'block',
}

function ChatTab(props: { title: any; active: boolean; onClick: () => any }) {
  const activeClass = props.active ? 'bg-1' : ''
  const onMouseDown = preventDefault(props.onClick)
  return (
    <a href="#" style={chatTabStyle} className={activeClass} onMouseDown={onMouseDown}>
      {props.title}
    </a>
  )
}

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
      <ChatTab
        key={ch.id}
        title={ch.title}
        active={index === this.tabIndex}
        onClick={() => (this.tabIndex = index)}
      />
    )

    return (
      <div className="fullscreen flex-row">
        <div className="bg-2">
          {tabs}
        </div>
        <div className="flex-grow">i am chat</div>
      </div>
    )
  }
}
