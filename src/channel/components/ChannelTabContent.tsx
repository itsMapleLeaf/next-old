import * as React from 'react'
import { Icon } from 'src/app/components/Icon'

type Props = {
  title: string
  type: 'public' | 'private'
}

export function ChannelTabContent(props: Props) {
  const { title, type } = props
  const iconName = type === 'public' ? 'earth' : 'key'
  return (
    <div className="flex-row flex-align-center">
      <Icon name={iconName} className="margin-right" /> <span>{title}</span>
    </div>
  )
}
