import * as React from 'react'
import styled from 'styled-components'

import { Icon } from 'src/app/components/Icon'
import { ChatAction } from 'src/chat/components/ChatAction'
import { ChatTab } from './ChannelTab'

const Wrapper = styled.div`width: 240px;`

const ActionContainer = styled.div``

const ContentContainer = styled.div``

const ProfileInfo = styled.div`
  padding: 8px;

  > * {
    margin: 0;
  }

  > :not(:last-child) {
    margin-bottom: 8px;
  }
`

const Avatar = styled.img`
  width: 100px;
  height: 100px;
`

export function ChatSidebar() {
  return (
    <Wrapper className="bg-color-main flex-row full-height">
      <ActionContainer className="bg-color-darken-2 flex-column">
        <section className="flex-grow flex-column">
          <ChatAction icon="forum" />
          <ChatAction icon="account-circle" />
          <ChatAction icon="account-multiple" />
          <ChatAction icon="settings" />
        </section>
        <section className="flex-column">
          <ChatAction icon="exit" />
        </section>
      </ActionContainer>
      <ContentContainer className="flex-grow flex-column flex-align-stretch">
        <ProfileInfo>
          <h2>Lily Makoto</h2>
          <Avatar
            src="https://static.f-list.net/images/avatar/lily%20makoto.png"
            alt="avatar for lily"
          />
        </ProfileInfo>
        <div className="bg-color-darken-2" style={{ height: '4px' }} />
        <div className="bg-color-darken-1 flex-grow flex-column scroll-v">
          <ChatTab>
            <div className="flex-row flex-align-center">
              <Icon name="earth" style={{ marginRight: '8px' }} /> <span>Frontpage</span>
            </div>
          </ChatTab>
          <ChatTab active={true}>
            <div className="flex-row flex-align-center">
              <Icon name="earth" style={{ marginRight: '8px' }} /> <span>RP Bar</span>
            </div>
          </ChatTab>
          <ChatTab>
            <div className="flex-row flex-align-center">
              <Icon name="earth" style={{ marginRight: '8px' }} /> <span>RP Dark City</span>
            </div>
          </ChatTab>
          <ChatTab>
            <div className="flex-row flex-align-center">
              <Icon name="earth" style={{ marginRight: '8px' }} /> <span>Fantasy</span>
            </div>
          </ChatTab>
          <ChatTab>
            <div className="flex-row flex-align-center">
              <Icon name="key" style={{ marginRight: '8px' }} />{' '}
              <span className="flex-grow">Really really really long channel name</span>
            </div>
          </ChatTab>
        </div>
      </ContentContainer>
    </Wrapper>
  )
}
