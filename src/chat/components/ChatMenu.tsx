import * as React from 'react'
import styled from 'styled-components'

import { Icon } from 'src/app/components/Icon'
import { ChatAction } from 'src/chat/components/ChatAction'
import { ChatTab } from './ChatTab'

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  display: block;
`

export function ChatMenu() {
  return (
    <div className="bg-color-main flex-row full-height" style={{ width: '240px' }}>
      <div className="bg-color-darken-2 flex-column">
        <section className="flex-grow flex-column">
          <ChatAction icon="forum" />
          <ChatAction icon="account-circle" />
          <ChatAction icon="account-multiple" />
          <ChatAction icon="settings" />
        </section>
        <section className="flex-column">
          <ChatAction icon="exit" />
        </section>
      </div>
      <div className="flex-grow flex-column flex-align-stretch">
        <div className="padding">
          <h2 style={{ margin: 0 }}>Lily Makoto</h2>
          <div className="spacer" />
          <Avatar
            src="https://static.f-list.net/images/avatar/lily%20makoto.png"
            alt="avatar for lily"
          />
          <div className="spacer" />
          <div className="bg-color-darken-1 padding text-italic text-small">
            Online - Around, maybe...
          </div>
        </div>
        <div className="bg-color-darken-2 divider-v" />
        <div className="bg-color-darken-1 flex-grow flex-column scroll-v">
          <ChatTab>
            <div className="flex-row flex-align-center">
              <Icon name="earth" className="margin-right" /> <span>Frontpage</span>
            </div>
          </ChatTab>
          <ChatTab active={true}>
            <div className="flex-row flex-align-center">
              <Icon name="earth" className="margin-right" /> <span>RP Bar</span>
            </div>
          </ChatTab>
          <ChatTab>
            <div className="flex-row flex-align-center">
              <Icon name="earth" className="margin-right" /> <span>RP Dark City</span>
            </div>
          </ChatTab>
          <ChatTab>
            <div className="flex-row flex-align-center">
              <Icon name="earth" className="margin-right" /> <span>Fantasy</span>
            </div>
          </ChatTab>
          <ChatTab>
            <div className="flex-row flex-align-center">
              <Icon name="key" className="margin-right" />{' '}
              <span className="flex-grow">Really really really long channel name</span>
            </div>
          </ChatTab>
        </div>
      </div>
    </div>
  )
}
