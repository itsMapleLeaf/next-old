import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Drawer } from 'src/common/components/Drawer'
import { Stores } from 'src/stores'
import { OverlayViewModel } from 'src/ui/models/OverlayViewModel'
import { NavigationContent } from './NavigationContent'

type InjectedProps = {
  navDrawer: OverlayViewModel
}

const NavigationDrawerComponent = (props: InjectedProps) => (
  <Drawer side="left" visible={props.navDrawer.isOpen} onShadeClicked={props.navDrawer.hide}>
    <div className="bg-color-darken-3">
      <NavigationContent />
    </div>
  </Drawer>
)

function storesToProps(stores: Stores): InjectedProps {
  return { navDrawer: stores.chatViewStore.navDrawer }
}

export const NavigationDrawer = inject(storesToProps)(
  observer(NavigationDrawerComponent),
) as React.StatelessComponent<{}>
