import * as React from 'react'

type IconProps = {
  size?: number
  name: string
}

export function Icon(props: IconProps & JSX.IntrinsicElements['img']) {
  const { size = 16, name, style, ...otherProps } = props
  const iconPath = `public/icons/${name}.svg`

  const iconStyle: React.CSSProperties = {
    width: size + 'px',
    height: size + 'px',
    display: 'inline-block',
    lineHeight: 0,
    cursor: 'inherit',
    ...style,
  }

  return <img src={iconPath} style={iconStyle} {...otherProps} />
}
