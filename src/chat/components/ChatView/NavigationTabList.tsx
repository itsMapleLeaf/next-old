import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { leaveChannel } from 'src/channel/actions'
import { ChannelTabContent } from 'src/channel/components/ChannelTabContent'
import { ChatNavigationStore, Route } from 'src/chat/stores/ChatNavigationStore'
import { Fragment } from 'src/common/components/Fragment'
import { PrivateChatTabContent } from 'src/private-chat/components/PrivateChatTabContent'
import { Stores } from 'src/stores'
import { NavigationTab } from './NavigationTab'

type InjectedProps = {
  navigation: ChatNavigationStore
  onTabActivate: (route: Route) => void
  onChannelClose: (id: string) => void
  onPrivateChatClose: (partner: string) => void
}

function storesToProps(stores: Stores): InjectedProps {
  const navigation = stores.chatNavigationStore
  return {
    navigation,

    onTabActivate(route) {
      navigation.setRoute(route)
      stores.chatViewStore.navDrawer.hide()
    },

    onChannelClose(id) {
      leaveChannel(id)
    },

    onPrivateChatClose(partner) {
      stores.privateChatStore.closePrivateChat(partner)
    },
  }
}

@inject(storesToProps)
@observer
class NavigationTabsComponent extends React.Component<InjectedProps> {
  render() {
    return (
      <Fragment>
        {this.renderConsoleTab()}

        <h3 className="padding faded">Channels</h3>
        {this.renderChannelTabs()}

        <h3 className="padding faded">Private Chats</h3>
        {this.renderPrivateChatTabs()}
      </Fragment>
    )
  }

  private renderChannelTabs() {
    const navigation = this.props.navigation
    const routes = navigation.channelRoutes
    const currentRoute = navigation.currentRoute

    return routes.map((route, index) => {
      const isActive = route === currentRoute
      const handleClose = () => this.props.onChannelClose(route.id)
      const handleActivate = () => this.props.onTabActivate(route)

      return (
        <NavigationTab
          key={route.id}
          active={isActive}
          onActivate={handleActivate}
          onClose={handleClose}
        >
          <ChannelTabContent id={route.id} />
        </NavigationTab>
      )
    })
  }

  private renderPrivateChatTabs() {
    const navigation = this.props.navigation
    const currentRoute = navigation.currentRoute
    const routes = navigation.privateChatRoutes

    return routes.map((route, index) => {
      const isActive = route === currentRoute
      const handleActivate = () => this.props.onTabActivate(route)
      const handleClose = () => this.props.onPrivateChatClose(route.partner)

      return (
        <NavigationTab
          key={route.partner}
          active={isActive}
          onActivate={handleActivate}
          onClose={handleClose}
        >
          <PrivateChatTabContent partner={route.partner} />
        </NavigationTab>
      )
    })
  }

  private renderConsoleTab() {
    const navigation = this.props.navigation
    const route = navigation.consoleRoute
    const currentRoute = navigation.currentRoute
    const handleActivate = () => this.props.onTabActivate(route)

    return (
      <NavigationTab active={currentRoute === route} onActivate={handleActivate}>
        <Icon name="code" className="margin-right" /> Console
      </NavigationTab>
    )
  }
}

export const NavigationTabList: React.ComponentClass<{}> = NavigationTabsComponent
