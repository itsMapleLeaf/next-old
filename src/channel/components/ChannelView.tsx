import { action, computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { Icon } from 'src/app/components/Icon'
import { Channel, ChannelMode } from 'src/channel/models/Channel'
import { ChatInput } from 'src/chat/components/ChatInput'
import { OverlayState } from 'src/chat/models/OverlayState'
import { AutoScroller } from 'src/common/components/AutoScroller'
import { preventDefault } from 'src/common/util/react'
import { MessageComponent } from 'src/chat/components/ChatMessageView'
import { ChatMessage } from 'src/chat/models/ChatMessage'
import { Stores } from 'src/stores'

import { ChannelUserList } from './ChannelUserList'
import { ChannelViewDrawer } from './ChannelViewDrawer'
import { ChannelViewHeader } from './ChannelViewHeader'

export const mediaShowOnDesktop = '(min-width: 900px)'
export const mediaShowOnMobile = '(max-width: 900px)'

type Props = JSX.IntrinsicElements['div'] & {
  id: string
}

type InjectedProps = {
  channel: Channel
}

function storesToProps(stores: Stores, props: Props): InjectedProps {
  const { channelStore } = stores
  return {
    channel: channelStore.getChannel(props.id),
  }
}

@inject(storesToProps)
@observer
class ChannelViewComponent extends React.Component<Props & InjectedProps> {
  @observable private displayedMode = 'both' as ChannelMode
  private infoDrawer = new OverlayState()

  render() {
    const { channel } = this.props

    return (
      <div className="flex-column fill-area">
        {this.renderHeader()}

        <div className="divider" />

        {this.renderDescription()}

        <div className="flex-grow flex-row">
          {this.renderMessageList()}

          <MediaQuery query={mediaShowOnDesktop}>
            {/* the flex-row here is needed to make sure the encased divs flow horizontally */}
            <div className="flex-row">
              <div className="divider" />
              {this.renderUserList()}
            </div>
          </MediaQuery>
        </div>

        <div className="divider" />

        <div className="bg-color-main flex-row flex-justify-stretch">
          <ChatInput />
        </div>

        <MediaQuery query={mediaShowOnMobile}>
          <ChannelViewDrawer channel={channel} infoDrawerOverlay={this.infoDrawer} />
        </MediaQuery>
      </div>
    )
  }

  @action.bound
  private setDisplayedMode(mode: ChannelMode) {
    this.displayedMode = mode
  }

  @computed
  private get filteredMessages() {
    const { messages } = this.props.channel

    if (this.props.channel.mode === 'both') {
      if (this.displayedMode === 'ads') {
        return messages.filter(msg => msg.type === 'lfrp')
      }
      if (this.displayedMode === 'chat') {
        return messages.filter(msg => msg.type === 'normal')
      }
    }

    return messages
  }

  private renderHeader() {
    const handleMoreClick = preventDefault(this.infoDrawer.show)
    return (
      <ChannelViewHeader
        channel={this.props.channel}
        currentMode={this.displayedMode}
        onModeSelect={this.setDisplayedMode}
        drawerToggle={
          <MediaQuery query={mediaShowOnMobile}>
            <a href="#" onClick={handleMoreClick}>
              <Icon name="more-vert" size={24} />
            </a>
          </MediaQuery>
        }
      />
    )
  }

  private renderDescription() {
    return (
      <MediaQuery query={mediaShowOnDesktop}>
        <div
          className="bg-color-main scroll-v padding"
          style={{ height: '80px' }}
          dangerouslySetInnerHTML={this.props.channel.parsedDescription}
        />
        <div className="divider" />
      </MediaQuery>
    )
  }

  private renderMessageList() {
    return (
      <AutoScroller>
        <div className="bg-color-darken-1 flex-grow scroll-v">
          {this.filteredMessages.slice(-300).map(this.renderMessage)}
        </div>
      </AutoScroller>
    )
  }

  private renderUserList() {
    const { users, ops } = this.props.channel
    return (
      <div className="bg-color-main scroll-v">
        <ChannelUserList users={users} ops={ops} />
      </div>
    )
  }

  private renderMessage = (message: ChatMessage, i: number) => {
    return <MessageComponent key={i} message={message} />
  }
}

export const ChannelView: React.ComponentClass<Props> = ChannelViewComponent
