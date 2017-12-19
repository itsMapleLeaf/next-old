import { observer } from 'mobx-react'
import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { Channel } from 'src/channel/models/Channel'
import { ChatHeader } from 'src/chat/components/ChatHeader'
import { HTML } from 'src/common/components/HTML'
import { preventDefault } from 'src/common/util/react'
import { Filters } from './Filters'

type Props = {
  channel: Channel
  onMore?: () => void
}

export const Header = observer(function({ channel, onMore }: Props) {
  return (
    <ChatHeader>
      <div className="flex-row flex-align-center">
        <h3 className="flex-grow">
          <HTML>{channel.title}</HTML>
        </h3>

        <Filters channel={channel} />

        {onMore && (
          <a href="#" onClick={preventDefault(onMore)}>
            <Icon size={24} name="more-vert" />
          </a>
        )}
      </div>
    </ChatHeader>
  )
})
