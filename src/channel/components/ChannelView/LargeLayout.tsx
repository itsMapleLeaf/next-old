import { observer } from 'mobx-react'
import * as React from 'react'
import { cx } from 'react-emotion'
import { Channel } from 'src/channel/models/Channel'
import { ChatInput } from 'src/chat/components/ChatInput'
import { scrollVertical } from 'src/common/styles/helpers'
import { Grid, GridCell } from 'src/ui/components'
import { Description } from './Description'
import { Header } from './Header'
import { MessageList } from './MessageList'
import { UserList } from './UserList'

export const LargeLayout = observer(function LargeLayout(props: { channel: Channel }) {
  return (
    <Grid columns="1fr 200px" rows="auto auto 1fr 80px" className="fill-area">
      <GridCell width={2}>
        <Header channel={props.channel} />
      </GridCell>

      <GridCell
        width={2}
        className={cx('bg-color-main', scrollVertical)}
        style={{ maxHeight: '120px' }}
      >
        <Description text={props.channel.parsedDescription} />
      </GridCell>

      <MessageList messages={props.channel.filteredMessages} />

      <UserList users={props.channel.users} ops={props.channel.ops} />

      {/* using an inline style here is kind of dirty but i don't know of a better way to do this */}
      <ChatInput style={{ gridColumnEnd: 'span 2' }} />
    </Grid>
  )
})
