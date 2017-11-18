import { bind } from 'decko'
import { debounce, sortBy } from 'lodash'
import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { ChannelBrowserEntry } from 'src/channel-browser/models/ChannelBrowserEntry'
import { joinChannel, leaveChannel } from 'src/channel/actions'
import { preventDefault } from 'src/common/util/react'
import { Stores } from 'src/stores'
import { Button, Input } from 'src/ui/components'

type Props = {
  onDone: () => void
}

type InjectedProps = {
  publicChannels: ChannelBrowserEntry[]
  privateChannels: ChannelBrowserEntry[]
  isJoined: (channelID: string) => boolean
  onChannelToggle: (channelID: string) => void
}

function sortEntries(entries: ChannelBrowserEntry[]) {
  return sortBy(entries, e => e.title)
}

function storesToProps(stores: Stores): InjectedProps {
  const { channelStore, channelBrowserStore } = stores
  return {
    publicChannels: sortEntries(channelBrowserStore.publicChannels),
    privateChannels: sortEntries(channelBrowserStore.privateChannels),
    isJoined: channelStore.isJoined.bind(channelStore),
    onChannelToggle(id) {
      if (channelStore.isJoined(id)) {
        leaveChannel(id)
      } else {
        joinChannel(id)
      }
    },
  }
}

@inject(storesToProps)
@observer
class ChannelBrowserContentComponent extends React.Component<Props & InjectedProps> {
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

  @bind
  handleSearchInput(event: React.UIEvent<HTMLInputElement>) {
    this.setSearchTextDebounced(event.currentTarget.value)
  }

  filterChannels(channels: ChannelBrowserEntry[]) {
    const searchText = this.searchText.trim().toLowerCase()
    if (searchText !== '') {
      return channels.filter(ch => ch.title.toLowerCase().includes(searchText))
    }
    return channels
  }

  render() {
    return (
      <div className="flex-column fill-area bg-color-darken-1">
        <div className="flex-row">
          {this.renderTab('Public', 'earth', 'publicChannels')}
          {this.renderTab('Private', 'key', 'privateChannels')}
        </div>
        <div className="flex-grow scroll-v">
          {this.renderChannels(this.filterChannels(this.props.publicChannels), 'publicChannels')}
          {this.renderChannels(this.filterChannels(this.props.privateChannels), 'privateChannels')}
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

  private renderTab = (title: string, icon: string, list: string) => {
    const activeClass = this.currentList === list ? 'bg-color-main' : 'faded'
    const handleClick = () => this.setCurrentList(list)
    const className = `flex-grow flex-row flex-align-center padding ${activeClass}`

    return (
      <a href="#" className={className} onClick={handleClick}>
        <Icon name={icon} size={24} className="margin-right" /> {title}
      </a>
    )
  }

  private renderChannels = (channels: ChannelBrowserEntry[], list: string) => {
    return (
      <div style={{ display: this.currentList === list ? undefined : 'none' }}>
        {channels.map(this.renderChanelListEntry)}
      </div>
    )
  }

  private renderChanelListEntry = (ch: ChannelBrowserEntry) => {
    const activeClass = this.props.isJoined(ch.id) ? 'bg-color-main' : 'faded'
    const handleClick = () => this.props.onChannelToggle(ch.id)

    return (
      <a key={ch.id} href="#" className={`flex-row ${activeClass}`} onClick={handleClick}>
        <div className="padding flex-grow" dangerouslySetInnerHTML={{ __html: ch.title }} />
        <div className="padding">{ch.userCount}</div>
      </a>
    )
  }
}

export const ChannelBrowserContent = ChannelBrowserContentComponent as React.ComponentClass<Props>
