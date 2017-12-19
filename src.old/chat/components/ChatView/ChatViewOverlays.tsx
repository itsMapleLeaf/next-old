import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChannelBrowserContent } from 'src/channel-browser/components/ChannelBrowserContent'
import { Fragment } from 'src/common/components/Fragment'
import { Stores } from 'src/stores'
import { Overlay } from 'src/ui/components'
import { OverlayViewModel } from 'src/ui/models/OverlayViewModel'
import { CharacterBrowser } from './CharacterBrowser'
import { StatusMenuContent } from './StatusMenuContent'

type InjectedProps = {
  statusMenu: OverlayViewModel
  channelBrowser: OverlayViewModel
  characterBrowser: OverlayViewModel
}

function ChatViewOverlaysComponent(props: InjectedProps) {
  const channelBrowser = props.channelBrowser.isOpen && (
    <Overlay
      panelProps={{ width: '400px', height: '600px' }}
      onShadeClick={props.channelBrowser.hide}
    >
      <ChannelBrowserContent onDone={props.channelBrowser.hide} />
    </Overlay>
  )

  const statusMenu = props.statusMenu.isOpen && (
    <Overlay onShadeClick={props.statusMenu.hide}>
      <StatusMenuContent />
    </Overlay>
  )

  const characterBrowser = props.characterBrowser.isOpen && (
    <Overlay
      onShadeClick={props.characterBrowser.hide}
      panelProps={{ width: '400px', height: '600px' }}
    >
      <CharacterBrowser />
    </Overlay>
  )

  return (
    <Fragment>
      {channelBrowser}
      {statusMenu}
      {characterBrowser}
    </Fragment>
  )
}

function storesToProps(stores: Stores): InjectedProps {
  return {
    statusMenu: stores.chatViewStore.statusMenu,
    channelBrowser: stores.chatViewStore.channelBrowser,
    characterBrowser: stores.chatViewStore.friendBrowser,
  }
}

export const ChatViewOverlays = inject(storesToProps)(
  observer(ChatViewOverlaysComponent),
) as React.StatelessComponent<{}>
