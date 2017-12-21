import * as React from 'react'
import styled from 'react-emotion'
import * as icons from './icons'

type IconName = keyof typeof icons

const sizes = {
  small: '24px',
  normal: '36px',
  large: '48px',
}

type IconSize = keyof typeof sizes

type Props = {
  name: IconName
  size?: IconSize | number
}

const resolveSize = (props: Props) => {
  if (typeof props.size === 'number') {
    return props.size + 'px'
  }
  return sizes[props.size || 'normal']
}

const Wrapper = styled.span`
  svg {
    width: ${resolveSize};
    height: ${resolveSize};
  }
`

export function Icon(props: Props) {
  const IconComponent = icons[props.name]
  return (
    <Wrapper {...props}>
      <IconComponent />
    </Wrapper>
  )
}
