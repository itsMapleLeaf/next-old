import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { Stores } from 'src/stores'

type Props = {
  id: string
}

type InjectedProps = {
  title: string
}

function storesToProps(stores: Stores, props: Props): InjectedProps {
  const channel = stores.channelStore.getChannel(props.id)
  return {
    title: channel.title,
  }
}

function renderChannelTabContent(props: Props & InjectedProps) {
  const { title } = props
  return (
    <div className="flex-row flex-align-center">
      <Icon name="earth" className="margin-right" /> {title}
    </div>
  )
}

export const ChannelTabContent: React.StatelessComponent<Props> = inject(storesToProps)(
  observer(renderChannelTabContent),
)
