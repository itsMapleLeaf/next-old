import { observer } from 'mobx-react'
import * as React from 'react'
import { Channel, ChannelMode } from 'src/channel/models/Channel'
import { Fragment } from 'src/common/components/Fragment'
import { preventDefault } from 'src/common/util/react'
import { Button } from 'src/ui/components'

function renderFilterButton(channel: Channel, mode: ChannelMode, text: string) {
  const buttonProps = {
    faded: channel.selectedMode !== mode,
    onClick: preventDefault(() => channel.setSelectedMode(mode)),
  }

  return (
    <Button key={mode} flat {...buttonProps}>
      {text}
    </Button>
  )
}

export const Filters = observer(function({ channel }: { channel: Channel }) {
  return (
    <Fragment>
      {channel.mode === 'both' && [
        renderFilterButton(channel, 'both', 'Both'),
        renderFilterButton(channel, 'chat', 'Chat'),
        renderFilterButton(channel, 'ads', 'Ads'),
      ]}

      {channel.mode === 'ads' && (
        <Button flat faded>
          Ads
        </Button>
      )}

      {channel.mode === 'chat' && (
        <Button flat faded>
          Chat
        </Button>
      )}
    </Fragment>
  )
})
