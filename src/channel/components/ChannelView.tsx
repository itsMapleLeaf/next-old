import { action, computed, observable } from "mobx"
import { inject, observer } from "mobx-react"
import * as React from "react"
import MediaQuery from "react-responsive"
import { Icon } from "src/app/components/Icon"
import { ChannelModeFilter } from "src/channel/components/ChannelModeFilter"
import { Channel, ChannelMode } from "src/channel/models/Channel"
import { ChatHeader } from "src/chat/components/ChatHeader"
import { ChatInput } from "src/chat/components/ChatInput"
import { OverlayState } from "src/chat/models/OverlayState"
import { parseBBC } from "src/chat/util/bbc"
import { AutoScroller } from "src/common/components/AutoScroller"
import { Drawer } from "src/common/components/Drawer"
import { preventDefault } from "src/common/util/react"
import { MessageComponent } from "src/message/components/MessageComponent"
import { Message } from "src/message/models/Message"
import { Stores } from "src/stores"
import { ChannelUsers } from "./ChannelUsers"

const mediaShowOnDesktop = "(min-width: 900px)"
const mediaShowOnMobile = "(max-width: 900px)"

type Props = JSX.IntrinsicElements["div"] & {
  id: string
}

type InjectedProps = {
  channel: Channel
  onMessage: (message: string) => void
}

function storesToProps(stores: Stores, props: Props): InjectedProps {
  const { channelStore, chatStore } = stores
  return {
    channel: channelStore.getChannel(props.id),
    onMessage(message) {
      chatStore.sendChannelMessage(props.id, message)
    },
  }
}

@inject(storesToProps)
@observer
class ChannelViewComponent extends React.Component<Props & InjectedProps> {
  @observable private displayedMode = "both" as ChannelMode
  private infoDrawer = new OverlayState()

  render() {
    const { channel } = this.props

    return (
      <div className="flex-column fill-area">
        {this.renderHeader()}

        <div className="divider" />

        <MediaQuery query={mediaShowOnDesktop}>
          <div className="bg-color-main scroll-v padding" style={{ height: "80px" }}>
            {this.renderDescription()}
          </div>
          <div className="divider" />
        </MediaQuery>

        <div className="flex-grow flex-row">
          <AutoScroller>
            <div className="bg-color-darken-1 flex-grow scroll-v">
              {this.filteredMessages.slice(0, 300).map(this.renderMessage)}
            </div>
          </AutoScroller>

          <MediaQuery query={mediaShowOnDesktop}>
            {/* the flex-row here is needed to make sure the encased divs stack horizontally */}
            <div className="flex-row">
              <div className="divider" />
              <div className="bg-color-main scroll-v">
                <ChannelUsers users={channel.users} ops={channel.ops} />
              </div>
            </div>
          </MediaQuery>
        </div>

        <div className="divider" />

        <div className="bg-color-main flex-row">
          <ChatInput className="flex-grow" onMessage={this.props.onMessage} />
        </div>

        <MediaQuery query={mediaShowOnMobile}>{this.renderInfoDrawer()}</MediaQuery>
      </div>
    )
  }

  @action
  private setDisplayedMode(mode: ChannelMode) {
    this.displayedMode = mode
  }

  @computed
  private get parsedDescription() {
    return { __html: parseBBC(this.props.channel.description) }
  }

  @computed
  private get filteredMessages() {
    const { messages } = this.props.channel

    if (this.props.channel.mode !== "both") {
      return messages
    }

    if (this.displayedMode === "ads") {
      return messages.filter(msg => msg.type === "lfrp")
    }
    if (this.displayedMode === "chat") {
      return messages.filter(msg => msg.type === "normal")
    }

    return messages
  }

  private renderModeFilter(mode: ChannelMode, text: string) {
    return (
      <ChannelModeFilter
        key={mode}
        onClick={preventDefault(() => this.setDisplayedMode(mode))}
        text={text}
        active={this.displayedMode === mode}
      />
    )
  }

  private renderHeader() {
    const { channel } = this.props

    return (
      <div>
        <ChatHeader>
          <div className="flex-row flex-align-center">
            <h3 className="flex-grow">{channel.title}</h3>
            <div className="flex-row">
              {channel.mode === "both" && [
                this.renderModeFilter("chat", "Chat"),
                this.renderModeFilter("ads", "Ads"),
                this.renderModeFilter("both", "Both"),
              ]}
            </div>
            <MediaQuery query={mediaShowOnMobile}>
              <a href="#" onClick={preventDefault(this.infoDrawer.show)}>
                <Icon name="more-vert" size={24} />
              </a>
            </MediaQuery>
          </div>
        </ChatHeader>
      </div>
    )
  }

  private renderDescription() {
    return <span className="preserve-ws" dangerouslySetInnerHTML={this.parsedDescription} />
  }

  private renderInfoDrawer() {
    const { channel } = this.props

    return (
      <Drawer side="right" visible={this.infoDrawer.isOpen} onShadeClicked={this.infoDrawer.hide}>
        <div className="scroll-v" style={{ width: "240px" }}>
          <h3 className="padding">Description</h3>
          <div
            className="bg-color-darken-1 padding preserve-ws"
            dangerouslySetInnerHTML={this.parsedDescription}
          />

          <h3 className="padding">Users ({channel.getUserCount()})</h3>
          <div className="bg-color-darken-1">
            <ChannelUsers users={channel.getUsers()} ops={channel.ops} />
          </div>
        </div>
      </Drawer>
    )
  }

  private renderMessage = (message: Message, i: number) => {
    return <MessageComponent key={i} message={message} />
  }
}

export const ChannelView: React.ComponentClass<Props> = ChannelViewComponent
