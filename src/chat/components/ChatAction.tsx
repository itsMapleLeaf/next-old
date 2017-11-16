import * as React from 'react'
import styled from 'styled-components'

import { Icon } from 'src/app/components/Icon'
import { preventDefault } from 'src/common/util/react'

const Wrapper = styled('a')`
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`

export function ChatAction(props: { icon: string; onClick?: () => void }) {
  return (
    <Wrapper
      href="#"
      className="padding block no-line-height"
      onClick={preventDefault(props.onClick)}
    >
      <Icon name={props.icon} size={32} />
    </Wrapper>
  )
}
