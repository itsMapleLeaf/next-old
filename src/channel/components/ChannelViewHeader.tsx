import * as React from "react"
import { ChannelModeFilter } from "src/channel/components/ChannelModeFilter"
import { Channel, ChannelMode } from "src/channel/models/Channel"
import { ChatHeader } from "src/chat/components/ChatHeader"
import { preventDefault } from "src/common/util/react"

type Props = {
  channel: Channel
  drawerToggle: React.ReactNode
  currentMode: ChannelMode
  onModeSelect: (mode: ChannelMode) => void
}

export function ChannelViewHeader({ channel, drawerToggle, ...props }: Props) {
  function renderModeFilter(mode: ChannelMode, text: string) {
    return (
      <ChannelModeFilter
        key={mode}
        text={text}
        active={props.currentMode === mode}
        onClick={preventDefault(() => props.onModeSelect(mode))}
      />
    )
  }

  return (
    <ChatHeader>
      <div className="flex-row flex-align-center">
        <h3 className="flex-grow">{channel.title}</h3>
        <div className="flex-row">
          {channel.mode === "both" && [
            renderModeFilter("chat", "Chat"),
            renderModeFilter("ads", "Ads"),
            renderModeFilter("both", "Both"),
          ]}
        </div>
        {drawerToggle}
      </div>
    </ChatHeader>
  )
}
