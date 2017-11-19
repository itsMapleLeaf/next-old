import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { cx } from 'react-emotion'
import { CharacterDetails } from 'src/character/components/CharacterDetails'
import { scrollVertical } from 'src/common/styles/helpers'
import { Stores } from 'src/stores'
import { Grid, GridCell } from 'src/ui/components'
import { NavigationActionList } from './NavigationActionList'
import { NavigationTabList } from './NavigationTabList'

type InjectedProps = { identity: string }

const NavigationContentComponent = (props: InjectedProps) => (
  <Grid columns="auto 200px" rows="auto 1fr" className="fill-area">
    <GridCell height={2}>
      <NavigationActionList />
    </GridCell>

    <div className="bg-color-main">
      <CharacterDetails name={props.identity} />
    </div>

    <div className={cx('bg-color-darken-1', scrollVertical)}>
      <NavigationTabList />
    </div>
  </Grid>
)

function storesToProps(stores: Stores): InjectedProps {
  return { identity: stores.chatStore.identity }
}

export const NavigationContent = inject(storesToProps)(
  observer(NavigationContentComponent),
) as React.StatelessComponent<{}>
