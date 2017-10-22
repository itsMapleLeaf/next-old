import * as React from 'react'

type IconProps = JSX.IntrinsicElements['img'] & {
  size?: number
  children: string
}

export function Icon(props: IconProps) {
  const { size = 18, children: iconName, ...imgProps } = props
  const style = { width: size + 'px', height: size + 'px' }
  return <img style={style} src={`/public/icons/${iconName}.svg`} alt="" {...imgProps} />
}
