import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChannelView } from 'src/channel/components/ChannelView'
import { Route } from 'src/chat/stores/ChatNavigationStore'
import { ConsoleView } from 'src/console/components/ConsoleView'
import { PrivateChatView } from 'src/private-chat/components/PrivateChatView'
import { Stores } from 'src/stores'
import { ChatHeader } from '../ChatHeader'

type InjectedProps = {
  route: Route
}

function RouteViewComponent({ route }: InjectedProps) {
  switch (route.type) {
    case 'channel':
      return <ChannelView id={route.id} />
    case 'private-chat':
      return <PrivateChatView partner={route.partner} />
    case 'console':
      return <ConsoleView />
  }

  return (
    <ChatHeader>
      <h3>next</h3>
    </ChatHeader>
  )
}

function storesToProps(stores: Stores): InjectedProps {
  return {
    route: stores.chatNavigationStore.currentRoute,
  }
}

export const RouteView = inject(storesToProps)(
  observer(RouteViewComponent),
) as React.StatelessComponent<{}>
