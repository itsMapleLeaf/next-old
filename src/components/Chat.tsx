import * as React from 'react'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react'

import ChannelView from './Channel'
import ChatTab from './ChatTab'
import Store from '../store/store'
import publicIcon from '../assets/ic_public_white_48px.svg'
import { Channel } from '../store/chat-state-models'

interface Room {
  title: React.ReactNode
  view: () => React.ReactNode
}

function createChannelRoom(channel: Channel): Room {
  return {
    title: (
      <span>
        <img src={publicIcon} style={{ height: '1.25em' }} /> {channel.title}
      </span>
    ),
    view: () => <ChannelView channel={channel} />,
  }
}

@observer
class ChatViewComponent extends React.Component {
  props: {
    rooms: Room[]
    roomIndex: number
    onTabClicked: (index: number) => any
  }

  render() {
    const currentRoom = this.props.rooms[this.props.roomIndex]
    return (
      <div className="fullscreen flex-row">
        <div className="bg-2">
          {this.renderTabs()}
        </div>
        <div className="flex-grow">
          {currentRoom && currentRoom.view()}
        </div>
      </div>
    )
  }

  renderTabs() {
    return this.props.rooms.map((room, index) => {
      const active = index === this.props.roomIndex
      return (
        <ChatTab key={index} active={active} onClick={() => this.props.onTabClicked(index)}>
          {room.title}
        </ChatTab>
      )
    })
  }
}

@observer
class ChatViewContainer extends React.Component {
  props: {
    store: Store
  }

  @observable roomIndex = 0

  @computed
  get rooms(): Room[] {
    const channels = Array.from(this.props.store.chat.channels.values())
    return channels.map(createChannelRoom)
  }

  @computed
  get currentRoom(): Room | void {
    return this.rooms[this.roomIndex]
  }

  @computed
  get currentView() {
    return this.currentRoom ? this.currentRoom.view() : <div />
  }

  @action.bound
  setRoomIndex(index: number) {
    this.roomIndex = index
  }

  render() {
    return (
      <ChatViewComponent
        rooms={this.rooms}
        roomIndex={this.roomIndex}
        onTabClicked={this.setRoomIndex}
      />
    )
  }
}

export default ChatViewContainer
