import * as React from 'react'

type IconProps = {
  size?: number
  name: string
}

export function Icon(props: IconProps & JSX.IntrinsicElements['object']) {
  const { size = 18, name, style, ...otherProps } = props
  const iconPath = `public/icons/${name}.svg`

  const iconStyle = {
    width: size + 'px',
    height: size + 'px',
    ...style,
  }

  return <object type="image/svg+xml" data={iconPath} style={iconStyle} {...otherProps} />
}
