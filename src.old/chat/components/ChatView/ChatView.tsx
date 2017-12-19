import * as React from 'react'
import { cx } from 'react-emotion'
import MediaQuery from 'react-responsive'
import { chatViewLayoutLarge, chatViewLayoutSmall } from 'src/chat/styles/breakpoints'
import { Fragment } from 'src/common/components/Fragment'
import { fullscreen } from 'src/common/styles/helpers'
import { Grid } from 'src/ui/components'
import { CharacterMenu } from './CharacterMenu'
import { ChatViewOverlays } from './ChatViewOverlays'
import { NavigationContent } from './NavigationContent'
import { NavigationDrawer } from './NavigationDrawer'
import { RouteView } from './RouteView'

export function ChatView() {
  return (
    <Fragment>
      <MediaQuery query={chatViewLayoutLarge}>
        <Grid className={cx('bg-color-darken-3', fullscreen)} columns="auto 1fr">
          <NavigationContent />
          <RouteView />
        </Grid>
      </MediaQuery>

      <MediaQuery query={chatViewLayoutSmall}>
        <div className={cx('bg-color-darken-3', fullscreen)}>
          <RouteView />
          <NavigationDrawer />
        </div>
      </MediaQuery>

      <ChatViewOverlays />

      <CharacterMenu />
    </Fragment>
  )
}
