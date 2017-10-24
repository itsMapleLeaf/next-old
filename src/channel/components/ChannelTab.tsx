import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { ChatTab, ChatTabProps } from 'src/chat/components/ChatTab'

type Props = {
  title: string
  type: 'public' | 'private'
}

export function ChannelTab(props: Props & ChatTabProps) {
  const { title, type, ...tabProps } = props
  const iconName = type === 'public' ? 'earth' : 'key'
  return (
    <ChatTab {...tabProps}>
      <div className="flex-row flex-align-center">
        <Icon name={iconName} className="margin-right" /> <span>{title}</span>
      </div>
    </ChatTab>
  )
}
