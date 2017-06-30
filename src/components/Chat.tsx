import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import ChatStore from '../chat-store'
import { preventDefault } from '../lib/react-utils'
import ChannelList from './ChannelList'
import Icon from './Icon'

import './Chat.css'

@observer
export default class Chat extends React.Component {
  props: {
    account: string
    ticket: string
    store: ChatStore
    onDisconnect: () => any
  }

  @observable channelListOpen = false

  @action.bound
  channelListAction() {
    this.channelListOpen = true
    this.props.store.requestChannelList()
  }

  componentDidMount() {
    this.props.store.connect(this.props.account, this.props.ticket, this.props.store.identity)
    this.props.store.onDisconnect = this.props.onDisconnect
  }

  componentWillUnmount() {
    this.props.store.disconnect()
  }

  render() {
    const { store } = this.props

    return (
      <div className="bg-3 fullscreen flex-row">
        <div className="flex-column">
          <div className="flex-grow">
            <a className="chat-action" href="#" onClick={preventDefault(this.channelListAction)}>
              <Icon>forum</Icon>
            </a>
            <a className="chat-action" href="#">
              <Icon>account_circle</Icon>
            </a>
            <a className="chat-action" href="#">
              <Icon>settings</Icon>
            </a>
          </div>
          <div>
            <a className="chat-action" href="#">
              <Icon>exit_to_app</Icon>
            </a>
          </div>
        </div>
        <div className="bg-2">tabs</div>
        <div className="bg-1 flex-grow">chat</div>
        {this.channelListOpen && <ChannelList channels={store.channelList} />}
      </div>
    )
  }
}
