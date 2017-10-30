import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChatTab } from 'src/chat/components/ChatTab'
import { ChatNavigationStore } from 'src/chat/stores/ChatNavigationStore'
import { PrivateChatTabContent } from 'src/private-chat/components/PrivateChatTabContent'

type Props = {
  chatNavigationStore?: ChatNavigationStore
}

@inject('chatNavigationStore')
@observer
export class ChatNavTabs extends React.Component<Props> {
  renderChannelTabs() {
    const navigation = this.props.chatNavigationStore!
    const routes = navigation.channelRoutes
    const currentRoute = navigation.currentRoute

    return routes.map((route, index) => {
      const isActive = route === currentRoute
      const handleActivate = () => navigation.setRoute(route)
      return (
        <ChatTab key={route.id} active={isActive} onActivate={handleActivate}>
          {/* <ChannelTabContent title={ch.title} type="public" /> */}
          {route.id}
        </ChatTab>
      )
    })
  }

  renderPrivateChatTabs() {
    const navigation = this.props.chatNavigationStore!
    const currentRoute = navigation.currentRoute
    const routes = navigation.privateChatRoutes

    return routes.map((route, index) => {
      const isActive = route === currentRoute
      const handleActivate = () => navigation.setRoute(route)
      return (
        <ChatTab key={route.partner} active={isActive} onActivate={handleActivate}>
          <PrivateChatTabContent partner={route.partner} />
        </ChatTab>
      )
    })
  }

  render() {
    return (
      <div>
        <h2 className="padding faded">Channels</h2>
        {this.renderChannelTabs()}

        <h2 className="padding faded">Private Chats</h2>
        {this.renderPrivateChatTabs()}
      </div>
    )
  }
}
