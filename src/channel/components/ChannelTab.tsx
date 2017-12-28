import * as React from 'react'

import { NavigationTab } from '../../chat/components/Chat/NavigationTab'
import { Icon } from '../../ui/components/Icon'

const noop = () => {}

export const ChannelTab = (props: { title: string }) => (
  <NavigationTab onActivate={() => alert('hello')} onClose={noop}>
    <Icon name="earth" size={16} />
    <span>{props.title}</span>
  </NavigationTab>
)
