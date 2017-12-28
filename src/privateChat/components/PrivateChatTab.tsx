import * as React from 'react'

import { Avatar } from '../../character/components/Avatar'
import { NavigationTab } from '../../chat/components/Chat/NavigationTab'

const noop = () => {}

export const PrivateChatTab = (props: { partner: string }) => (
  <NavigationTab onClose={noop}>
    <Avatar name={props.partner} size="16px" />
    <span>{props.partner}</span>
  </NavigationTab>
)
