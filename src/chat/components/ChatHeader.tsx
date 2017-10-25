import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { ShowOnMobile } from 'src/common/components/responsive-utils'
import styled from 'styled-components'

type ChatHeaderProps = {
  title: string
  onMenuClicked: () => void
  onMoreClicked: () => void
}

const Container = styled.div`
  > :not(:last-child) {
    margin-right: 8px;
  }
`

export class ChatHeader extends React.Component<ChatHeaderProps> {
  render() {
    return (
      <Container className="bg-color-darken-2 flex-row flex-align-center padding">
        <ShowOnMobile className="no-line-height">
          <a href="#" onClick={this.props.onMenuClicked}>
            <Icon name="menu" size={24} />
          </a>
        </ShowOnMobile>
        <div className="flex-grow">
          <h3 style={{ margin: 0 }}>{this.props.title}</h3>
        </div>
        <ShowOnMobile className="no-line-height">
          <a href="#" onClick={this.props.onMoreClicked}>
            <Icon name="more-vert" size={24} />
          </a>
        </ShowOnMobile>
      </Container>
    )
  }
}
