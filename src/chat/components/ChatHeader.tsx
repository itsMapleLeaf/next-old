import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { ChatViewStore } from 'src/chat/stores/ChatViewStore'
import { ShowOnMobile } from 'src/common/components/responsive-utils'
import styled from 'styled-components'

type ChatHeaderProps = {
  chatViewStore?: ChatViewStore
}

const Container = styled.div`
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
        <ShowOnMobile className="no-line-height">
          <a href="#" onClick={this.props.chatViewStore!.navigator.toggle}>
            <Icon name="menu" size={24} />
          </a>
        </ShowOnMobile>
        <div className="flex-grow">{this.props.children}</div>
      </Container>
    )
  }
}
