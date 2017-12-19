import { inject, observer } from 'mobx-react'
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { Channel } from 'src/channel/models/Channel'
import { Fragment } from 'src/common/components/Fragment'
import { Stores } from 'src/stores'
import { OverlayViewModel } from 'src/ui/models/OverlayViewModel'
import { LargeLayout } from './LargeLayout'
import { SmallLayout } from './SmallLayout'

const smallLayoutQuery = '(max-width: 900px)'
const largeLayoutQuery = '(min-width: 900px)'

type Props = {
  id: string
}

type InjectedProps = {
  channel: Channel
}

function storesToProps(stores: Stores, props: Props): InjectedProps {
  return {
    channel: stores.channelStore.getChannel(props.id),
  }
}

@inject(storesToProps)
@observer
class ChannelViewComponent extends React.Component<Props & InjectedProps> {
  private infoDrawer = new OverlayViewModel()

  render() {
    return (
      <Fragment>
        <MediaQuery query={largeLayoutQuery}>
          <LargeLayout channel={this.props.channel} />
        </MediaQuery>
        <MediaQuery query={smallLayoutQuery}>
          <SmallLayout channel={this.props.channel} infoDrawer={this.infoDrawer} />
        </MediaQuery>
      </Fragment>
    )
  }
}

export const ChannelView = ChannelViewComponent as React.ComponentClass<Props>
