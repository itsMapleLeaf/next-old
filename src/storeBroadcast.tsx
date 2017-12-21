import { Observer } from 'mobx-react'
import * as React from 'react'
import { Broadcast, Subscriber } from 'react-broadcast'
import { Stores } from './stores'

const storeChannel = 'storeChannel'

export const StoreBroadcast = (props: { value: Stores; children: React.ReactNode }) => (
  <Broadcast {...props} channel={storeChannel} />
)

export const StoreSubscriber = (props: { children: ((stores: Stores) => React.ReactNode) }) => (
  <Subscriber channel={storeChannel}>
    {(stores: Stores) => (
      <Observer>{() => props.children(stores) as React.ReactElement<any>}</Observer>
    )}
  </Subscriber>
)
