import { observer } from 'mobx-react'
import * as React from 'react'
import Store from '../store'
import ChatTab from './ChatTab'
import { ChatViewModel } from './ChatView.model'

@observer
export default class ChatView extends React.Component {
  props: {
    store: Store
  }

  store = this.props.store
  viewModel = new ChatViewModel(this.store)

  render() {
    return (
      <div className="fullscreen flex-row">
        <div className="bg-2">
          {this.renderTabs()}
        </div>
        <div className="flex-grow">
          {this.viewModel.currentView}
        </div>
      </div>
    )
  }

  renderTabs() {
    return this.viewModel.tabs.map((tab, index) => {
      const active = index === this.viewModel.tabIndex
      const onClick = () => (this.viewModel.tabIndex = index)
      return (
        <ChatTab key={index} active={active} onClick={onClick}>
          {tab.title}
        </ChatTab>
      )
    })
  }
}
