import * as React from 'react'
import styled from 'styled-components'

import { ShowOnDesktop, ShowOnMobile } from 'src/common/components/responsive-utils'

import { Icon } from 'src/app/components/Icon'
import { ChatInput } from './ChatInput'
import { ChatMessage } from './ChatMessage'

const Container = styled.div`
  display: grid;
  grid-gap: 4px;

  // on mobile
  @media (max-width: 750px) {
    grid-template-rows: 40px 1fr 80px;
    grid-template-columns: 1fr;
    grid-template-areas: 'header' 'message-list' 'chat-input';
  }

  // on desktop
  @media (min-width: 750px) {
    grid-template-rows: 80px 1fr 80px;
    grid-template-columns: 1fr 200px;
    grid-template-areas: 'description description' 'message-list user-list' 'chat-input chat-input';
  }
`

const Header = styled(ShowOnMobile)`
  grid-area: header;
  padding: 8px;
  line-height: 0;

  > :not(:last-child) {
    margin-right: 8px;
  }
`

const MessageList = styled.div`grid-area: message-list;`

const Description = styled(ShowOnDesktop)`
  grid-area: description;
  height: 80px;
  padding: 8px;
`

const UserList = styled(ShowOnDesktop)`
  grid-area: user-list;
  padding: 8px;
`

const UserListEntry = styled.div`
  font-weight: 500;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`

const ChatInputWrapper = styled.div`
  grid-area: chat-input;
  padding: 4px;
`

type ChatViewProps = {
  onMenuClicked: () => void
  onMoreClicked: () => void
}

export function ChannelView(props: ChatViewProps & JSX.IntrinsicElements['div']) {
  const { className } = props
  return (
    <Container className={`${className} fill-area`}>
      <Header className="bg-color-darken-2 flex-row flex-align-center">
        <a href="#" onClick={props.onMenuClicked}>
          <Icon name="menu" size={24} />
        </a>
        <div className="flex-grow">Frontpage</div>
        <a href="#" onClick={props.onMoreClicked}>
          <Icon name="more-vert" size={24} />
        </a>
      </Header>
      <Description className="bg-color-darken-1 scroll-v">description here</Description>
      <MessageList className="bg-color-main flex-grow scroll-v">
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </MessageList>
      <UserList className="bg-color-darken-1 scroll-v">
        <UserListEntry>some character</UserListEntry>
        <UserListEntry>some character</UserListEntry>
        <UserListEntry>some character</UserListEntry>
        <UserListEntry>some character</UserListEntry>
        <UserListEntry>some character</UserListEntry>
        <UserListEntry>some character</UserListEntry>
      </UserList>
      <ChatInputWrapper className="bg-color-main">
        <ChatInput />
      </ChatInputWrapper>
    </Container>
  )
}
