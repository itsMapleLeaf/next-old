import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { ShowOnMobile } from 'src/common/components/responsive-utils'
import styled from 'styled-components'
import { ChatViewStore } from 'src/chat/stores/ChatViewStore'

type ChatHeaderProps = {
  title: string
  onMoreClicked: () => void
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
          <a href="#" onClick={this.props.chatViewStore!.toggleMenu}>
            <Icon name="menu" size={24} />
          </a>
        </ShowOnMobile>
        <div className="flex-grow">
          <h3 style={{ margin: 0 }}>{this.props.title}</h3>
        </div>
        <div>{this.props.children}</div>
        <ShowOnMobile className="no-line-height">
          <a href="#" onClick={this.props.onMoreClicked}>
            <Icon name="more-vert" size={24} />
          </a>
        </ShowOnMobile>
      </Container>
    )
  }
}
