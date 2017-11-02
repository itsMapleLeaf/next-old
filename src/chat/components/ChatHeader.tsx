import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'react-emotion'
import * as MediaQuery from 'react-responsive'
import { Icon } from 'src/app/components/Icon'
import { ChatViewStore } from 'src/chat/stores/ChatViewStore'
import { mediaQueryMobile } from './ChatView'

type ChatHeaderProps = {
  chatViewStore?: ChatViewStore
}

const Container = styled('div')`
  > :not(:last-child) {
    margin-right: 8px;
  }
`

@inject('chatViewStore')
@observer
export class ChatHeader extends React.Component<ChatHeaderProps> {
  render() {
    return (
      <Container className="bg-color-darken-2 flex-row flex-align-center padding">
        <MediaQuery query={mediaQueryMobile}>
          <a href="#" onClick={this.props.chatViewStore!.navDrawer.toggle}>
            <Icon name="menu" size={24} />
          </a>
        </MediaQuery>
        <div className="flex-grow">{this.props.children}</div>
      </Container>
    )
  }
}
