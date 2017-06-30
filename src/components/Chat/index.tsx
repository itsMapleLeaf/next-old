import { observer } from 'mobx-react'
import * as React from 'react'
import ChatStore from './store'
import './styles.css'

@observer
export default class Chat extends React.Component {
  props: {
    account: string
    ticket: string
    identity: string
    onDisconnect: () => any
  }

  store = new ChatStore()

  componentDidMount() {
    this.store.init(this.props.account, this.props.ticket, this.props.identity)
    this.store.onDisconnect = this.props.onDisconnect
  }

  componentWillUnmount() {
    this.store.disconnect()
  }

  render() {
    return <div>i am chat</div>
  }
}
