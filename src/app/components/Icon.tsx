import * as React from 'react'

type IconProps = {
  size?: number
  name: string
}

export function Icon(props: IconProps & JSX.IntrinsicElements['object']) {
  const { size = 16, name, style, ...otherProps } = props
  const iconPath = `public/icons/${name}.svg`

  const iconStyle: React.CSSProperties = {
    width: size + 'px',
    height: size + 'px',
    display: 'inline-block',
    lineHeight: 1,
    ...style,
  }

  return <object type="image/svg+xml" data={iconPath} style={iconStyle} {...otherProps} />
}
