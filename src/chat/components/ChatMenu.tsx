import * as React from 'react'
import styled from 'styled-components'

import { ChannelTabContent } from 'src/channel/components/ChannelTabContent'
import { ChatAction } from 'src/chat/components/ChatAction'
import { ChatTab } from 'src/chat/components/ChatTab'

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  display: block;
`

export class ChatMenu extends React.Component {
  renderChannelTab(title: string, type: 'public' | 'private', active: boolean) {
    return (
      <ChatTab active={active}>
        <ChannelTabContent title={title} type={type} />
      </ChatTab>
    )
  }

  render() {
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
            <h3 className="margin faded">Channels</h3>
            {this.renderChannelTab('Frontpage', 'public', false)}
            {this.renderChannelTab('RP Bar', 'public', false)}
            {this.renderChannelTab('RP Dark City', 'public', true)}
            {this.renderChannelTab('Fantasy', 'public', false)}
            {this.renderChannelTab('Development', 'public', false)}

            <h3 className="margin faded">Private Chats</h3>
          </div>
        </div>
      </div>
    )
  }
}
