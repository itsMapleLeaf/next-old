import * as React from 'react'
import styled from 'styled-components'

import { Icon } from 'src/app/components/Icon'
import { preventDefault } from 'src/common/util/react'

const HeaderWrapper = styled.nav`
  padding: 8px;
  // box-shadow: 0px -8px 8px 8px black;

  > :not(:last-child) {
    margin-right: 8px;
  }
`

const HeaderIcon = styled.a`
  display: block;
  line-height: 0;
`

type Props = {
  onMenuClick: () => void
  onMoreClick: () => void
}

export function ChatMobileHeader(props: Props) {
  return (
    <HeaderWrapper className="bg-color-darken-2 flex-row flex-align-center">
      <HeaderIcon href="#" onClick={preventDefault(() => props.onMenuClick())}>
        <Icon name="menu" size={24} />
      </HeaderIcon>
      <div className="flex-grow">Frontpage</div>
      <HeaderIcon href="#" onClick={preventDefault(() => props.onMoreClick())}>
        <Icon name="more_vert" size={24} />
      </HeaderIcon>
    </HeaderWrapper>
  )
}
