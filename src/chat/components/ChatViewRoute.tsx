import * as React from "react"
import { ChannelView } from "src/channel/components/ChannelView"
import { Route } from "src/chat/stores/ChatNavigationStore"
import { ConsoleView } from "src/console/components/ConsoleView"
import { PrivateChatView } from "src/private-chat/components/PrivateChatView"
import { ChatHeader } from "./ChatHeader"

export function ChatViewRoute({ route }: { route: Route }) {
  if (route.type === "channel") {
    return <ChannelView id={route.id} />
  }
  if (route.type === "private-chat") {
    return <PrivateChatView partner={route.partner} />
  }
  if (route.type === "console") {
    return <ConsoleView />
  }
  return (
    <ChatHeader>
      <h3>next</h3>
    </ChatHeader>
  )
}
