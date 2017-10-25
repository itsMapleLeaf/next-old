import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { AppStore } from 'src/app/stores/AppStore'
import { ChatInput } from 'src/chat/components/ChatInput'
import { ChatMessage } from 'src/chat/components/ChatMessage'
import { AutoScroller } from 'src/common/components/AutoScroller'
import { ShowOnDesktop } from 'src/common/components/responsive-utils'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-gap: 4px;

  // on mobile
  @media (max-width: 750px) {
    grid-template-rows: 1fr 80px;
    grid-template-columns: 1fr;
    grid-template-areas: 'message-list' 'chat-input';
  }

  // on desktop
  @media (min-width: 750px) {
    grid-template-rows: 80px 1fr 80px;
    grid-template-columns: 1fr 200px;
    grid-template-areas: 'description description' 'message-list user-list' 'chat-input chat-input';
  }
`

const MessageList = styled.div`grid-area: message-list;`

const Description = styled(ShowOnDesktop)`
  grid-area: description;
  height: 80px;
`

const UserList = styled(ShowOnDesktop)`grid-area: user-list;`

const UserListEntry = styled.div`
  font-weight: 500;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`

const ChatInputWrapper = styled.div`grid-area: chat-input;`

type ChannelViewProps = JSX.IntrinsicElements['div'] & {
  appStore?: AppStore
  channelID: string
  onMenuClicked: () => void
  onMoreClicked: () => void
}

@inject('appStore')
@observer
export class ChannelView extends React.Component<ChannelViewProps> {
  render() {
    const { appStore, className } = this.props
    const channel = appStore!.chat.channels.getChannel(this.props.channelID)
    return (
      <Container className={`${className} fill-area`}>
        <Description className="bg-color-darken-1 scroll-v padding preserve-ws">
          {channel.description}
        </Description>
        <AutoScroller>
          <MessageList className="bg-color-main flex-grow scroll-v">
            {channel.messages.map((message, i) => <ChatMessage key={i} message={message} />)}
          </MessageList>
        </AutoScroller>
        <UserList className="bg-color-darken-1 scroll-v padding">
          {channel.users.map(name => <UserListEntry key={name}>{name}</UserListEntry>)}
        </UserList>
        <ChatInputWrapper className="bg-color-main flex-row">
          <ChatInput className="flex-grow" />
        </ChatInputWrapper>
      </Container>
    )
  }
}
