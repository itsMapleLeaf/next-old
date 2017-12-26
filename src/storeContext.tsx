import createReactContext, { ConsumerProps } from 'create-react-context'
import { Observer } from 'mobx-react'
import * as React from 'react'

import { stores } from './stores'

const { Provider, Consumer } = createReactContext(stores)

export const StoreConsumer = (props: ConsumerProps<typeof stores>) => (
  <Consumer>
    {stores => <Observer>{() => props.children(stores) as React.ReactElement<any>}</Observer>}
  </Consumer>
)

export { Provider as StoreProvider }
