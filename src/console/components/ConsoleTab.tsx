import * as React from 'react'

import { NavigationTab } from '../../chat/components/Chat/NavigationTab'
import { Icon } from '../../ui/components/Icon'

export const ConsoleTab = () => (
  <NavigationTab>
    <Icon name="code" size={16} />
    <span>Console</span>
  </NavigationTab>
)
