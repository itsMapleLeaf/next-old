import { debounce, sortBy } from 'lodash'
import { action, computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { ChannelBrowserStore } from 'src/channel-browser/stores/ChannelBrowserStore'
import { joinChannel, leaveChannel } from 'src/channel/actions'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { preventDefault } from 'src/common/util/react'
import { Button, Input } from 'src/ui/components'
import styled from 'styled-components'

import { ChannelBrowserEntry } from '../models/ChannelBrowserEntry'

type ChannelBrowserProps = {
  channelStore?: ChannelStore
  channelBrowserStore?: ChannelBrowserStore
  onDone?: () => void
}

const Tab = styled('a')`
  > * {
    vertical-align: text-bottom;
  }
`

@inject('channelStore', 'channelBrowserStore')
@observer
export class ChannelBrowser extends React.Component<ChannelBrowserProps> {
  store = this.props.channelBrowserStore!
  @observable currentList = 'publicChannels'
  @observable searchText = ''

  setSearchTextDebounced = debounce(this.setSearchText, 500)

  @action
  setSearchText(text: string) {
    this.searchText = text
  }

  @action
  setCurrentList(list: string) {
    this.currentList = list
  }

  toggleChannel(id: string) {
    const channels = this.props.channelStore!
    if (channels.isJoined(id)) {
      leaveChannel(id)
    } else {
      joinChannel(id)
    }
  }

  @computed
  get publicChannels() {
    return this.sortChannels(this.filterChannels(this.store.publicChannels))
  }

  @computed
  get privateChannels() {
    return this.sortChannels(this.filterChannels(this.store.privateChannels))
  }

  sortChannels(channels: ChannelBrowserEntry[]) {
    return sortBy(channels, ch => ch.title.toLowerCase())
  }

  filterChannels(channels: ChannelBrowserEntry[]) {
    const searchText = this.searchText.trim().toLowerCase()
    if (searchText.length > 0) {
      return channels.filter(ch => ch.title.toLowerCase().includes(searchText))
    }
    return channels
  }

  handleSearchInput = (event: React.UIEvent<HTMLInputElement>) => {
    this.setSearchTextDebounced(event.currentTarget.value)
  }

  render() {
    return (
      <div className="flex-column fill-area bg-color-darken-1">
        <div className="flex-row">
          {this.renderTab('Public', 'earth', 'publicChannels')}
          {this.renderTab('Private', 'key', 'privateChannels')}
        </div>
        <div className="flex-grow scroll-v">
          {this.renderChannels(this.publicChannels, 'publicChannels')}
          {this.renderChannels(this.privateChannels, 'privateChannels')}
        </div>
        <div className="flex-row padding bg-color-main">
          <Input
            className="flex-grow margin-right"
            type="text"
            placeholder="Search..."
            onInput={this.handleSearchInput}
          />
          <Button onClick={preventDefault(this.props.onDone)}>Done</Button>
        </div>
      </div>
    )
  }

  renderTab(title: string, icon: string, list: string) {
    const activeClass = this.currentList === list ? 'bg-color-main' : 'faded'
    const handleClick = () => this.setCurrentList(list)
    const className = `flex-grow flex-row flex-align-center padding ${activeClass}`

    return (
      <Tab href="#" className={className} onClick={handleClick}>
        <Icon name={icon} size={24} className="margin-right" /> {title}
      </Tab>
    )
  }

  renderChannels(channels: ChannelBrowserEntry[], list: string) {
    return (
      <div style={{ display: this.currentList === list ? undefined : 'none' }}>
        {channels.map(this.renderChanelListEntry)}
      </div>
    )
  }

  renderChanelListEntry = (ch: ChannelBrowserEntry) => {
    const activeClass = this.props.channelStore!.isJoined(ch.id) ? 'bg-color-main' : 'faded'
    const handleClick = () => this.toggleChannel(ch.id)

    return (
      <a key={ch.id} href="#" className={`flex-row ${activeClass}`} onClick={handleClick}>
        <div className="padding flex-grow" dangerouslySetInnerHTML={{ __html: ch.title }} />
        <div className="padding">{ch.userCount}</div>
      </a>
    )
  }
}
